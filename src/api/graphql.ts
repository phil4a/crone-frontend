import { GraphQLClient } from 'graphql-request';

const endpoint = '/api/graphql';

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
