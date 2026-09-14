export const FALLBACK_PUBLIC_ENDPOINT = 'https://api.crone-group.ru/graphql';

export type EndpointSource = 'internal' | 'public' | 'fallback';

export type ResolvedEndpoint = {
	endpoint: string;
	source: EndpointSource;
};

/**
 * Резолвит серверный GraphQL endpoint WordPress.
 *
 * На этапе `next build` внутренний адрес недоступен (контейнер ещё не в сети Dokploy),
 * поэтому там берётся только публичный URL. В рантайме приоритет у внутреннего адреса.
 */
export function resolveWordpressGraphqlEndpoint(): ResolvedEndpoint {
	const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
	const internal = process.env.WORDPRESS_API_URL_INTERNAL;
	const publicUrl = process.env.WORDPRESS_API_URL_PUBLIC;

	if (!isBuildTime && internal) {
		return { endpoint: internal, source: 'internal' };
	}

	if (publicUrl) {
		return { endpoint: publicUrl, source: 'public' };
	}

	return { endpoint: FALLBACK_PUBLIC_ENDPOINT, source: 'fallback' };
}
