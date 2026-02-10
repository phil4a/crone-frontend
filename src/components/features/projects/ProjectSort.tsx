'use client';

interface ProjectSortProps {
	sort: string;
	setSort: (sort: string) => void;
}

export function ProjectSort({ sort, setSort }: ProjectSortProps) {
	return (
		<div className='flex items-center gap-3'>
			<span className='text-gray-500 text-sm'>Сортировка:</span>
			<select
				value={sort}
				onChange={e => setSort(e.target.value)}
				className='px-3 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50'
			>
				<option value='newest'>Сначала новые</option>
				<option value='oldest'>Сначала старые</option>
				<option value='area_asc'>Площадь (по возрастанию)</option>
				<option value='area_desc'>Площадь (по убыванию)</option>
			</select>
		</div>
	);
}
