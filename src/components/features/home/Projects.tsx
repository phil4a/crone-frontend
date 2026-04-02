'use client';

import Link from 'next/link';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Button } from '@/components/ui/Button';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/pages.config';

import { useProjects } from '@/hooks/projects/useProjects';

import { ProjectCard } from '../../common/projects/ProjectCard';

export function Projects() {
	const { projects, isLoading, error } = useProjects(1, 6);
	return (
		<section className='pb-20 md:pb-25 lg:pb-37.5 bg-white relative'>
			<HeaderThemeObserver theme='transparent' />
			<div className='container'>
				<div className='flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4 mb-10'>
					<Title
						as='h2'
						variant='h2'
					>
						Наши проекты
					</Title>
					<Button
						as={Link}
						href={PAGE.OBJECTS}
						variant='outline'
						className='hidden md:inline-flex w-full md:w-auto h-11 md:h-12.5 px-8'
					>
						Смотреть проекты
					</Button>
				</div>

				<ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
					{isLoading &&
						Array.from({ length: 6 }).map((_, idx) => (
							<li
								key={idx}
								className='relative group flex flex-col w-full'
							>
								<div className='absolute w-23.5 h-7.5 rounded-lg top-5 left-5 z-1 bg-white' />
								<div className='absolute top-5 right-5 z-1 w-15.25 h-7.5 rounded-lg bg-white' />
								<SkeletonLoader
									count={1}
									className='relative w-full h-full aspect-4/3 lg:aspect-video rounded-2xl'
								/>
								<div className='flex justify-between items-center pt-4 pb-5 px-2 gap-2'>
									<SkeletonLoader
										count={1}
										className='w-40.5 h-7 rounded-lg'
									/>
									<SkeletonLoader
										count={1}
										className='w-28.25 h-6 rounded-lg'
									/>
								</div>
							</li>
						))}
					{!!error && <p>Произошла ошибка загрузки проектов</p>}
					{projects?.map(project => (
						<ProjectCard
							key={project.id}
							project={project}
						/>
					))}
				</ul>
				<Button
					as={Link}
					href={PAGE.OBJECTS}
					variant='outline'
					className='w-full md:hidden md:w-auto h-11 md:h-12.5 px-8'
				>
					Смотреть проекты
				</Button>
			</div>
		</section>
	);
}
