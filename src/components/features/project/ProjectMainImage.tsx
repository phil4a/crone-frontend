import Image from 'next/image';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';

import { ProjectImage } from '@/types/project.types';

export function ProjectMainImage({ url, alt }: Partial<ProjectImage>) {
	return (
		<section className='relative h-svh w-full bg-light-gray'>
			<HeaderThemeObserver theme='transparent' />
			{url ? (
				<Image
					src={url}
					alt={alt || url}
					fill
					className='object-cover'
					sizes='100vw'
					priority
				/>
			) : (
				<div className='w-full h-full flex items-center justify-center text-dark-gray'>
					Нет фото
				</div>
			)}
		</section>
	);
}
