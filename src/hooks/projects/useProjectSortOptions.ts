import { ProjectSort } from '@/types/filters.types';

const SORT_OPTIONS: { value: ProjectSort; label: string }[] = [
	{ value: 'default', label: 'по умолчанию' },
	{ value: 'title_asc', label: 'по названию (А-Я)' },
	{ value: 'title_desc', label: 'по названию (Я-А)' },
	{ value: 'likes_desc', label: 'по популярности' },
	{ value: 'area_desc', label: 'сначала с большей площадью' },
	{ value: 'area_asc', label: 'сначала с меньшей площадью' }
];

export function useProjectSortOptions() {
	const getLabel = (sort: ProjectSort) => {
		const option = SORT_OPTIONS.find(item => item.value === sort);
		return option?.label ?? 'по умолчанию';
	};

	return {
		options: SORT_OPTIONS,
		getLabel
	};
}

