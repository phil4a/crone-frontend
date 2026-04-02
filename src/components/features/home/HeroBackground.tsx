'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';

export function HeroBackground() {
	// True if mobile (<768px) OR portrait mode
	// False if desktop (>=768px) AND landscape mode
	const isMobile = useMediaQuery('(max-width: 767px), (orientation: portrait)');
	const [isPosterVisible, setIsPosterVisible] = useState(true);

	// During SSR or initial hydration, render just the poster to avoid layout shift/flicker
	// and ensure hydration matches (since we return null initially from hook)
	if (isMobile === null) {
		return (
			<div className='relative h-full w-full'>
				<Image
					src='/video/hero-mobile-poster.webp'
					alt='Постер изображения проекта Крона Групп'
					fill
					priority
					sizes='100vw'
					className='object-cover md:hidden'
				/>
				<Image
					src='/video/hero-desktop-poster.webp'
					alt='Постер изображения проекта Крона Групп'
					fill
					priority
					sizes='100vw'
					className='hidden object-cover md:block'
				/>
			</div>
		);
	}

	const posterSrc = isMobile ? '/video/hero-mobile-poster.webp' : '/video/hero-desktop-poster.webp';

	return (
		<>
			{isPosterVisible ? (
				<div className='absolute inset-0 z-10 pointer-events-none'>
					<Image
						src={posterSrc}
						alt='Постер изображения проекта Крона Групп'
						fill
						priority
						quality={75}
						sizes='100vw'
						className='object-cover'
					/>
				</div>
			) : null}

			<video
				autoPlay
				muted
				loop
				playsInline
				preload='metadata'
				poster={posterSrc}
				className='absolute inset-0 z-0 h-full w-full object-cover'
				key={isMobile ? 'mobile' : 'desktop'}
				onPlaying={() => setIsPosterVisible(false)}
				onCanPlay={() => setIsPosterVisible(false)}
				onLoadedData={() => setIsPosterVisible(false)}
			>
				<source
					src={isMobile ? '/video/hero-mobile-2.mp4' : '/video/hero-desktop.mp4'}
					type='video/mp4'
				/>
			</video>
		</>
	);
}
