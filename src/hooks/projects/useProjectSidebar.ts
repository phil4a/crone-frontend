import { useState } from 'react';

import { ProjectStats } from './useProjectStats';
import { ProjectFiltersData } from '@/types/filters.types';

interface UseProjectSidebarParams {
	filters: ProjectFiltersData;
	onApply: (filters: ProjectFiltersData) => void;
	stats?: ProjectStats;
}

export function useProjectSidebar({ filters, onApply, stats }: UseProjectSidebarParams) {
	const [localFilters, setLocalFilters] = useState<ProjectFiltersData>(filters);
	const [areaInputs, setAreaInputs] = useState<{ min: string | null; max: string | null }>({
		min: null,
		max: null
	});
	const [bedroomsInputs, setBedroomsInputs] = useState<{ min: string | null; max: string | null }>({
		min: null,
		max: null
	});

	const minArea = stats?.minArea ?? 0;
	const maxArea = stats?.maxArea ?? 1000;
	const minBedrooms = stats?.minBedrooms ?? 0;
	const maxBedrooms = stats?.maxBedrooms ?? 10;
	const minFloor = stats?.minFloor ?? 1;
	const maxFloor = stats?.maxFloor ?? 3;

	const floorOptions = Array.from({ length: maxFloor - minFloor + 1 }, (_, i) => minFloor + i);

	const handleAreaChange = (value: number[]) => {
		setAreaInputs({ min: null, max: null });
		setLocalFilters(prev => ({
			...prev,
			area: { min: value[0], max: value[1] }
		}));
	};

	const handleAreaInputChange = (type: 'min' | 'max', value: string) => {
		setAreaInputs(prev => ({ ...prev, [type]: value }));

		if (value.trim() === '') return;
		const numValue = Number.parseInt(value, 10);
		if (!Number.isFinite(numValue)) return;

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

	const commitAreaInput = (type: 'min' | 'max') => {
		setLocalFilters(prev => {
			const currentMin = prev.area?.min ?? minArea;
			const currentMax = prev.area?.max ?? maxArea;
			const rawValue = areaInputs[type];

			if (!rawValue || rawValue.trim() === '') {
				if (type === 'min') return { ...prev, area: { min: minArea, max: currentMax } };
				return { ...prev, area: { min: currentMin, max: maxArea } };
			}

			const parsed = Number.parseInt(rawValue, 10);
			if (!Number.isFinite(parsed)) {
				if (type === 'min') return { ...prev, area: { min: minArea, max: currentMax } };
				return { ...prev, area: { min: currentMin, max: maxArea } };
			}

			const nextMin = type === 'min' ? Math.min(parsed, currentMax) : currentMin;
			const nextMax = type === 'max' ? Math.max(parsed, currentMin) : currentMax;

			return { ...prev, area: { min: nextMin, max: nextMax } };
		});

		setAreaInputs(prev => ({ ...prev, [type]: null }));
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
		setBedroomsInputs({ min: null, max: null });
		setLocalFilters(prev => ({
			...prev,
			bedrooms: { min: value[0], max: value[1] }
		}));
	};

	const handleBedroomsInputChange = (type: 'min' | 'max', value: string) => {
		setBedroomsInputs(prev => ({ ...prev, [type]: value }));

		if (value.trim() === '') return;
		const numValue = Number.parseInt(value, 10);
		if (!Number.isFinite(numValue)) return;

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

	const commitBedroomsInput = (type: 'min' | 'max') => {
		setLocalFilters(prev => {
			const currentMin = prev.bedrooms?.min ?? minBedrooms;
			const currentMax = prev.bedrooms?.max ?? maxBedrooms;
			const rawValue = bedroomsInputs[type];

			if (!rawValue || rawValue.trim() === '') {
				if (type === 'min') return { ...prev, bedrooms: { min: minBedrooms, max: currentMax } };
				return { ...prev, bedrooms: { min: currentMin, max: maxBedrooms } };
			}

			const parsed = Number.parseInt(rawValue, 10);
			if (!Number.isFinite(parsed)) {
				if (type === 'min') return { ...prev, bedrooms: { min: minBedrooms, max: currentMax } };
				return { ...prev, bedrooms: { min: currentMin, max: maxBedrooms } };
			}

			const nextMin = type === 'min' ? Math.min(parsed, currentMax) : currentMin;
			const nextMax = type === 'max' ? Math.max(parsed, currentMin) : currentMax;

			return { ...prev, bedrooms: { min: nextMin, max: nextMax } };
		});

		setBedroomsInputs(prev => ({ ...prev, [type]: null }));
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

		setAreaInputs({ min: null, max: null });
		setBedroomsInputs({ min: null, max: null });
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
		areaInputs,
		bedroomsInputs,
		handleAreaChange,
		handleAreaInputChange,
		commitAreaInput,
		handleFloorChange,
		handleBedroomsChange,
		handleBedroomsInputChange,
		commitBedroomsInput,
		handleStatusChange,
		handleResetFilters,
		hasActiveFilters,
		handleApply
	};
}
