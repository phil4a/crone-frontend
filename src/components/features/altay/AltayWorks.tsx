'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { ProjectCard } from '@/components/common/projects/ProjectCard';
import { Button } from '@/components/ui/Button';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Slider } from '@/components/ui/Slider';
import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/pages.config';

import { useProjectStats } from '@/hooks/projects/useProjectStats';
import { useProjects } from '@/hooks/projects/useProjects';

import { cn } from '@/lib/utils';
import { ProjectFiltersData } from '@/types/filters.types';

const TYPE_CHIPS: { label: string; value: string | null }[] = [
	{ label: 'Все', value: null },
	{ label: 'Частные дома', value: 'chastnye-doma' },
	{ label: 'Бани и СПА', value: 'spa' },
	{ label: 'Коммерческие объекты', value: 'kommercheskaya-nedvizhimost' }
];

const FLOOR_CHIPS = [1, 2, 3];

export function AltayWorks() {
	const { stats, isReady } = useProjectStats();

	const [tag, setTag] = useState<string | null>(null);
	const [floors, setFloors] = useState<number[]>([]);
	// null = пользователь не менял диапазон → берём полный диапазон из статистики
	const [area, setArea] = useState<[number, number] | null>(null);
	const [areaDraft, setAreaDraft] = useState<[number, number] | null>(null);

	const fullRange: [number, number] = [stats.minArea, stats.maxArea];
	const displayRange = areaDraft ?? fullRange;

	const filters: ProjectFiltersData = useMemo(
		() => ({
			tag,
			area: area ? { min: area[0], max: area[1] } : null,
			floor: floors.length ? floors : null,
			bedrooms: null,
			status: null
		}),
		[tag, area, floors]
	);

	const { projects, totalItems, isLoading, error } = useProjects(1, 6, filters);

	const toggleFloor = (value: number) =>
		setFloors(prev => (prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]));

	const resetFilters = () => {
		setTag(null);
		setFloors([]);
		setArea(null);
		setAreaDraft(null);
	};

	const hasActiveFilters = tag !== null || floors.length > 0 || area !== null;

	const allProjectsHref = tag ? `${PAGE.OBJECTS}?tag=${encodeURIComponent(tag)}` : PAGE.OBJECTS;

	return (
		<section
			id='altay-raboty'
			className='py-16 md:py-20 lg:py-25 bg-light-gray scroll-mt-24'
		>
			<div className='container'>
				<div className='mb-8 max-w-3xl md:mb-10'>
					<Title
						as='h2'
						variant='h2'
						className='mb-4 md:mb-6'
					>
						Примеры наших работ
					</Title>
					<p className='text-base text-dark-gray md:text-lg'>
						Реализованные проекты домов, бань и коммерческих объектов из клееного бруса.
					</p>
				</div>

				{/* Фильтры */}
				<div className='mb-8 flex flex-col gap-5 rounded-lg bg-white p-5 md:flex-row md:flex-wrap md:items-end md:gap-x-8 md:gap-y-5 md:p-6'>
					{/* Тип */}
					<div className='flex flex-col gap-2.5'>
						<span className='text-xs font-semibold uppercase tracking-wide text-dark-gray'>
							Тип объекта
						</span>
						<div className='flex flex-wrap gap-2'>
							{TYPE_CHIPS.map(chip => (
								<Button
									key={chip.label}
									type='button'
									variant='secondary'
									size='sm'
									onClick={() => setTag(chip.value)}
									className={cn(tag === chip.value && 'bg-beige font-semibold text-white')}
								>
									{chip.label}
								</Button>
							))}
						</div>
					</div>

					{/* Этажность */}
					<div className='flex flex-col gap-2.5'>
						<span className='text-xs font-semibold uppercase tracking-wide text-dark-gray'>
							Этажность
						</span>
						<div className='flex flex-wrap gap-2'>
							{FLOOR_CHIPS.map(value => (
								<Button
									key={value}
									type='button'
									variant='secondary'
									size='sm'
									onClick={() => toggleFloor(value)}
									className={cn(floors.includes(value) && 'bg-beige font-semibold text-white')}
								>
									{value === 3 ? '3+' : `${value}`}
								</Button>
							))}
						</div>
					</div>

					{/* Площадь */}
					<div className='flex flex-col gap-2.5 md:w-68'>
						<div className='flex items-center justify-between gap-2'>
							<span className='text-xs font-semibold uppercase tracking-wide text-dark-gray'>
								Площадь, м²
							</span>
							<span className='text-sm text-brown'>
								{displayRange[0]}–{displayRange[1]}
							</span>
						</div>
						<Slider
							className='h-11 md:h-9'
							min={stats.minArea}
							max={stats.maxArea}
							step={10}
							value={displayRange}
							onValueChange={value => setAreaDraft(value as [number, number])}
							onValueCommit={value => setArea(value as [number, number])}
							disabled={!isReady}
						/>
					</div>

					{hasActiveFilters && (
						<button
							type='button'
							onClick={resetFilters}
							className='self-start text-sm font-medium text-dark-gray underline-offset-4 transition-colors hover:text-brown hover:underline md:ml-auto md:self-end md:pb-2.5'
						>
							Сбросить
						</button>
					)}
				</div>

				{/* Результаты */}
				{!isLoading && !error && totalItems > 0 && (
					<p className='mb-5 text-dark-gray'>Найдено объектов: {totalItems}</p>
				)}

				{isLoading ? (
					<ul className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
						{Array.from({ length: 6 }).map((_, idx) => (
							<li key={idx}>
								<SkeletonLoader
									count={1}
									className='aspect-4/3 w-full rounded-lg lg:aspect-video'
								/>
							</li>
						))}
					</ul>
				) : error ? (
					<div className='rounded-lg bg-white p-10 text-center text-red-500'>
						Не удалось загрузить проекты. Попробуйте позже.
					</div>
				) : projects.length === 0 ? (
					<div className='rounded-lg bg-white p-10 text-center text-dark-gray'>
						По выбранным параметрам объектов не найдено. Попробуйте изменить фильтры.
					</div>
				) : (
					<ul className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
						{projects.map(project => (
							<ProjectCard
								key={project.id}
								project={project}
							/>
						))}
					</ul>
				)}

				<div className='mt-10 flex justify-center'>
					<Button
						as={Link}
						href={allProjectsHref}
						variant='outline'
						className='w-full px-8 sm:w-auto'
					>
						Смотреть все проекты
					</Button>
				</div>
			</div>
		</section>
	);
}
