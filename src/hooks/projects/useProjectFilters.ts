import { parseAsInteger, useQueryState } from 'nuqs';
import { useMemo } from 'react';

import { ProjectStats } from './useProjectStats';
import { ProjectFiltersData } from '@/types/filters.types';

export function useProjectFilters(stats: ProjectStats) {
	// URL State
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
	const [tag, setTag] = useQueryState('tag');
	const [areaMin, setAreaMin] = useQueryState('areaMin', parseAsInteger.withDefault(stats.minArea));
	const [areaMax, setAreaMax] = useQueryState('areaMax', parseAsInteger.withDefault(stats.maxArea));
	const [floor, setFloor] = useQueryState('floor', parseAsInteger);
	const [bedroomsMin, setBedroomsMin] = useQueryState(
		'bedroomsMin',
		parseAsInteger.withDefault(stats.minBedrooms)
	);
	const [bedroomsMax, setBedroomsMax] = useQueryState(
		'bedroomsMax',
		parseAsInteger.withDefault(stats.maxBedrooms)
	);
	const [status, setStatus] = useQueryState('status');

	// Derived filters object
	const filters: ProjectFiltersData = useMemo(
		() => ({
			tag: tag || null,
			area: { min: areaMin, max: areaMax },
			floor: floor || null,
			bedrooms: { min: bedroomsMin, max: bedroomsMax },
			status: status || null
		}),
		[tag, areaMin, areaMax, floor, bedroomsMin, bedroomsMax, status]
	);

	const applyFilters = async (newFilters: ProjectFiltersData) => {
		await setPage(1);
		await setTag(newFilters.tag);
		await setAreaMin(newFilters.area?.min ?? stats.minArea);
		await setAreaMax(newFilters.area?.max ?? stats.maxArea);
		await setFloor(newFilters.floor);
		await setBedroomsMin(newFilters.bedrooms?.min ?? stats.minBedrooms);
		await setBedroomsMax(newFilters.bedrooms?.max ?? stats.maxBedrooms);
		await setStatus(newFilters.status);
	};

	const resetTag = async () => {
		await setPage(1);
		await setTag(null);
	};

	const setTagFilter = async (newTag: string | null) => {
		await setPage(1);
		await setTag(newTag);
	};

	return {
		page,
		setPage,
		tag,
		filters,
		applyFilters,
		resetTag,
		setTagFilter
	};
}
