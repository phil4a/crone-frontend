import Link from 'next/link';

import { ProjectLikeClient } from '@/components/common/projects/ProjectLikeClient';
import { Badge } from '@/components/ui/Badge';

import { ProjectCardIcon } from './ProjectCardIcons';
import { ProjectImageClient } from './ProjectImage';
import { pluralizeFloors } from '@/lib/formatters/pluralize';
import { Project } from '@/types/project.types';

interface ProjectCardDetailedProps {
	project: Project;
	index?: number;
}

export function ProjectCardDetailed({ project, index }: ProjectCardDetailedProps) {
	const { area, floor, year, city } = project.specs;

	const displayImage =
		project.galleries.result[0] || project.galleries.process[0] || project.coverImage;

	const isPriority = index !== undefined && index < 4;

	return (
		<li className='relative group flex flex-col w-full'>
			<Badge
				variant={project.specs.status === 'Завершен' ? 'done' : 'inProgress'}
				className='mb-2 absolute top-5 left-5 z-1'
			>
				{project.specs.status}
			</Badge>
			<div className='absolute top-5 right-5 z-1'>
				<ProjectLikeClient
					projectId={project.globalId || String(project.id)}
					initialLikes={project.likes}
				/>
			</div>
			<Link
				href={`/project/${project.slug}`}
				className='group flex flex-col w-full'
			>
				<div className='relative w-full aspect-4/3 lg:aspect-video overflow-hidden rounded-lg hover:scale-[1.0125] duration-300 transition-transform will-change-transform'>
					{displayImage ? (
						<ProjectImageClient
							src={project.coverImage?.url || ''}
							alt={project.coverImage?.alt || `Изображение проекта «${project.title}»`}
							priority={isPriority}
						/>
					) : (
						<div className='w-full h-full bg-gray-200 flex items-center justify-center'>
							<span className='text-gray-400'>Нет фото</span>
						</div>
					)}
				</div>
				<div className='flex flex-col pt-4 pb-5 px-2 gap-2'>
					<h5 className='text-xl md:text-lg font-semibold text-main transition-colors duration-300 group-hover:text-brown'>
						{project.title}
					</h5>
					<div className='flex flex-wrap gap-x-8 gap-y-2.5'>
						{area === 0 ? null : <ProjectCardIcon type='area'>{area} м²</ProjectCardIcon>}
						{floor === 0 ? null : (
							<ProjectCardIcon type='floor'>{pluralizeFloors(floor)}</ProjectCardIcon>
						)}
						{year === 0 ? null : <ProjectCardIcon type='year'>{year}</ProjectCardIcon>}
						<ProjectCardIcon type='city'>{city}</ProjectCardIcon>
					</div>
					<p className='text-main'>{project.shortDescription}</p>
				</div>
			</Link>
		</li>
	);
}
