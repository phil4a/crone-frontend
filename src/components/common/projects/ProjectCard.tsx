import Image from 'next/image';
import Link from 'next/link';

import { ProjectLikeClient } from '@/components/common/projects/ProjectLikeClient';
import { Badge } from '@/components/ui/Badge';

import { Project } from '@/types/project.types';

interface ProjectCardProps {
	project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
	const floors = project.specs.floor;
	const area = project.specs.area;

	const floorText = floors === 1 ? 'этаж' : floors >= 2 && floors <= 4 ? 'этажа' : 'этажей';
	const specs = `${floors} ${floorText}, ${area} м²`;

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
					{project.coverImage ? (
						<Image
							src={project.coverImage.url}
							alt={`Изображение проекта «${project.title}»`}
							fill
							className='object-cover'
							sizes='(max-width: 640px) 100vw, (max-width: 992px) 50vw, 33vw'
						/>
					) : (
						<div className='w-full h-full bg-gray-200 flex items-center justify-center'>
							<span className='text-gray-400'>Нет фото</span>
						</div>
					)}
					<div></div>
				</div>
				<div className='flex justify-between items-center pt-4 pb-5 px-2 gap-2'>
					<h5 className='text-xl md:text-lg font-semibold text-main transition-colors duration-300 group-hover:text-brown'>
						{project.title}
					</h5>
					<div className='text-base text-dark-gray shrink-0 whitespace-nowrap'>{specs}</div>
				</div>
			</Link>
		</li>
	);
}
