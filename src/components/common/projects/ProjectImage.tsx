'use client';

import Image from 'next/image';
import { useState } from 'react';

import { SkeletonLoader } from '@/components/ui/SkeletonLoader';

interface ProjectImageClientProps {
	src: string;
	alt: string;
	priority?: boolean;
}

export function ProjectImageClient({ src, alt, priority = false }: ProjectImageClientProps) {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			{isLoading && <SkeletonLoader className='h-full' />}

			<Image
				src={src}
				alt={alt}
				fill
				quality={55}
				priority={priority}
				className={`object-cover transition-opacity duration-500 z-10 ${
					isLoading ? 'opacity-0' : 'opacity-100'
				}`}
				sizes='(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc(50vw - 50px), 40vw'
				onLoad={() => setIsLoading(false)}
			/>
		</>
	);
}
