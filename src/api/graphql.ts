import { GraphQLClient } from 'graphql-request';

function getGraphqlEndpoint(): string {
	const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_API_URL?.trim();
	if (!endpoint) {
		throw new Error('NEXT_PUBLIC_GRAPHQL_API_URL is required');
	}

	try {
		new URL(endpoint);
	} catch {
		throw new Error('NEXT_PUBLIC_GRAPHQL_API_URL must be a valid absolute URL');
	}

	return endpoint;
}

const endpoint = getGraphqlEndpoint();

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
