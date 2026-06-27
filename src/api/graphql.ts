import { GraphQLClient } from 'graphql-request';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

function getEndpoint(): string {
	if (typeof window !== 'undefined') {
		return '/api/graphql';
	}

	const isBuildTime = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;

	if (isBuildTime) {
		const publicEndpoint = process.env.WORDPRESS_API_URL_PUBLIC;
		if (!publicEndpoint) {
			throw new Error('WORDPRESS_API_URL_PUBLIC is required at build time');
		}
		return publicEndpoint;
	}

	const internal = process.env.WORDPRESS_API_URL_INTERNAL;
	if (!internal) {
		throw new Error('WORDPRESS_API_URL_INTERNAL is required at runtime');
	}
	return internal;
}

const endpoint = getEndpoint();
console.log(`Graphql endpoint:`, endpoint);

export const client = new GraphQLClient(endpoint);

export const fetcher = <TData, TVariables extends object = Record<string, never>>(
	query: string,
	variables?: TVariables,
	headers?: HeadersInit
) => {
	return async (): Promise<TData> => {
		const response = await client.rawRequest<TData, TVariables>(query, variables, headers);
		return response.data;
	};
};
