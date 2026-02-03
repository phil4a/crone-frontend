'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean | null {
	const [matches, setMatches] = useState<boolean | null>(null);

	useEffect(() => {
		const media = window.matchMedia(query);
		
		// Set initial value
		setMatches(media.matches);

		// Listener
		const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
		
		// Modern browsers support addEventListener on MediaQueryList
		media.addEventListener('change', listener);
		
		return () => media.removeEventListener('change', listener);
	}, [query]);

	return matches;
}
