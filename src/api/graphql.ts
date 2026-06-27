import { GraphQLClient } from 'graphql-request';

const FALLBACK_PUBLIC_ENDPOINT = 'https://api.crone-group.ru/graphql';

function getEndpoint(): string {
	if (typeof window !== 'undefined') {
		return '/api/graphql';
	}

	const phase = process.env.NEXT_PHASE;
	const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
	const internal = process.env.WORDPRESS_API_URL_INTERNAL;
	const publicUrl = process.env.WORDPRESS_API_URL_PUBLIC;

	console.log('[graphql.ts] server endpoint resolution:', {
		phase,
		isBuildTime,
		hasInternal: Boolean(internal),
		hasPublic: Boolean(publicUrl)
	});

	if (isBuildTime) {
		const endpoint = publicUrl ?? FALLBACK_PUBLIC_ENDPOINT;
		console.log('[graphql.ts] using build-time endpoint:', endpoint);
		return endpoint;
	}

	const endpoint = internal ?? publicUrl ?? FALLBACK_PUBLIC_ENDPOINT;
	console.log('[graphql.ts] using runtime endpoint:', endpoint);
	return endpoint;
}

const endpoint = getEndpoint();

export const client = new GraphQLClient(endpoint);

export const fetcher = <TData, TVariables extends object = Record<string, never>>(
	query: string,
	variables?: TVariables,
	headers?: HeadersInit
) => {
	return async (): Promise<TData> => {
		try {
			const response = await client.rawRequest<TData, TVariables>(query, variables, headers);
			return response.data;
		} catch (err) {
			console.error('[graphql.ts] request failed:', err);
			throw err;
		}
	};
};
