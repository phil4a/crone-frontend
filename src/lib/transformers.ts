import { GetArticlesQuery, GetProjectsQuery } from '@/graphql/generated';
import { Article } from '@/types/article.types';
import { Project, ProjectImage } from '@/types/project.types';
import { WPEmbedded, WPEmbeddedMedia, WPProject } from '@/types/wp.types';

/**
 * Helper to extract image data from WP _embedded field by ID
 */
function findImageInEmbedded(id: number, embedded?: WPEmbedded): ProjectImage | null {
	if (!embedded) return null;

	// Search in featured media
	const featured = embedded['wp:featuredmedia']?.find(media => media.id === id);
	if (featured) return mapWPMediaToProjectImage(featured);

	// Search in attachments
	const attachment = embedded['wp:attachment']?.find(media => media.id === id);
	if (attachment) return mapWPMediaToProjectImage(attachment);

	return null;
}

function mapWPMediaToProjectImage(media: WPEmbeddedMedia): ProjectImage {
	return {
		id: media.id,
		url: media.source_url,
		width: media.media_details?.width,
		height: media.media_details?.height,
		alt: media.alt_text || media.title?.rendered || ''
	};
}

type GraphQLArticle = NonNullable<NonNullable<GetArticlesQuery['posts']>['nodes']>[0] & { content?: string | null };

export function transformGraphQLArticle(post: GraphQLArticle): Article {
	const categories = post.categories?.nodes;
	const lastCategory = categories && categories.length > 0 ? categories[categories.length - 1] : null;

	return {
		id: post.databaseId,
		globalId: post.id,
		title: post.title || '',
		slug: post.slug || '',
		content: post.content || '',
		shortDescription: post.articlesField?.shortDescription || '',
		date: post.date || '',
		category: lastCategory
			? {
					name: lastCategory.name || '',
					slug: lastCategory.slug || ''
				}
			: null,
		coverImage: post.featuredImage?.node?.sourceUrl
			? {
					url: post.featuredImage.node.sourceUrl,
					alt: post.title || ''
				}
			: null,
		seo: {
			title: post.seo?.title || post.title || '',
			description: post.seo?.metaDesc || ''
		}
	};
}

/**
 * Transforms a raw WordPress Project response into a clean domain Project entity
 */
export function transformProject(post: WPProject): Project {
	const acf = post.acf;
	const embedded = post._embedded;

	// Helper to resolve gallery IDs to images
	const resolveGallery = (ids: number[] | false): ProjectImage[] => {
		if (!ids || !Array.isArray(ids)) return [];
		return ids
			.map(id => findImageInEmbedded(id, embedded))
			.filter((img): img is ProjectImage => img !== null);
	};

	// Helper for parsing numbers safely
	const parseNumber = (val: string | number): number => {
		if (typeof val === 'number') return val;
		const parsed = parseInt(val, 10);
		return isNaN(parsed) ? 0 : parsed;
	};

	// Helper for parsing numbers nullable
	const parseNumberNullable = (val: string | number): number | null => {
		if (val === '') return null;
		if (typeof val === 'number') return val;
		const parsed = parseInt(val, 10);
		return isNaN(parsed) ? null : parsed;
	};

	// Cover Image
	const coverImage = findImageInEmbedded(post.featured_media, embedded);

	// Extract tags from embedded terms
	// wp:term is an array of arrays of terms. We need to flatten and filter by taxonomy 'post_tag'
	let tags: string[] = [];
	if (embedded && embedded['wp:term']) {
		const terms = embedded['wp:term'].flat();
		tags = terms.filter((term: any) => term.taxonomy === 'post_tag').map((term: any) => term.slug);
	}

	return {
		id: post.id,
		slug: post.slug,
		title: post.title.rendered,
		tags,
		shortDescription: acf['short-description'] || '',
		description: post.content?.rendered || '', // Safe access
		coverImage,
		specs: {
			area: parseNumber(acf.area),
			floor: parseNumber(acf.floor),
			bedrooms: parseNumber(acf.bedrooms),
			bathrooms: parseNumberNullable(acf.bathrooms),
			year: Number(acf.year),
			city: acf.city,
			type: acf.type,
			status: acf.status
		},
		features: {
			terrace: acf.terrace,
			garage: acf.garage,
			sauna: acf.sauna,
			pool: acf.pool,
			fireplace: acf.fireplace
		},
		galleries: {
			plans: resolveGallery(acf['plans-gallery']),
			process: resolveGallery(acf['process-gallery']),
			result: resolveGallery(acf['result-gallery'])
		},
		seo: {
			title: post.title.rendered,
			description: acf['short-description'] || ''
		},
		likes: post.project_likes || 0
	};
}

type GraphQLProject = NonNullable<NonNullable<GetProjectsQuery['posts']>['nodes']>[0];

export function transformGraphQLProject(post: GraphQLProject): Project {
	const fields = post.projectFields;

	return {
		id: post.databaseId, // Using databaseId for compatibility
		globalId: post.id,
		slug: post.slug || '',
		title: post.title || '',
		tags: post.tags?.nodes.map(node => node.slug || '') || [],
		shortDescription: fields?.shortDescription || '',
		description: '', // Need to fetch content if available
		coverImage: post.featuredImage?.node?.sourceUrl
			? {
					id: 0,
					url: post.featuredImage.node.sourceUrl,
					width: 0,
					height: 0,
					alt: post.title || ''
				}
			: null,
		specs: {
			area: fields?.area ? parseInt(String(fields.area), 10) || 0 : 0,
			floor: fields?.floor ? parseInt(String(fields.floor), 10) || 0 : 0,
			bedrooms: fields?.bedrooms ? parseInt(String(fields.bedrooms), 10) || 0 : 0,
			bathrooms: null, // Not in query
			year: fields?.year ? parseInt(String(fields.year), 10) || 0 : 0,
			city: fields?.city || '',
			type: '', // Not in query
			status: Array.isArray(fields?.status) ? fields.status[0] || '' : fields?.status || ''
		},
		features: {
			terrace: false,
			garage: false,
			sauna: false,
			pool: false,
			fireplace: false
		},
		galleries: {
			plans:
				fields?.plansGallery?.nodes
					?.filter(node => node.sourceUrl)
					.map((node, idx) => ({
						id: idx,
						url: node.sourceUrl || '',
						width: 0,
						height: 0,
						alt: ''
					})) || [],
			process:
				fields?.processGallery?.nodes
					?.filter(node => node.sourceUrl)
					.map((node, idx) => ({
						id: idx,
						url: node.sourceUrl || '',
						width: 0,
						height: 0,
						alt: ''
					})) || [],
			result:
				fields?.resultGallery?.nodes
					?.filter(node => node.sourceUrl)
					.map((node, idx) => ({
						id: idx,
						url: node.sourceUrl || '',
						width: 0,
						height: 0,
						alt: ''
					})) || []
		},
		seo: {
			title: post.title || '',
			description: ''
		},
		likes: post.projectLikes || 0
	};
}
