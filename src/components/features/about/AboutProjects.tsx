'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { ProjectCardDetailed } from '@/components/common/projects/ProjectCardDetailed';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/pages.config';

import { useProjects } from '@/hooks/projects/useProjects';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import { ProjectSkeletonLoader } from '../projects/ProjectSkeletonLoader';

export function AboutProjects() {
	const { projects, isLoading, error } = useProjects(1, 3);
	const isTablet = useMediaQuery('(min-width: 1023px) and (max-width: 1279px)');

	const visibleCount = isTablet ? 2 : 3;
	const visibleProjects = useMemo(
		() => (isTablet ? projects.slice(0, 2) : projects),
		[isTablet, projects]
	);

	return (
		<section className='py-20 md:py-30 lg:py-40 bg-white'>
			<div className='container'>
				<Title
					as='h2'
					variant='h3'
					className='mb-6'
				>
					Наши проекты
				</Title>
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6'>
					<p className='text-base'>
						Мы чтим традиции: в основание каждого дома закладываем серебряную монету как символ
						удачи, благополучия и долговечности нового жилья.
					</p>
					<Button variant='outline'>
						<Link href={PAGE.OBJECTS}>Посмотреть проекты</Link>
					</Button>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
					{isLoading ? (
						Array.from({ length: visibleCount }).map((_, idx) => (
							<ProjectSkeletonLoader key={idx} />
						))
					) : error ? (
						<div className='p-8 text-center text-red-500'>
							Произошла ошибка при загрузке проектов. Пожалуйста, попробуйте позже.
						</div>
					) : visibleProjects.length === 0 ? (
						<div className='p-12 text-center text-dark-gray bg-white rounded-2xl'>
							Проектов по выбранным критериям не найдено.
						</div>
					) : (
						visibleProjects.map(project => (
							<ProjectCardDetailed
								key={project.id}
								project={project}
							/>
						))
					)}
				</div>
			</div>
		</section>
	);
}
