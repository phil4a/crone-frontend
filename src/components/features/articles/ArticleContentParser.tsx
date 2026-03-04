import parse, { DOMNode, Element } from 'html-react-parser';

import { ArticleGallery } from '@/components/features/articles/ArticleGallery';

import { ProjectImage } from '@/types/project.types';

function extractImageFromNode(node: Element, id: number): ProjectImage | null {
	const dataSrc = node.attribs['data-src'];
	if (!dataSrc) return null;

	// Clean up data-src (remove surrounding quotes, backticks, spaces)
	const cleanSrc = dataSrc.trim().replace(/^[`'"]+|[`'"]+$/g, '');

	// Parse dimensions
	let width = 1200;
	let height = 900;

	try {
		const urlObj = new URL(cleanSrc.startsWith('http') ? cleanSrc : `https:${cleanSrc}`);

		// Try 'as' parameter: as=32x24,48x36,...,2560x1920
		const asParam = urlObj.searchParams.get('as');
		if (asParam) {
			const sizes = asParam.split(',');
			const lastSize = sizes[sizes.length - 1];
			const [w, h] = lastSize.split('x').map(Number);
			if (!isNaN(w) && !isNaN(h)) {
				width = w;
				height = h;
			}
		} else {
			// Try 'cs' parameter: cs=2560x0
			const csParam = urlObj.searchParams.get('cs');
			if (csParam) {
				const [w, h] = csParam.split('x').map(Number);
				if (!isNaN(w)) {
					width = w;
					if (!isNaN(h) && h > 0) {
						height = h;
					} else {
						// Default to 4:3 if height is missing/0
						height = Math.round(width * 0.75);
					}
				}
			}
		}
	} catch (e) {
		console.warn('Failed to parse image URL', cleanSrc);
	}

	return {
		id,
		url: cleanSrc,
		width,
		height,
		alt: ''
	};
}

interface ArticleContentParserProps {
	content: string;
}

export function ArticleContentParser({ content }: ArticleContentParserProps) {
	const options = {
		replace: (domNode: DOMNode) => {
			if (
				domNode instanceof Element &&
				domNode.attribs &&
				domNode.attribs.class === 'gallery__body'
			) {
				const items: ProjectImage[] = [];
				let imageCounter = 0;

				// Iterate over children to find gallery items
				domNode.children.forEach(child => {
					// Check if child is an element with class gallery__item
					if (
						child instanceof Element &&
						child.attribs &&
						child.attribs.class &&
						child.attribs.class.includes('gallery__item')
					) {
						const image = extractImageFromNode(child, imageCounter++);
						if (image) {
							items.push(image);
						}
					}
				});

				if (items.length > 0) {
					return (
						<ArticleGallery
							items={items}
							className='py-8 -mx-4 md:-mx-0'
						/>
					);
				}
			}
		}
	};

	return <>{parse(content, options)}</>;
}
