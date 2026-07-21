import { useQuery } from '@tanstack/react-query';

import type { PublicConfig } from '@/types/config.types';

const EMPTY_CONFIG: PublicConfig = { smartCaptchaSiteKey: null };

async function fetchPublicConfig(): Promise<PublicConfig> {
	const response = await fetch('/api/public-config', { cache: 'no-store' });

	if (!response.ok) {
		return EMPTY_CONFIG;
	}

	try {
		return (await response.json()) as PublicConfig;
	} catch {
		return EMPTY_CONFIG;
	}
}

export function usePublicConfig() {
	return useQuery({
		queryKey: ['public-config'],
		queryFn: fetchPublicConfig,
		staleTime: Infinity,
		gcTime: Infinity
	});
}
