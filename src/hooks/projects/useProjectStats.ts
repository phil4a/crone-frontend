import { useGetProjectStatsQuery } from '@/graphql/generated';

export interface ProjectStats {
	minArea: number;
	maxArea: number;
	minBedrooms: number;
	maxBedrooms: number;
	minFloor: number;
	maxFloor: number;
}

const DEFAULT_STATS: ProjectStats = {
	minArea: 0,
	maxArea: 1000,
	minBedrooms: 0,
	maxBedrooms: 10,
	minFloor: 1,
	maxFloor: 3
};

export function useProjectStats() {
	const { data, isLoading, error } = useGetProjectStatsQuery();
	const stats = data?.projectStats;

	const normalizedStats: ProjectStats = {
		minArea: stats?.minArea ?? DEFAULT_STATS.minArea,
		maxArea: stats?.maxArea ?? DEFAULT_STATS.maxArea,
		minBedrooms: stats?.minBedrooms ?? DEFAULT_STATS.minBedrooms,
		maxBedrooms: stats?.maxBedrooms ?? DEFAULT_STATS.maxBedrooms,
		minFloor: stats?.minFloor ?? DEFAULT_STATS.minFloor,
		maxFloor: stats?.maxFloor ?? DEFAULT_STATS.maxFloor
	};

	return {
		stats: normalizedStats,
		isLoading,
		error
	};
}
