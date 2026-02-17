import { useMemo } from 'react';

import { ITEMS_PER_PAGE } from '@/config/site.config';

import { useGetProjectsQuery } from '@/graphql/generated';
import { transformGraphQLProject } from '@/lib/transformers';
import { ProjectFiltersData } from '@/types/filters.types';

export function useProjects(
	page: number,
	limit: number = ITEMS_PER_PAGE,
	filters?: ProjectFiltersData
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
			projectStatuses: selectedStatuses || undefined
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
