'use client';

import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { Suspense, useMemo } from 'react';

import { ProjectCard } from '@/components/common/projects/ProjectCard';
import { ProjectSidebar } from '@/components/features/projects/ProjectSidebar';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Title } from '@/components/ui/Title';

import { useGetProjectStatsQuery, useGetProjectsQuery, useGetTagsQuery } from '@/graphql/generated';
import { transformGraphQLProject } from '@/lib/transformers';
import { cn } from '@/lib/utils';
import { ProjectFiltersData } from '@/types/filters.types';

const ITEMS_PER_PAGE = 8;

function ProjectsContent() {
	// Global Stats
	const { data: statsData } = useGetProjectStatsQuery();
	const stats = statsData?.projectStats;

	const minArea = stats?.minArea ?? 0;
	const maxArea = stats?.maxArea ?? 1000;
	const minBedrooms = stats?.minBedrooms ?? 0;
	const maxBedrooms = stats?.maxBedrooms ?? 10;

	// URL State
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
	const [tag, setTag] = useQueryState('tag');
	const [areaMin, setAreaMin] = useQueryState('areaMin', parseAsInteger.withDefault(minArea));
	const [areaMax, setAreaMax] = useQueryState('areaMax', parseAsInteger.withDefault(maxArea));
	const [floor, setFloor] = useQueryState('floor', parseAsInteger);
	const [bedroomsMin, setBedroomsMin] = useQueryState(
		'bedroomsMin',
		parseAsInteger.withDefault(minBedrooms)
	);
	const [bedroomsMax, setBedroomsMax] = useQueryState(
		'bedroomsMax',
		parseAsInteger.withDefault(maxBedrooms)
	);
	const [status, setStatus] = useQueryState('status');

	// Tags Data
	const { data: tagsData } = useGetTagsQuery();
	const tags = tagsData?.tags?.nodes || [];

	// Derived filters object
	const filters: ProjectFiltersData = {
		tag: tag || null,
		area: { min: areaMin, max: areaMax },
		floor: floor || null,
		bedrooms: { min: bedroomsMin, max: bedroomsMax },
		status: status || null
	};

	// Data Fetching
	// We fetch ITEMS_PER_PAGE items with server-side filtering and pagination
	const offset = (page - 1) * ITEMS_PER_PAGE;
	const { data, isLoading, error } = useGetProjectsQuery(
		{
			first: ITEMS_PER_PAGE,
			offset,
			tag: tag || undefined,
			minArea: areaMin,
			maxArea: areaMax,
			floor: floor || undefined,
			minBedrooms: bedroomsMin,
			maxBedrooms: bedroomsMax,
			projectStatus: status || undefined
		},
		{
			// Remove placeholderData to show skeletons on filter change
		}
	);

	// Transform Data
	const filteredProjects = useMemo(() => {
		if (!data?.posts?.nodes) return [];
		return data.posts.nodes.map(transformGraphQLProject);
	}, [data]);

	const handleApplyFilters = async (newFilters: ProjectFiltersData) => {
		await setPage(1);
		await setTag(newFilters.tag);
		await setAreaMin(newFilters.area?.min ?? minArea);
		await setAreaMax(newFilters.area?.max ?? maxArea);
		await setFloor(newFilters.floor);
		await setBedroomsMin(newFilters.bedrooms?.min ?? minBedrooms);
		await setBedroomsMax(newFilters.bedrooms?.max ?? maxBedrooms);
		await setStatus(newFilters.status);
	};

	// Use 'found' from server response for total count
	const totalItems = data?.posts?.found || 0;
	// Fallback: if found is 0 but we have nodes, ensure we show at least 1 page so pagination doesn't break
	const totalPages =
		Math.ceil(totalItems / ITEMS_PER_PAGE) || (filteredProjects.length > 0 ? 1 : 0);

	// Client-side slicing is no longer needed since we paginate on server
	const currentProjects = filteredProjects;

	return (
		<main className='pt-38 pb-27 container bg-light-gray min-h-screen'>
			<HeaderThemeObserver theme='light' />

			<Title as='h1'>Дома из клееного бруса</Title>

			<div className='grid grid-cols-1 pt-12 lg:grid-cols-5 gap-8'>
				{/* Sidebar Filters */}
				<div className='lg:col-span-1'>
					<ProjectSidebar
						filters={filters}
						onApply={handleApplyFilters}
						className='sticky top-32'
						stats={
							stats
								? {
										minArea: stats.minArea ?? 0,
										maxArea: stats.maxArea ?? 1000,
										minBedrooms: stats.minBedrooms ?? 0,
										maxBedrooms: stats.maxBedrooms ?? 10,
										minFloor: stats.minFloor ?? 1,
										maxFloor: stats.maxFloor ?? 3
									}
								: undefined
						}
					/>
				</div>

				{/* Projects Grid */}
				<div className='lg:col-span-4'>
					{/* Top Bar with Tags and Sorting */}
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
						{/* Tags */}
						<div className='flex flex-wrap gap-2'>
							<Button
								variant='secondary'
								size='sm'
								onClick={async () => {
									await setPage(1);
									await setTag(null);
								}}
								className={cn(!tag && 'bg-beige text-white font-semibold border-beige')}
							>
								Все
							</Button>
							{tags.map(t => (
								<Button
									size='sm'
									variant='secondary'
									key={t.id}
									onClick={async () => {
										await setPage(1);
										await setTag(t.slug || null);
									}}
									className={cn(tag === t.slug && 'bg-beige text-white font-semibold border-beige')}
								>
									{t.name}
								</Button>
							))}
						</div>

						{/* Sort - Placeholder for now */}
						<div className='text-sm text-dark-gray'>
							Сортировка: <span className='text-brown cursor-pointer'>по названию (А-Я)</span>
						</div>
					</div>

					{isLoading && !data ? (
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							{Array.from({ length: 6 }).map((_, idx) => (
								<div
									key={idx}
									className='flex flex-col gap-4'
								>
									<SkeletonLoader className='w-full aspect-video rounded-2xl' />
									<div className='flex justify-between'>
										<SkeletonLoader className='w-1/2 h-6 rounded' />
										<SkeletonLoader className='w-1/4 h-6 rounded' />
									</div>
								</div>
							))}
						</div>
					) : error && !data?.posts?.nodes ? (
						<div className='p-8 text-center text-red-500'>
							Произошла ошибка при загрузке проектов. Пожалуйста, попробуйте позже.
						</div>
					) : filteredProjects.length === 0 ? (
						<div className='p-12 text-center text-dark-gray bg-white rounded-2xl'>
							Проектов по выбранным критериям не найдено.
						</div>
					) : (
						<>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
								{currentProjects.map(project => (
									<ProjectCard
										key={project.id}
										project={project}
									/>
								))}
							</div>

							<div className='mt-10'>
								<Pagination
									currentPage={page}
									totalPages={totalPages}
									onPageChange={p => {
										setPage(p);
										window.scrollTo({ top: 0, behavior: 'smooth' });
									}}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</main>
	);
}

export default function ProjectsPage() {
	return (
		<Suspense fallback={<div className='pt-38 container'>Загрузка...</div>}>
			<ProjectsContent />
		</Suspense>
	);
}
