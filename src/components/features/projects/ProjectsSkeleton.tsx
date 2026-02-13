import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Title } from '@/components/ui/Title';

interface ProjectsSkeletonProps {
	title?: string;
}

export function ProjectsSkeleton({ title = 'Дома из клееного бруса' }: ProjectsSkeletonProps) {
	return (
		<main className='pt-38 pb-27 container bg-light-gray min-h-screen'>
			<HeaderThemeObserver theme='light' />

			<Title as='h1'>{title}</Title>

			<div className='grid grid-cols-1 pt-12 lg:grid-cols-5 gap-8'>
				{/* Sidebar Filters Skeleton */}
				<div className='lg:col-span-1'>
					<div className='sticky top-32 flex flex-col gap-6'>
						{/* Search/Filter inputs skeleton */}
						<div className='bg-white rounded-2xl flex flex-col gap-6'>
							<div className='flex flex-col gap-2'>
								<SkeletonLoader className='w-24 h-5 rounded' />
								<SkeletonLoader className='w-full h-10 rounded-lg' />
							</div>
							<div className='flex flex-col gap-2'>
								<SkeletonLoader className='w-32 h-5 rounded' />
								<div className='flex gap-2'>
									<SkeletonLoader className='w-1/2 h-10 rounded-lg' />
									<SkeletonLoader className='w-1/2 h-10 rounded-lg' />
								</div>
							</div>
							<SkeletonLoader className='w-full h-12 rounded-lg mt-2' />
						</div>
					</div>
				</div>

				{/* Projects Grid Skeleton */}
				<div className='lg:col-span-4'>
					{/* Top Bar with Tags and Sorting Skeleton */}
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
						{/* Tags */}
						<div className='flex flex-wrap gap-2'>
							{Array.from({ length: 4 }).map((_, idx) => (
								<SkeletonLoader
									key={idx}
									className='w-24 h-9 rounded-lg'
								/>
							))}
						</div>
						{/* Sort */}
						<SkeletonLoader className='w-48 h-5 rounded' />
					</div>

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
				</div>
			</div>
		</main>
	);
}
