import { GraphQLClient } from 'graphql-request';

import { resolveWordpressGraphqlEndpoint } from './wordpress-endpoint';

function getEndpoint(): string {
	if (typeof window !== 'undefined') {
		return `${window.location.origin}/api/graphql`;
	}

	const { endpoint, source } = resolveWordpressGraphqlEndpoint();
	console.log(`[graphql] server endpoint: ${endpoint} (source: ${source})`);
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
			console.error('[graphql] request failed:', err);
			throw err;
		}
	};
};
