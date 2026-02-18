import { parseAsInteger, useQueryState } from 'nuqs';
import { useMemo } from 'react';

import { ProjectStats } from './useProjectStats';
import { ProjectFiltersData, ProjectSort } from '@/types/filters.types';

export function useProjectFilters(stats: ProjectStats) {
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
	const [tag, setTag] = useQueryState('tag');
	const [areaMin, setAreaMin] = useQueryState('areaMin', parseAsInteger.withDefault(stats.minArea));
	const [areaMax, setAreaMax] = useQueryState('areaMax', parseAsInteger.withDefault(stats.maxArea));
	const [floorParam, setFloorParam] = useQueryState('floor');
	const [bedroomsMin, setBedroomsMin] = useQueryState(
		'bedroomsMin',
		parseAsInteger.withDefault(stats.minBedrooms)
	);
	const [bedroomsMax, setBedroomsMax] = useQueryState(
		'bedroomsMax',
		parseAsInteger.withDefault(stats.maxBedrooms)
	);
	const [statusParam, setStatusParam] = useQueryState('status');
	const [sortParam, setSortParam] = useQueryState('sort');

	const filters: ProjectFiltersData = useMemo(() => {
		const floors =
			floorParam && floorParam.length
				? floorParam
						.split(',')
						.map(value => parseInt(value, 10))
						.filter(value => !Number.isNaN(value))
				: [];

		const statuses =
			statusParam && statusParam.length ? statusParam.split(',').filter(Boolean) : [];

		return {
			tag: tag || null,
			area: { min: areaMin, max: areaMax },
			floor: floors.length ? floors : null,
			bedrooms: { min: bedroomsMin, max: bedroomsMax },
			status: statuses.length ? statuses : null
		};
	}, [tag, areaMin, areaMax, floorParam, bedroomsMin, bedroomsMax, statusParam]);

	const sort: ProjectSort = (sortParam as ProjectSort) || 'default';

	const applyFilters = async (newFilters: ProjectFiltersData) => {
		await setPage(1);
		await setTag(newFilters.tag);
		await setAreaMin(newFilters.area?.min ?? stats.minArea);
		await setAreaMax(newFilters.area?.max ?? stats.maxArea);
		const floorsValue =
			newFilters.floor && newFilters.floor.length ? newFilters.floor.join(',') : null;
		await setFloorParam(floorsValue);
		await setBedroomsMin(newFilters.bedrooms?.min ?? stats.minBedrooms);
		await setBedroomsMax(newFilters.bedrooms?.max ?? stats.maxBedrooms);
		const statusesValue =
			newFilters.status && newFilters.status.length ? newFilters.status.join(',') : null;
		await setStatusParam(statusesValue);
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
		sort,
		setSort: setSortParam,
		applyFilters,
		resetTag,
		setTagFilter
	};
}
