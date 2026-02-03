'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';

export function HeroBackground() {
	// True if mobile (<768px) OR portrait mode
	// False if desktop (>=768px) AND landscape mode
	const isMobile = useMediaQuery('(max-width: 767px), (orientation: portrait)');

	// During SSR or initial hydration, render just the poster to avoid layout shift/flicker
	// and ensure hydration matches (since we return null initially from hook)
	if (isMobile === null) {
		return (
			<img
				src="/video/hero-poster.webp"
				className="absolute inset-0 h-full w-full object-cover"
				alt=""
			/>
		);
	}

	return (
		<video
			autoPlay
			muted
			loop
			playsInline
			poster="/video/hero-poster.webp"
			className="absolute inset-0 h-full w-full object-cover"
			// Key ensures component remounts if source changes, though conditional rendering below handles it too.
			// But here we swap the src.
			key={isMobile ? 'mobile' : 'desktop'}>
			<source
				src={isMobile ? '/video/hero-mobile-2.mp4' : '/video/hero-desktop.mp4'}
				type="video/mp4"
			/>
		</video>
	);
}
