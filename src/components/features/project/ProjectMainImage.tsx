import Image from 'next/image';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';

import { Project } from '@/types/project.types';

export function ProjectMainImage({ coverImage, videos }: Project) {
	return (
		<section className='relative w-full aspect-video landscape:h-full portrait:h-fit'>
			<HeaderThemeObserver theme='transparent' />
			{videos.main ? (
				<video
					src={videos.main}
					loop
					autoPlay
					muted
					className='w-full h-full object-cover'
					poster={coverImage?.url}
				/>
			) : coverImage?.url ? (
				<Image
					src={coverImage.url}
					alt={coverImage.alt || coverImage.url}
					fill
					className='w-full h-full object-cover'
					sizes='100vw'
					priority={true}
					fetchPriority='high'
					loading='eager'
				/>
			) : (
				<div className='w-full flex items-center justify-center text-dark-gray'>Нет фото</div>
			)}
		</section>
	);
}
