import Image from 'next/image';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';

import { Project } from '@/types/project.types';

export function ProjectMainImage({ coverImage, videos }: Project) {
	return (
		<section className='relative w-full bg-light-gray'>
			<HeaderThemeObserver theme='transparent' />
			{videos.main && coverImage?.url ? (
				<video
					src={videos.main}
					loop
					autoPlay
					muted
					className='w-full landscape:h-full portrait:h-fit object-cover'
					poster={coverImage?.url}
				/>
			) : coverImage?.url ? (
				<Image
					src={coverImage.url}
					alt={coverImage.alt || coverImage.url}
					fill
					className='object-cover'
					sizes='100vw'
					priority
				/>
			) : (
				<div className='w-full landscape:h-full portrait:h-fit flex items-center justify-center text-dark-gray'>
					Нет фото
				</div>
			)}
		</section>
	);
}
