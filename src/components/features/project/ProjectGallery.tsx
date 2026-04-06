'use client';

import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Title } from '@/components/ui/Title';

import { getProxiedUrl } from '@/lib/utils';
import { ProjectGalleryProps } from '@/types/project.types';

interface AlbumImageRenderProps {
	alt?: string;
	className?: string;
	style?: CSSProperties;
}

function GalleryThumb({
	photo,
	title,
	projectAlt,
	albumProps
}: {
	photo: { src: string; width: number; height: number };
	title: string;
	projectAlt: string;
	albumProps: AlbumImageRenderProps;
}) {
	const proxiedSrc = getProxiedUrl(photo.src);
	const anchorRef = useRef<HTMLAnchorElement | null>(null);
	const [measuredWidth, setMeasuredWidth] = useState<number | null>(() => {
		const styleWidth = albumProps.style?.width;
		if (typeof styleWidth === 'number' && Number.isFinite(styleWidth) && styleWidth > 0) {
			return Math.round(styleWidth);
		}
		if (typeof styleWidth === 'string') {
			const match = styleWidth.trim().match(/^(\d+(?:\.\d+)?)px$/);
			if (match?.[1]) {
				const parsed = Number.parseFloat(match[1]);
				if (Number.isFinite(parsed) && parsed > 0) return Math.round(parsed);
			}
		}
		return null;
	});

	useEffect(() => {
		const node = anchorRef.current;
		if (!node) return;

		const updateWidth = () => {
			const width = node.getBoundingClientRect().width;
			if (Number.isFinite(width) && width > 0) {
				setMeasuredWidth(Math.round(width));
			}
		};

		updateWidth();

		const resizeObserver = new ResizeObserver(() => {
			updateWidth();
		});

		resizeObserver.observe(node);
		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	const sizes = measuredWidth ? `${measuredWidth}px` : undefined;

	return (
		<a
			ref={anchorRef}
			href={proxiedSrc}
			data-src={proxiedSrc}
			aria-label={`Открыть изображение ${title}`}
			data-lg-size={`${photo.width}-${photo.height}`}
			data-sub-html={`Проект «${projectAlt}» (${title})`}
			className={`lg-item relative block overflow-hidden rounded-lg ${albumProps.className ?? ''}`}
			style={albumProps.style}
		>
			{sizes ? (
				<Image
					src={photo.src}
					alt={albumProps.alt || ''}
					fill
					quality={55}
					className='h-full w-full object-cover'
					sizes={sizes}
				/>
			) : null}
		</a>
	);
}

export function ProjectGallery(props: ProjectGalleryProps) {
	const { title, projectAlt, items } = props;
	const lightboxRef = useRef<{ refresh: () => void } | null>(null);

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
							lightboxRef.current = ref.instance as { refresh: () => void };
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
								return (
									<GalleryThumb
										photo={photo}
										title={title}
										projectAlt={projectAlt}
										albumProps={props}
									/>
								);
							}
						}}
					/>
				</LightGallery>
			</div>
		</section>
	);
}
