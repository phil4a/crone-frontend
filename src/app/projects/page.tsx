'use client';

import { ProjectCard } from '@/components/common/projects/ProjectCard';
import { ProjectFilters } from '@/components/features/projects/ProjectFilters';
import { ProjectSort } from '@/components/features/projects/ProjectSort';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Pagination } from '@/components/ui/Pagination';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';

import { useProjectsFiltering } from '@/hooks/useProjectsFiltering';

export default function ProjectsPage() {
	const { projects, isLoading, filters, setFilters, tags, pagination } = useProjectsFiltering();

	return (
		<main className='pt-32 pb-20'>
			<HeaderThemeObserver theme='light' />
			<div className='container mx-auto px-4'>
				<h1 className='text-4xl md:text-5xl font-bold mb-10'>Проекты</h1>

				<div className='flex flex-col lg:flex-row gap-10'>
					{/* Sidebar Filters */}
					<aside className='w-full lg:w-[300px] shrink-0 space-y-8'>
						<div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
							<ProjectFilters
								filters={filters}
								setFilters={setFilters}
								tags={tags}
							/>
						</div>
					</aside>

					{/* Main Content */}
					<div className='flex-1 space-y-6'>
						{/* Toolbar */}
						<div className='flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm'>
							<div className='text-gray-500 font-medium'>
								Найдено проектов: <span className='text-black'>{pagination.totalCount}</span>
							</div>
							<ProjectSort
								sort={filters.sort}
								setSort={sort => setFilters({ sort })}
							/>
						</div>

						{/* Grid */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{isLoading ? (
								Array.from({ length: 6 }).map((_, idx) => (
									<SkeletonLoader
										key={idx}
										count={1}
										className='h-[420px] w-full rounded-2xl'
									/>
								))
							) : projects && projects.length > 0 ? (
								projects.map(project => (
									<ProjectCard
										key={project.id}
										project={project}
									/>
								))
							) : (
								<div className='col-span-full flex flex-col items-center justify-center py-20 text-center'>
									<p className='text-xl text-gray-500 mb-2'>Проекты не найдены</p>
									<p className='text-gray-400'>Попробуйте изменить параметры фильтрации</p>
								</div>
							)}
						</div>

						{/* Pagination */}
						{!isLoading && projects && projects.length > 0 && (
							<Pagination
								currentPage={pagination.currentPage}
								totalPages={pagination.totalPages}
								onPageChange={pagination.setPage}
								className='mt-10'
							/>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
