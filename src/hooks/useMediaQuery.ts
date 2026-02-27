'use client';

import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean | null {
	const subscribe = (callback: () => void) => {
		if (typeof window === 'undefined') return () => {};
		const media = window.matchMedia(query);
		const handler = () => callback();
		media.addEventListener('change', handler);
		return () => media.removeEventListener('change', handler);
	};

	const getSnapshot = () => {
		if (typeof window === 'undefined') return null;
		return window.matchMedia(query).matches;
	};

	return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
