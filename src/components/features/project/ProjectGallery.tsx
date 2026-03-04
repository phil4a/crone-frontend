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

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Title } from '@/components/ui/Title';

import { getProxiedUrl } from '@/lib/utils';
import { ProjectImage } from '@/types/project.types';

export function ProjectGallery({
	title,
	projectAlt,
	items
}: {
	title: string;
	projectAlt: string;
	items: ProjectImage[];
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
		alt: item.alt || `Изображение проекта ${projectAlt}`,
		key: item.id.toString()
	}));

	return (
		<section className='py-12 md:py-16'>
			<HeaderThemeObserver theme='transparent' />
			<div className='container'>
				<Title
					as='h2'
					variant='h3'
					className='mb-8'
				>
					{title}
				</Title>
				<LightGallery
					onInit={ref => {
						if (ref) {
							lightboxRef.current = ref.instance;
							// Force refresh to ensure LightGallery discovers the elements rendered by RowsPhotoAlbum
							// This is necessary because react-photo-album might render/layout after LightGallery initializes
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
						targetRowHeight={400}
						rowConstraints={{ singleRowMaxHeight: 600 }}
						spacing={10}
						render={{
							image: (props, { photo }) => {
								const proxiedSrc = getProxiedUrl(photo.src);
								return (
									<a
										href={proxiedSrc}
										data-src={proxiedSrc}
										aria-label={`Открыть изображение ${title}`}
										data-lg-size={`${photo.width}-${photo.height}`}
										data-sub-html={`Проект «${projectAlt}» (${title})`}
										className='lg-item relative block w-full h-full'
									>
										<Image
											src={photo.src}
											alt={props.alt || ''}
											width={photo.width}
											height={photo.height}
											className='object-cover rounded-lg'
											sizes='(max-width: 640px) 100vw, 50vw'
										/>
									</a>
								);
							}
						}}
					/>
				</LightGallery>
			</div>
		</section>
	);
}
