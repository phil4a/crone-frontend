import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://crone-group.ru/graphql';

export const client = new GraphQLClient(endpoint);

export const fetcher = <TData, TVariables>(
	query: string,
	variables?: TVariables,
	headers?: RequestInit['headers']
) => {
	return async (): Promise<TData> => {
		return client.request<TData>(query, variables as any, headers as any);
	};
};
