'use client';

import { WPTag } from '@/types/wp.types';

interface ProjectFiltersProps {
	filters: {
		tags: string[];
		minArea: number | null;
		maxArea: number | null;
		floors: number[];
		bedrooms: number[];
		status: string | null;
	};
	setFilters: (filters: any) => void;
	tags: WPTag[] | undefined;
}

export function ProjectFilters({ filters, setFilters, tags }: ProjectFiltersProps) {
	const handleTagToggle = (slug: string) => {
		const newTags = filters.tags.includes(slug)
			? filters.tags.filter(t => t !== slug)
			: [...filters.tags, slug];
		setFilters({ tags: newTags.length ? newTags : null }); // nuqs handles null as remove
	};

	const handleFloorToggle = (floor: number) => {
		const newFloors = filters.floors.includes(floor)
			? filters.floors.filter(f => f !== floor)
			: [...filters.floors, floor];
		setFilters({ floors: newFloors.length ? newFloors : null });
	};

	const handleBedroomToggle = (count: number) => {
		const newBedrooms = filters.bedrooms.includes(count)
			? filters.bedrooms.filter(b => b !== count)
			: [...filters.bedrooms, count];
		setFilters({ bedrooms: newBedrooms.length ? newBedrooms : null });
	};

	return (
		<div className='space-y-8'>
			{/* Tags / Types */}
			<div>
				<h3 className='text-lg font-semibold mb-4'>Тип объекта</h3>
				<div className='flex flex-wrap gap-2'>
					{tags?.map(tag => (
						<button
							key={tag.id}
							onClick={() => handleTagToggle(tag.slug)}
							className={`px-4 py-2 rounded-full text-sm transition-colors border ${
								filters.tags.includes(tag.slug)
									? 'bg-primary text-white border-primary'
									: 'bg-white text-gray-600 border-gray-200 hover:border-primary'
							}`}
						>
							{tag.name}
						</button>
					))}
				</div>
			</div>

			{/* Area */}
			<div>
				<h3 className='text-lg font-semibold mb-4'>Площадь (м²)</h3>
				<div className='flex gap-4 items-center'>
					<input
						type='number'
						placeholder='От'
						value={filters.minArea || ''}
						onChange={e =>
							setFilters({ minArea: e.target.value ? Number(e.target.value) : null })
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50'
					/>
					<span className='text-gray-400'>—</span>
					<input
						type='number'
						placeholder='До'
						value={filters.maxArea || ''}
						onChange={e =>
							setFilters({ maxArea: e.target.value ? Number(e.target.value) : null })
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50'
					/>
				</div>
			</div>

			{/* Floors */}
			<div>
				<h3 className='text-lg font-semibold mb-4'>Этажность</h3>
				<div className='flex flex-wrap gap-2'>
					{[1, 2, 3].map(floor => (
						<button
							key={floor}
							onClick={() => handleFloorToggle(floor)}
							className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border transition-colors ${
								filters.floors.includes(floor)
									? 'bg-primary text-white border-primary'
									: 'bg-white text-gray-600 border-gray-200 hover:border-primary'
							}`}
						>
							{floor}
						</button>
					))}
				</div>
			</div>

			{/* Bedrooms */}
			<div>
				<h3 className='text-lg font-semibold mb-4'>Спальни</h3>
				<div className='flex flex-wrap gap-2'>
					{[3, 4, 5, 6].map(count => (
						<button
							key={count}
							onClick={() => handleBedroomToggle(count)}
							className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border transition-colors ${
								filters.bedrooms.includes(count)
									? 'bg-primary text-white border-primary'
									: 'bg-white text-gray-600 border-gray-200 hover:border-primary'
							}`}
						>
							{count}
						</button>
					))}
				</div>
			</div>
			
			{/* Status */}
			{/* Assuming status is string like 'sold', 'available' etc. If we don't know values, maybe skip or fetch? */}
			{/* Let's skip status for now or add a simple dropdown if needed. 
			    User mentioned status is an ACF field. Values might be specific. */}
		</div>
	);
}
