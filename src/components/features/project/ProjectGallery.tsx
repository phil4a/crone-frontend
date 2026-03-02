'use client';

import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import Image from 'next/image';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Title } from '@/components/ui/Title';

import { ProjectImage } from '@/types/project.types';

export function ProjectGallery({ title, items }: { title: string; items: ProjectImage[] }) {
	if (!items.length) return null;

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
					speed={300}
					download={true}
					plugins={[lgZoom, lgThumbnail]}
					selector='.lg-item'
				>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5'>
						{items.map((item, index) => {
							const size = item.width && item.height ? `${item.width}-${item.height}` : undefined;
							return (
								<a
									key={`${item.url}-${index}`}
									href={item.url}
									data-src={item.url}
									aria-label={`Открыть изображение ${title}`}
									data-lg-size={size}
									data-sub-html={item.alt || title}
									className='lg-item relative w-full aspect-4/3'
								>
									<Image
										src={item.url}
										alt={item.alt || title}
										fill
										className='object-cover rounded-lg'
										sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
									/>
								</a>
							);
						})}
					</div>
				</LightGallery>
			</div>
		</section>
	);
}
