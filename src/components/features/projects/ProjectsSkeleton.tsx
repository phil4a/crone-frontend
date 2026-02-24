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
				<div className='xl:col-span-1'>
					<div className='sticky top-32 flex flex-col gap-6'>
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

				<div className='xl:col-span-4'>
					<div>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							{Array.from({ length: 6 }).map((_, idx) => (
								<div
									key={idx}
									className='relative flex flex-col'
								>
									<div className='absolute w-23.5 h-7.5 rounded-lg top-5 left-5 z-1 bg-white' />
									<div className='absolute top-5 right-5 z-1 w-15.25 h-7.5 rounded-lg bg-white' />
									<SkeletonLoader
										count={1}
										className='relative w-full h-full aspect-4/3 lg:aspect-video rounded-2xl'
									/>
									<div className='flex flex-col pt-4 pb-5 px-2 gap-2'>
										<SkeletonLoader
											count={1}
											className='w-30 h-6 mb-1 rounded-lg'
										/>
										<div className='flex flex-wrap gap-x-8 gap-y-2.5'>
											<SkeletonLoader
												count={4}
												className='w-22 h-6 rounded-lg'
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
