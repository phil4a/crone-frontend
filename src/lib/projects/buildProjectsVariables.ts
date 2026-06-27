import { GetProjectsQueryVariables } from '@/graphql/generated';
import { ProjectFiltersData, ProjectSort } from '@/types/filters.types';

export function buildProjectsVariables(
	limit: number,
	filters?: ProjectFiltersData,
	sort?: ProjectSort
): GetProjectsQueryVariables {
	const selectedFloors = filters?.floor && filters.floor.length ? filters.floor : null;
	const selectedStatuses = filters?.status && filters.status.length ? filters.status : null;

	const floorForQuery =
		selectedFloors && selectedFloors.length === 1 ? selectedFloors[0] : undefined;
	const statusForQuery =
		selectedStatuses && selectedStatuses.length === 1 ? selectedStatuses[0] : undefined;

	return {
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
}
