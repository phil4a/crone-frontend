'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';

import { cn } from '@/lib/utils';
import { ProjectFiltersData } from '@/types/filters.types';

interface ProjectSidebarProps {
	filters: ProjectFiltersData;
	onApply: (filters: ProjectFiltersData) => void;
	className?: string;
}

const FLOOR_OPTIONS = [1, 2, 3];
const STATUS_OPTIONS = ['В работе', 'Завершен'];

export function ProjectSidebar({ filters, onApply, className }: ProjectSidebarProps) {
	const [localFilters, setLocalFilters] = useState<ProjectFiltersData>(filters);

	useEffect(() => {
		setLocalFilters(filters);
	}, [filters]);

	// -- Handlers --

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
			const currentMin = prev.area?.min ?? 0;
			const currentMax = prev.area?.max ?? 1000;

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
		setLocalFilters(prev => ({
			...prev,
			floor: prev.floor === floor ? null : floor
		}));
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
			const currentMin = prev.bedrooms?.min ?? 0;
			const currentMax = prev.bedrooms?.max ?? 10;

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
		setLocalFilters(prev => ({
			...prev,
			status: prev.status === status ? null : status
		}));
	};

	return (
		<div className={cn('flex flex-col gap-8', className)}>
			{/* Area */}
			<div>
				<h4 className='text-lg font-bold mb-5 text-main'>Площадь</h4>
				<Slider
					value={[localFilters.area?.min ?? 0, localFilters.area?.max ?? 1000]}
					min={0}
					max={1000}
					step={10}
					onValueChange={handleAreaChange}
				/>
				<div className='flex items-center gap-2 mt-5'>
					<Input
						id='area-min'
						type='number'
						value={localFilters.area?.min ?? 0}
						onChange={e => handleAreaInputChange('min', e.target.value)}
						className='flex-1 py-3.25 px-3 rounded-lg border border-light-beige text-center text-sm text-brown bg-white focus:ring-0 focus:border-brown'
					/>
					—
					<Input
						id='area-max'
						type='number'
						value={localFilters.area?.max ?? 1000}
						onChange={e => handleAreaInputChange('max', e.target.value)}
						className='flex-1 py-3.25 px-3 rounded-lg border border-light-beige text-center text-sm text-brown bg-white focus:ring-0 focus:border-brown'
					/>
				</div>
			</div>

			{/* Floor */}
			<div>
				<h4 className='text-lg font-bold mb-5 text-main'>Этажность</h4>
				<div className='flex flex-col gap-3'>
					{FLOOR_OPTIONS.map(floor => (
						<div
							key={floor}
							className='flex items-center gap-3 cursor-pointer group w-fit'
							onClick={() => handleFloorChange(floor)}
						>
							<div
								className={cn(
									'w-5 h-5 rounded border flex items-center justify-center transition-colors bg-white',
									localFilters.floor === floor
										? 'bg-brown border-brown text-white'
										: 'border-light-beige group-hover:border-brown'
								)}
							>
								{localFilters.floor === floor && (
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
					value={[localFilters.bedrooms?.min ?? 1, localFilters.bedrooms?.max ?? 10]}
					min={0}
					max={10}
					step={1}
					onValueChange={handleBedroomsChange}
				/>
				<div className='flex items-center gap-2 mt-5'>
					<Input
						id='bedrooms-min'
						type='number'
						value={localFilters.bedrooms?.min ?? 1}
						onChange={e => handleBedroomsInputChange('min', e.target.value)}
						className='flex-1 py-3.25 px-3 rounded-lg border border-light-beige text-center text-sm text-brown bg-white focus:ring-0 focus:border-brown'
					/>
					—
					<Input
						id='bedrooms-max'
						type='number'
						value={localFilters.bedrooms?.max ?? 10}
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
									localFilters.status === status
										? 'bg-brown border-brown text-white'
										: 'border-light-beige group-hover:border-brown'
								)}
							>
								{localFilters.status === status && (
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
				variant={'default'}
				onClick={() => onApply(localFilters)}
			>
				Показать
			</Button>
		</div>
	);
}
