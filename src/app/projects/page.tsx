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

import { useGetProjectsQuery, useGetTagsQuery } from '@/graphql/generated';
import { transformGraphQLProject } from '@/lib/transformers';
import { cn } from '@/lib/utils';
import { ProjectFiltersData } from '@/types/filters.types';

const ITEMS_PER_PAGE = 8;

function ProjectsContent() {
	// URL State
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
	const [tag, setTag] = useQueryState('tag');
	const [areaMin, setAreaMin] = useQueryState('areaMin', parseAsInteger.withDefault(0));
	const [areaMax, setAreaMax] = useQueryState('areaMax', parseAsInteger.withDefault(1000));
	const [floor, setFloor] = useQueryState('floor', parseAsInteger);
	const [bedroomsMin, setBedroomsMin] = useQueryState('bedroomsMin', parseAsInteger.withDefault(1));
	const [bedroomsMax, setBedroomsMax] = useQueryState(
		'bedroomsMax',
		parseAsInteger.withDefault(10)
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
	// We fetch 100 items to allow client-side filtering of ACF fields while using server-side filtering for tags
	const { data, isLoading, error } = useGetProjectsQuery(
		{
			first: 100,
			tag: tag || undefined
		},
		{
			// Keep previous data while fetching new data to avoid flickering
			placeholderData: previousData => previousData
		}
	);

	// Transform and Filter Data
	const filteredProjects = useMemo(() => {
		if (!data?.posts?.nodes) return [];

		const projects = data.posts.nodes.map(transformGraphQLProject);

		return projects.filter(project => {
			// Area Filter
			const projectArea = project.specs.area;
			if (projectArea < areaMin || projectArea > areaMax) return false;

			// Floor Filter
			if (floor !== null && project.specs.floor !== floor) return false;

			// Bedrooms Filter
			const projectBedrooms = project.specs.bedrooms;
			if (projectBedrooms < bedroomsMin || projectBedrooms > bedroomsMax) return false;

			// Status Filter
			if (status !== null && project.specs.status !== status) return false;

			return true;
		});
	}, [data, areaMin, areaMax, floor, bedroomsMin, bedroomsMax, status]);

	const handleApplyFilters = (newFilters: ProjectFiltersData) => {
		setPage(1);
		setTag(newFilters.tag);
		setAreaMin(newFilters.area?.min ?? 0);
		setAreaMax(newFilters.area?.max ?? 1000);
		setFloor(newFilters.floor);
		setBedroomsMin(newFilters.bedrooms?.min ?? 1);
		setBedroomsMax(newFilters.bedrooms?.max ?? 10);
		setStatus(newFilters.status);
	};

	const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
	const currentProjects = filteredProjects.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE
	);

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
								onClick={() => setTag(null)}
								className={cn(!tag && 'bg-beige text-white font-semibold border-beige')}
							>
								Все
							</Button>
							{tags.map(t => (
								<Button
									size='sm'
									variant='secondary'
									key={t.id}
									onClick={() => setTag(t.slug || null)}
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
					) : error ? (
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
