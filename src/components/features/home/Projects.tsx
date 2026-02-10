import Link from 'next/link';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/pages.config';

import { ProjectCard } from '../../common/projects/ProjectCard';

import { Project } from '@/types/project.types';

interface ProjectsProps {
	projects: Project[] | null;
}

export function Projects({ projects }: ProjectsProps) {
	return (
		<section className='pb-20 md:pb-25 lg:pb-37.5 bg-white relative'>
			<HeaderThemeObserver theme='light' />
			<div className='container'>
				<div className='flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4 mb-10'>
					<Title
						as='h2'
						variant='h2'
					>
						Наши проекты
					</Title>
					<Button
						asChild
						variant='outline'
						className='hidden md:inline-flex w-full md:w-auto h-11 md:h-12.5 px-8'
					>
						<Link href={PAGE.OBJECTS}>Смотреть проекты</Link>
					</Button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
					{projects?.map(project => (
						<ProjectCard
							key={project.id}
							project={project}
						/>
					))}
				</div>
				<Button
					asChild
					variant='outline'
					className='w-full md:hidden md:w-auto h-11 md:h-12.5 px-8'
				>
					<Link href={PAGE.OBJECTS}>Смотреть проекты</Link>
				</Button>
			</div>
		</section>
	);
}
