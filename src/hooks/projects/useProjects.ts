import { useMemo } from 'react';

import { ITEMS_PER_PAGE } from '@/config/site.config';

import { useGetProjectsQuery, useInfiniteGetProjectsQuery } from '@/graphql/generated';
import { buildProjectsVariables } from '@/lib/projects/buildProjectsVariables';
import { transformGraphQLProject } from '@/lib/transformers';
import { ProjectFiltersData, ProjectSort } from '@/types/filters.types';

export function useProjects(
	page: number,
	limit: number = ITEMS_PER_PAGE,
	filters?: ProjectFiltersData,
	sort?: ProjectSort
) {
	const offset = (page - 1) * limit;
	const variables = { ...buildProjectsVariables(limit, filters, sort), offset };

	const { data, isLoading, error } = useGetProjectsQuery(variables);

	const filteredProjects = useMemo(() => {
		if (!data?.posts?.nodes) return [];
		return data.posts.nodes.map(transformGraphQLProject);
	}, [data]);

	const totalItems = data?.posts?.found || 0;
	const totalPages = Math.ceil(totalItems / limit) || (filteredProjects.length > 0 ? 1 : 0);

	return {
		projects: filteredProjects,
		totalItems,
		totalPages,
		isLoading,
		error
	};
}

export function useInfiniteProjects(
	limit: number = ITEMS_PER_PAGE,
	filters?: ProjectFiltersData,
	sort?: ProjectSort,
	enabled: boolean = true
) {
	const variables = buildProjectsVariables(limit, filters, sort);

	const query = useInfiniteGetProjectsQuery(variables, {
		initialPageParam: { offset: 0 },
		enabled,
		getNextPageParam: (lastPage, allPages) => {
			const totalItems = lastPage.posts?.found || 0;
			const loadedItems = allPages.reduce((acc, page) => acc + (page.posts?.nodes?.length || 0), 0);

			if (loadedItems >= totalItems) return undefined;
			return { offset: loadedItems };
		}
	});

	const projects = useMemo(() => {
		const nodes = query.data?.pages.flatMap(page => page.posts?.nodes || []) || [];
		return nodes.map(transformGraphQLProject);
	}, [query.data]);

	const totalItems = query.data?.pages[0]?.posts?.found || 0;
	const totalPages = Math.ceil(totalItems / limit) || (projects.length > 0 ? 1 : 0);
	const loadedPages = query.data?.pages.length || 0;

	return {
		projects,
		totalItems,
		totalPages,
		loadedPages,
		isLoading: !enabled || query.isLoading,
		error: query.error,
		fetchNextPage: query.fetchNextPage,
		hasNextPage: query.hasNextPage,
		isFetchingNextPage: query.isFetchingNextPage
	};
}
