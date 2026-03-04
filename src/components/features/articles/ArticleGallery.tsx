'use client';

import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';

import { getProxiedUrl } from '@/lib/utils';
import { ProjectImage } from '@/types/project.types';

export function ArticleGallery({
	items,
	className
}: {
	items: ProjectImage[];
	className?: string;
}) {
	const lightboxRef = useRef<any>(null);

	useEffect(() => {
		if (lightboxRef.current) {
			lightboxRef.current.refresh();
		}
	}, [items]);

	if (!items.length) return null;

	const photos = items.map(item => ({
		src: item.url,
		width: item.width || 1200,
		height: item.height || 900,
		alt: item.alt || 'Изображение статьи',
		key: item.id.toString()
	}));

	return (
		<div className={className || 'py-8'}>
			<LightGallery
				onInit={ref => {
					if (ref) {
						lightboxRef.current = ref.instance;
						setTimeout(() => {
							ref.instance.refresh();
						}, 10);
					}
				}}
				licenseKey={process.env.NEXT_PUBLIC_LIGHT_GALLERY_LICENSE_KEY}
				speed={300}
				mobileSettings={{
					showCloseIcon: true
				}}
				download={true}
				plugins={[lgZoom, lgThumbnail]}
				selector='.lg-item'
			>
				<RowsPhotoAlbum
					photos={photos}
					targetRowHeight={300}
					rowConstraints={{ singleRowMaxHeight: 500 }}
					spacing={10}
					render={{
						image: (props, { photo }) => {
							const proxiedSrc = getProxiedUrl(photo.src);
							return (
								<a
									href={proxiedSrc}
									data-src={proxiedSrc}
									aria-label='Открыть изображение'
									data-lg-size={`${photo.width}-${photo.height}`}
									className='lg-item relative block w-full h-full'
								>
									<Image
										src={photo.src}
										alt={''}
										width={photo.width}
										height={photo.height}
										className='object-cover rounded-lg'
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									/>
								</a>
							);
						}
					}}
				/>
			</LightGallery>
		</div>
	);
}
