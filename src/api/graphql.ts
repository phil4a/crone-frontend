import { GraphQLClient } from 'graphql-request';

function getEndpoint(): string {
	if (typeof window === 'undefined') {
		const internal = process.env.WORDPRESS_API_URL_INTERNAL;
		if (!internal) {
			throw new Error('WORDPRESS_API_URL_INTERNAL is required on the server');
		}
		return internal;
	}

	return '/api/graphql';
}

const endpoint = getEndpoint();

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
