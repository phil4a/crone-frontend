import Image from 'next/image';
import Link from 'next/link';
import { ProjectItem } from '@/config/projects.data';
import { Badge } from '@/components/ui/Badge';
import { ProjectLike } from './ProjectLike';

interface ProjectCardProps {
	project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
	return (
		<li className="relative group flex flex-col w-full">
			<Badge variant="done" className="mb-2 absolute top-5 left-5 z-1">
				Завершен
			</Badge>
			<div className="absolute top-5 right-5 z-1">
				<ProjectLike />
			</div>
			<Link href={project.href} className="group flex flex-col w-full">
				<div className="relative w-full aspect-4/3 lg:aspect-video overflow-hidden rounded-lg hover:scale-[1.0125] duration-300 transition-transform will-change-transform">
					<Image
						src={project.image}
						alt={`Изображение проекта «${project.title}»`}
						fill
						className="object-cover"
						sizes="(max-width: 640px) 100vw, (max-width: 992px) 50vw, 33vw"
					/>
					<div></div>
				</div>
				<div className="flex justify-between items-center pt-4 pb-5 px-2 gap-2">
					<h5 className="text-xl md:text-lg font-semibold text-main transition-colors duration-300 group-hover:text-brown">
						{project.title}
					</h5>
					<div className="text-base text-dark-gray shrink-0 whitespace-nowrap">{project.specs}</div>
				</div>
			</Link>
		</li>
	);
}
