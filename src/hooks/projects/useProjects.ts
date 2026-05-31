import { useMemo } from 'react';

import { ITEMS_PER_PAGE } from '@/config/site.config';

import { useGetProjectsQuery, useInfiniteGetProjectsQuery } from '@/graphql/generated';
import { transformGraphQLProject } from '@/lib/transformers';
import { ProjectFiltersData, ProjectSort } from '@/types/filters.types';

export function useProjects(
	page: number,
	limit: number = ITEMS_PER_PAGE,
	filters?: ProjectFiltersData,
	sort?: ProjectSort
) {
	const offset = (page - 1) * limit;

	const selectedFloors = filters?.floor && filters.floor.length ? filters.floor : null;
	const selectedStatuses = filters?.status && filters.status.length ? filters.status : null;

	const floorForQuery =
		selectedFloors && selectedFloors.length === 1 ? selectedFloors[0] : undefined;
	const statusForQuery =
		selectedStatuses && selectedStatuses.length === 1 ? selectedStatuses[0] : undefined;

	const { data, isLoading, error } = useGetProjectsQuery(
		{
			first: limit,
			offset,
			tag: filters?.tag || undefined,
			minArea: filters?.area?.min,
			maxArea: filters?.area?.max,
			floor: floorForQuery,
			floors: selectedFloors || undefined,
			minBedrooms: filters?.bedrooms?.min,
			maxBedrooms: filters?.bedrooms?.max,
			projectStatus: statusForQuery,
			projectStatuses: selectedStatuses || undefined,
			sort: sort && sort !== 'default' ? sort : undefined
		},
		{
			// Remove placeholderData to show skeletons on filter change
		}
	);

	// Transform Data
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
	sort?: ProjectSort
) {
	const selectedFloors = filters?.floor && filters.floor.length ? filters.floor : null;
	const selectedStatuses = filters?.status && filters.status.length ? filters.status : null;

	const floorForQuery =
		selectedFloors && selectedFloors.length === 1 ? selectedFloors[0] : undefined;
	const statusForQuery =
		selectedStatuses && selectedStatuses.length === 1 ? selectedStatuses[0] : undefined;

	const variables = {
		first: limit,
		tag: filters?.tag || undefined,
		minArea: filters?.area?.min,
		maxArea: filters?.area?.max,
		floor: floorForQuery,
		floors: selectedFloors || undefined,
		minBedrooms: filters?.bedrooms?.min,
		maxBedrooms: filters?.bedrooms?.max,
		projectStatus: statusForQuery,
		projectStatuses: selectedStatuses || undefined,
		sort: sort && sort !== 'default' ? sort : undefined
	};

	const query = useInfiniteGetProjectsQuery(variables, {
		initialPageParam: { offset: 0 },
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
		isLoading: query.isLoading,
		error: query.error,
		fetchNextPage: query.fetchNextPage,
		hasNextPage: query.hasNextPage,
		isFetchingNextPage: query.isFetchingNextPage
	};
}
