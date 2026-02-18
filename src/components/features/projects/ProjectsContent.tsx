'use client';

import { ProjectCard } from '@/components/common/projects/ProjectCard';
import { ProjectSidebar } from '@/components/features/projects/ProjectSidebar';
import { ProjectSortPopover } from '@/components/features/projects/ProjectSortPopover';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Title } from '@/components/ui/Title';

import { ITEMS_PER_PAGE } from '@/config/site.config';

import { useProjectFilters } from '@/hooks/projects/useProjectFilters';
import { useProjectStats } from '@/hooks/projects/useProjectStats';
import { useProjectTags } from '@/hooks/projects/useProjectTags';
import { useProjects } from '@/hooks/projects/useProjects';

import { cn } from '@/lib/utils';

export function ProjectsContent() {
	// Custom Hooks
	const { stats } = useProjectStats();
	const { page, setPage, tag, filters, sort, setSort, applyFilters, resetTag, setTagFilter } =
		useProjectFilters(stats);
	const { tags, getPageTitle } = useProjectTags();
	const { projects, totalItems, totalPages, isLoading, error } = useProjects(
		page,
		ITEMS_PER_PAGE,
		filters,
		sort
	);

	return (
		<main className='pt-38 pb-27 container bg-light-gray min-h-screen'>
			<HeaderThemeObserver theme='light' />

			<Title as='h1'>{getPageTitle(tag)}</Title>

			<div className='grid grid-cols-1 pt-12 lg:grid-cols-5 gap-8'>
				{/* Sidebar Filters */}
				<div className='lg:col-span-1'>
					<ProjectSidebar
						filters={filters}
						onApply={applyFilters}
						className='sticky top-32'
						stats={stats}
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
								onClick={resetTag}
								className={cn(!tag && 'bg-beige text-white font-semibold border-beige')}
							>
								Все
							</Button>
							{tags.map(t => (
								<Button
									size='sm'
									variant='secondary'
									key={t.id}
									onClick={() => setTagFilter(t.slug || null)}
									className={cn(tag === t.slug && 'bg-beige text-white font-semibold border-beige')}
								>
									{t.name}
								</Button>
							))}
						</div>

						<ProjectSortPopover
							sort={sort}
							onChange={setSort}
						/>
					</div>

					{isLoading ? (
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
					) : projects.length === 0 ? (
						<div className='p-12 text-center text-dark-gray bg-white rounded-2xl'>
							Проектов по выбранным критериям не найдено.
						</div>
					) : (
						<>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
								{projects.map(project => (
									<ProjectCard
										key={project.id}
										project={project}
									/>
								))}
							</div>

							<div className='mt-10'>
								<Pagination
									currentPage={page || 1}
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
