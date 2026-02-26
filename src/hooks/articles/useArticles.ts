import { useMemo } from 'react';

import { useGetArticlesQuery } from '@/graphql/generated';
import { transformGraphQLArticle } from '@/lib/transformers';

export function useArticles(
	page: number = 1,
	limit: number = 10,
	categoryName: string = 'articles'
) {
	const offset = (page - 1) * limit;

	const { data, isLoading, error } = useGetArticlesQuery(
		{
			first: limit,
			offset,
			categoryName
		}
	);

	const articles = useMemo(() => {
		if (!data?.posts?.nodes) return [];
		return data.posts.nodes.map(transformGraphQLArticle);
	}, [data]);

	const totalItems = data?.posts?.found || 0;
	const totalPages = Math.ceil(totalItems / limit) || (articles.length > 0 ? 1 : 0);

	return {
		articles,
		totalItems,
		totalPages,
		isLoading,
		error
	};
}
