import { useMemo } from 'react';

import { useGetArticlesQuery, useInfiniteGetArticlesQuery } from '@/graphql/generated';
import { transformGraphQLArticle } from '@/lib/transformers';

export function useArticles(
	page: number = 1,
	limit: number = 10,
	categoryName: string = 'articles'
) {
	const offset = (page - 1) * limit;

	const { data, isLoading, error } = useGetArticlesQuery({
		first: limit,
		offset,
		categoryName
	});

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

export function useInfiniteArticles(limit: number = 10, categoryName: string = 'articles') {
	const query = useInfiniteGetArticlesQuery(
		{
			first: limit,
			categoryName
		},
		{
			initialPageParam: { offset: 0 },
			getNextPageParam: (lastPage, allPages) => {
				const totalItems = lastPage.posts?.found || 0;
				const loadedItems = allPages.reduce(
					(acc, page) => acc + (page.posts?.nodes?.length || 0),
					0
				);

				if (loadedItems >= totalItems) return undefined;
				return { offset: loadedItems };
			}
		}
	);

	const articles = useMemo(() => {
		const nodes = query.data?.pages.flatMap(page => page.posts?.nodes || []) || [];
		return nodes.map(transformGraphQLArticle);
	}, [query.data]);

	const totalItems = query.data?.pages[0]?.posts?.found || 0;
	const totalPages = Math.ceil(totalItems / limit) || (articles.length > 0 ? 1 : 0);
	const loadedPages = query.data?.pages.length || 0;

	return {
		articles,
		totalItems,
		totalPages,
		loadedPages,
		isLoading: query.isLoading,
		error: query.error,
		fetchNextPage: query.fetchNextPage,
		hasNextPage: query.hasNextPage,
		isFetchingNextPage: query.isFetchingNextPage
	};
}
