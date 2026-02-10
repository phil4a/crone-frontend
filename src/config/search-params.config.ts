import {
	createSearchParamsCache,
	parseAsArrayOf,
	parseAsInteger,
	parseAsString
} from 'nuqs/server';

export const projectsSearchParams = {
	tags: parseAsArrayOf(parseAsString).withDefault([]),
	minArea: parseAsInteger,
	maxArea: parseAsInteger,
	floors: parseAsArrayOf(parseAsInteger).withDefault([]),
	bedrooms: parseAsArrayOf(parseAsInteger).withDefault([]),
	status: parseAsString,
	sort: parseAsString.withDefault('newest'),
	page: parseAsInteger.withDefault(1)
};

export const projectsCache = createSearchParamsCache(projectsSearchParams);
