import { useEffect, useState } from 'react';

import { ProjectStats } from './useProjectStats';
import { ProjectFiltersData } from '@/types/filters.types';

interface UseProjectSidebarParams {
	filters: ProjectFiltersData;
	onApply: (filters: ProjectFiltersData) => void;
	stats?: ProjectStats;
}

export function useProjectSidebar({ filters, onApply, stats }: UseProjectSidebarParams) {
	const [localFilters, setLocalFilters] = useState<ProjectFiltersData>(filters);

	const minArea = stats?.minArea ?? 0;
	const maxArea = stats?.maxArea ?? 1000;
	const minBedrooms = stats?.minBedrooms ?? 0;
	const maxBedrooms = stats?.maxBedrooms ?? 10;
	const minFloor = stats?.minFloor ?? 1;
	const maxFloor = stats?.maxFloor ?? 3;

	const floorOptions = Array.from({ length: maxFloor - minFloor + 1 }, (_, i) => minFloor + i);

	useEffect(() => {
		if (JSON.stringify(filters) !== JSON.stringify(localFilters)) {
			setLocalFilters(filters);
		}
	}, [filters]);

	const handleAreaChange = (value: number[]) => {
		setLocalFilters(prev => ({
			...prev,
			area: { min: value[0], max: value[1] }
		}));
	};

	const handleAreaInputChange = (type: 'min' | 'max', value: string) => {
		const numValue = parseInt(value, 10);
		if (isNaN(numValue)) return;

		setLocalFilters(prev => {
			const currentMin = prev.area?.min ?? minArea;
			const currentMax = prev.area?.max ?? maxArea;

			if (type === 'min') {
				return {
					...prev,
					area: { min: Math.min(numValue, currentMax), max: currentMax }
				};
			} else {
				return {
					...prev,
					area: { min: currentMin, max: Math.max(numValue, currentMin) }
				};
			}
		});
	};

	const handleFloorChange = (floor: number) => {
		setLocalFilters(prev => {
			const current = prev.floor ?? [];
			const exists = current.includes(floor);
			const next = exists ? current.filter(f => f !== floor) : [...current, floor];

			return {
				...prev,
				floor: next.length ? next : null
			};
		});
	};

	const handleBedroomsChange = (value: number[]) => {
		setLocalFilters(prev => ({
			...prev,
			bedrooms: { min: value[0], max: value[1] }
		}));
	};

	const handleBedroomsInputChange = (type: 'min' | 'max', value: string) => {
		const numValue = parseInt(value, 10);
		if (isNaN(numValue)) return;

		setLocalFilters(prev => {
			const currentMin = prev.bedrooms?.min ?? minBedrooms;
			const currentMax = prev.bedrooms?.max ?? maxBedrooms;

			if (type === 'min') {
				return {
					...prev,
					bedrooms: { min: Math.min(numValue, currentMax), max: currentMax }
				};
			} else {
				return {
					...prev,
					bedrooms: { min: currentMin, max: Math.max(numValue, currentMin) }
				};
			}
		});
	};

	const handleStatusChange = (status: string) => {
		setLocalFilters(prev => {
			const current = prev.status ?? [];
			const exists = current.includes(status);
			const next = exists ? current.filter(s => s !== status) : [...current, status];

			return {
				...prev,
				status: next.length ? next : null
			};
		});
	};

	const handleResetFilters = () => {
		const resetFilters: ProjectFiltersData = {
			...filters,
			area: { min: minArea, max: maxArea },
			bedrooms: { min: minBedrooms, max: maxBedrooms },
			floor: null,
			status: null
		};

		setLocalFilters(resetFilters);
		onApply(resetFilters);
	};

	const hasActiveFilters =
		(filters.area?.min ?? minArea) !== minArea ||
		(filters.area?.max ?? maxArea) !== maxArea ||
		(filters.bedrooms?.min ?? minBedrooms) !== minBedrooms ||
		(filters.bedrooms?.max ?? maxBedrooms) !== maxBedrooms ||
		(filters.floor ?? null) !== null ||
		(filters.status ?? null) !== null;

	const handleApply = () => {
		onApply(localFilters);
	};

	return {
		localFilters,
		minArea,
		maxArea,
		minBedrooms,
		maxBedrooms,
		floorOptions,
		handleAreaChange,
		handleAreaInputChange,
		handleFloorChange,
		handleBedroomsChange,
		handleBedroomsInputChange,
		handleStatusChange,
		handleResetFilters,
		hasActiveFilters,
		handleApply
	};
}
