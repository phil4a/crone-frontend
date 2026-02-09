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

	return {
		id: post.id,
		slug: post.slug,
		title: post.title.rendered,
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
			title: post.yoast_head_json?.title || post.title.rendered,
			description: post.yoast_head_json?.description || acf['short-description'] || '',
			ogImage: post.yoast_head_json?.og_image?.[0]?.url || coverImage?.url
		}
	};
}
