import { useMemo } from 'react';

import { useGetChildCategoriesQuery } from '@/graphql/generated';

export interface Category {
	id: number;
	name: string;
	slug: string;
	count: number;
}

export function useArticleCategories() {
	const { data, isLoading, error } = useGetChildCategoriesQuery({
		slug: 'articles'
	});

	const categories = useMemo(() => {
		if (!data?.category?.children?.nodes) return [];

		return data.category.children.nodes
			.filter((node): node is NonNullable<typeof node> => !!node)
			.map(node => ({
				id: node.databaseId,
				name: node.name || '',
				slug: node.slug || '',
				count: node.count || 0
			}));
	}, [data]);

	return {
		categories,
		isLoading,
		error
	};
}
