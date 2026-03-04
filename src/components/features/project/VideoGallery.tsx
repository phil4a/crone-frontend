'use client';

import 'lightgallery/css/lg-video.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import lgVideo from 'lightgallery/plugins/video';
import LightGallery from 'lightgallery/react';
import { useEffect, useRef } from 'react';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Title } from '@/components/ui/Title';

import { getProxiedUrl } from '@/lib/utils';
import { ProjectImage } from '@/types/project.types';

export function VideoGallery({
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
		width: item.width || 1920, // Default to 16:9 HD if missing
		height: item.height || 1080,
		alt: item.alt || `Видео проекта ${projectAlt}`,
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
					download={false}
					plugins={[lgVideo]}
					selector='.lg-item'
				>
					<RowsPhotoAlbum
						photos={photos}
						targetRowHeight={400}
						rowConstraints={{ singleRowMaxHeight: 500 }}
						spacing={10}
						render={{
							image: (props, { photo }) => {
								const proxiedSrc = getProxiedUrl(photo.src);
								
								// Prepare video source for LightGallery
								// We use data-video instead of href to be explicit
								const videoSource = JSON.stringify({
									source: [{ src: proxiedSrc, type: 'video/mp4' }],
									attributes: { preload: false, controls: true }
								});

								return (
									<a
										data-video={videoSource}
										aria-label={`Открыть видео ${title}`}
										data-lg-size={`${photo.width}-${photo.height}`}
										data-sub-html={`Проект «${projectAlt}» (${title})`}
										className='lg-item relative block w-full h-full group cursor-pointer overflow-hidden rounded-lg'
									>
										{/* Thumbnail: muted video loop */}
										<video
											src={proxiedSrc}
											className='object-cover w-full h-full'
											muted
											playsInline
											loop
											onMouseOver={e => e.currentTarget.play().catch(() => {})}
											onMouseOut={e => e.currentTarget.pause()}
										/>
										
										{/* Play Icon Overlay */}
										<div className='absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none'>
											<div className='w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform'>
												<svg 
													xmlns="http://www.w3.org/2000/svg" 
													viewBox="0 0 24 24" 
													fill="currentColor" 
													className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
												>
													<path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
												</svg>
											</div>
										</div>
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
