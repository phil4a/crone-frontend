'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';

import { useProjectSidebar } from '@/hooks/projects/useProjectSidebar';

import { cn } from '@/lib/utils';
import { ProjectFiltersData } from '@/types/filters.types';

export interface ProjectSidebarProps {
	filters: ProjectFiltersData;
	onApply: (filters: ProjectFiltersData) => void;
	className?: string;
	stats?: {
		minArea: number;
		maxArea: number;
		minBedrooms: number;
		maxBedrooms: number;
		minFloor: number;
		maxFloor: number;
	};
}

const STATUS_OPTIONS = ['В работе', 'Завершен'];

export function ProjectSidebar({ filters, onApply, className, stats }: ProjectSidebarProps) {
	const {
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
	} = useProjectSidebar({ filters, onApply, stats });

	return (
		<div className={cn('flex flex-col gap-5', className)}>
			{/* Area */}
			<div>
				<h4 className='text-lg font-bold mb-5 text-main'>Площадь</h4>
				<Slider
					value={[localFilters.area?.min ?? minArea, localFilters.area?.max ?? maxArea]}
					min={minArea}
					max={maxArea}
					step={10}
					onValueChange={handleAreaChange}
				/>
				<div className='flex items-center gap-2 mt-5'>
					<Input
						id='area-min'
						type='number'
						aria-label='Минимальная площадь, м²'
						value={localFilters.area?.min ?? minArea}
						onChange={e => handleAreaInputChange('min', e.target.value)}
						className='flex-1 py-3.25 px-3 rounded-lg border border-light-beige text-center text-sm text-brown bg-white focus:ring-0 focus:border-brown'
					/>
					—
					<Input
						id='area-max'
						type='number'
						aria-label='Максимальная площадь, м²'
						value={localFilters.area?.max ?? maxArea}
						onChange={e => handleAreaInputChange('max', e.target.value)}
						className='flex-1 py-3.25 px-3 rounded-lg border border-light-beige text-center text-sm text-brown bg-white focus:ring-0 focus:border-brown'
					/>
				</div>
			</div>

			{/* Floor */}
			<div>
				<h4 className='text-lg font-bold mb-5 text-main'>Этажность</h4>
				<div className='flex flex-col gap-3'>
					{floorOptions.map(floor => (
						<div
							key={floor}
							className='flex items-center gap-3 cursor-pointer group w-fit'
							onClick={() => handleFloorChange(floor)}
						>
							<div
								className={cn(
									'w-5 h-5 rounded border flex items-center justify-center transition-colors bg-white',
									localFilters.floor?.includes(floor)
										? 'bg-brown border-brown text-white'
										: 'border-light-beige group-hover:border-brown'
								)}
							>
								{localFilters.floor?.includes(floor) && (
									<svg
										width='10'
										height='8'
										viewBox='0 0 10 8'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M1 3.5L4 6.5L9 1.5'
											stroke='currentColor'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								)}
							</div>
							<span className='text-sm text-brown'>{floor}</span>
						</div>
					))}
				</div>
			</div>

			{/* Bedrooms */}
			<div>
				<h4 className='text-lg font-bold mb-5 text-main'>Спальни</h4>
				<Slider
					value={[
						localFilters.bedrooms?.min ?? minBedrooms,
						localFilters.bedrooms?.max ?? maxBedrooms
					]}
					min={minBedrooms}
					max={maxBedrooms}
					step={1}
					onValueChange={handleBedroomsChange}
				/>
				<div className='flex items-center gap-2 mt-5'>
					<Input
						id='bedrooms-min'
						type='number'
						aria-label='Минимум спален'
						value={localFilters.bedrooms?.min ?? minBedrooms}
						onChange={e => handleBedroomsInputChange('min', e.target.value)}
						className='flex-1 py-3.25 px-3 rounded-lg border border-light-beige text-center text-sm text-brown bg-white focus:ring-0 focus:border-brown'
					/>
					—
					<Input
						id='bedrooms-max'
						type='number'
						aria-label='Максимум спален'
						value={localFilters.bedrooms?.max ?? maxBedrooms}
						onChange={e => handleBedroomsInputChange('max', e.target.value)}
						className='flex-1 py-3.25 px-3 rounded-lg border border-light-beige text-center text-sm text-brown bg-white focus:ring-0 focus:border-brown'
					/>
				</div>
			</div>

			{/* Status */}
			<div>
				<h4 className='text-lg font-bold mb-5 text-main'>Статус</h4>
				<div className='flex flex-col gap-3'>
					{STATUS_OPTIONS.map(status => (
						<div
							key={status}
							className='flex items-center gap-3 cursor-pointer group w-fit'
							onClick={() => handleStatusChange(status)}
						>
							<div
								className={cn(
									'w-5 h-5 rounded border flex items-center justify-center transition-colors bg-white',
									localFilters.status?.includes(status)
										? 'bg-brown border-brown text-white'
										: 'border-light-beige group-hover:border-brown'
								)}
							>
								{localFilters.status?.includes(status) && (
									<svg
										width='10'
										height='8'
										viewBox='0 0 10 8'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M1 3.5L4 6.5L9 1.5'
											stroke='currentColor'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								)}
							</div>
							<span className='text-sm text-brown'>{status}</span>
						</div>
					))}
				</div>
			</div>

			<Button
				variant='default'
				onClick={handleApply}
			>
				Показать
			</Button>
			{hasActiveFilters && (
				<Button
					variant='secondary'
					size='sm'
					onClick={handleResetFilters}
					className='mb-2'
				>
					Сбросить фильтры
				</Button>
			)}
		</div>
	);
}
