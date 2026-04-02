'use client';

import { useEffect, useRef, useState } from 'react';

type ViewportLazyProps = {
	children: React.ReactNode;
	placeholder?: React.ReactNode;
	rootMargin?: string;
	once?: boolean;
	delayMs?: number;
};

export function ViewportLazy({
	children,
	placeholder,
	rootMargin = '300px',
	once = true,
	delayMs = 0
}: ViewportLazyProps) {
	const [visible, setVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		let timeoutId: number | undefined;

		const observer = new IntersectionObserver(
			entries => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					if (delayMs > 0) {
						timeoutId = window.setTimeout(() => setVisible(true), delayMs);
					} else {
						setVisible(true);
					}
					if (once) observer.unobserve(el);
				}
			},
			{ root: null, rootMargin, threshold: 0 }
		);

		observer.observe(el);

		return () => {
			observer.disconnect();
			if (timeoutId) window.clearTimeout(timeoutId);
		};
	}, [rootMargin, once, delayMs]);

	return (
		<div ref={containerRef}>
			{visible
				? children
				: (placeholder ?? (
						<div className='layout-container mt-16'>
							{/* Используем общий скелетон по умолчанию */}
							<div className='h-90 sm:h-140 md:h-150 w-full rounded-xl bg-gray-100 animate-pulse' />
						</div>
					))}
		</div>
	);
}
