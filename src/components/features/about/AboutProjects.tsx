'use client';

import Link from 'next/link';

import { ProjectCardDetailed } from '@/components/common/projects/ProjectCardDetailed';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { useProjects } from '@/hooks/projects/useProjects';

import { AboutProjectCard } from './AboutProjectCard';

// const PROJECTS = [
//   {
//     id: 1,
//     title: 'SPA Италия',
//     link: '/projects/spa-italy',
//     images: [
//       '/images/projects/1.jpg',
//       '/images/projects/2.jpg',
//       '/images/projects/3.jpg',
//       '/images/projects/4.jpg',
//       '/images/projects/5.jpg',
//     ],
//     specs: {
//       area: '360 м²',
//       floors: '2 этажа',
//       bedrooms: '4 спальни', // Added mock data to match interface
//     },
//   },
// ];

export function AboutProjects() {
	const { projects, totalItems, totalPages, isLoading, error } = useProjects(1, 3);

	return (
		<section className='py-20 md:py-30 lg:py-40 bg-white'>
			<div className='container'>
				<Title
					as='h2'
					variant='h3'
					className='mb-10'
				>
					Наши проекты
				</Title>
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6'>
					<p className='text-base md:text-lg text-dark-gray max-w-2xl'>
						Мы чтим традиции, и в знак удачи и благополучия каждого дома мы закладываем серебряную
						монету в основание — символ долговечности и счастья в новом жилье.
					</p>
					<Button variant='outline'>
						<Link href='/projects'>Посмотреть проекты</Link>
					</Button>
				</div>

				<div className='grid grid-cols-1 gap-12'>
					{projects.map(project => (
						<ProjectCardDetailed
							key={project.id}
							project={project}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
