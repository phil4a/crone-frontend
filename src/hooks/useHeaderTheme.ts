'use client';

import { useEffect, useRef } from 'react';

import { HeaderTheme, useHeaderStore } from '@/store/header';

export const useHeaderTheme = (theme: HeaderTheme) => {
	const setTheme = useHeaderStore(state => state.setTheme);
	const elementRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		const target = element.parentElement ?? element;
		const headerHeight = 80;

		const updateTheme = () => {
			const rect = target.getBoundingClientRect();
			if (rect.top <= headerHeight && rect.bottom > headerHeight) {
				setTheme(theme);
			}
		};

		let rafId = 0;
		const onScroll = () => {
			if (rafId) return;
			rafId = window.requestAnimationFrame(() => {
				rafId = 0;
				updateTheme();
			});
		};

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						updateTheme();
					}
				});
			},
			{
				rootMargin: `-${headerHeight}px 0px -80% 0px`,
				threshold: [0, 1]
			}
		);

		observer.observe(target);
		updateTheme();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			if (rafId) {
				window.cancelAnimationFrame(rafId);
			}
		};
	}, [theme, setTheme]);

	return elementRef;
};
