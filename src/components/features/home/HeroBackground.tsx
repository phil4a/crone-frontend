'use client';

import { useCallback, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export function HeroBackground() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isVideoReady, setIsVideoReady] = useState(false);

	const handleCanPlay = () => {
		setIsVideoReady(true);
		videoRef.current?.play().catch(() => null);
	};

	const setVideoNode = useCallback((node: HTMLVideoElement | null) => {
		videoRef.current = node;
		if (!node) return;

		if (node.readyState >= 3) {
			setIsVideoReady(true);
			node.play().catch(() => null);
		}
	}, []);

	return (
		<>
			<div
				className={cn(
					'absolute inset-0 z-10 pointer-events-none transition-opacity duration-250',
					isVideoReady ? 'opacity-0' : 'opacity-100'
				)}
			>
				<picture>
					<source
						media='(max-width: 767px), (orientation: portrait)'
						srcSet='/video/hero-mobile-poster.webp'
					/>
					<img
						src='/video/hero-desktop-poster.webp'
						alt='Постер изображения проекта Крона Групп'
						loading='eager'
						decoding='async'
						className='absolute inset-0 h-full w-full object-cover'
					/>
				</picture>
			</div>

			<video
				ref={setVideoNode}
				onCanPlay={handleCanPlay}
				autoPlay
				muted
				loop
				playsInline
				preload='auto'
				className={cn(
					'absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-250',
					isVideoReady ? 'opacity-100' : 'opacity-0'
				)}
			>
				<source
					src='/video/hero-mobile-2.mp4'
					type='video/mp4'
					media='(max-width: 767px), (orientation: portrait)'
				/>
				<source
					src='/video/hero-desktop.mp4'
					type='video/mp4'
				/>
			</video>
		</>
	);
}
