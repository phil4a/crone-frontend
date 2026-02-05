import Image from 'next/image';
import Link from 'next/link';
import { ProjectItem } from '@/config/projects.data';

interface ProjectCardProps {
	project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
	return (
		<Link href={project.href} className="group flex flex-col w-full">
			<div className="relative w-full aspect-4/3 lg:aspect-video overflow-hidden rounded-lg">
				<Image
					src={project.image}
					alt={project.title}
					fill
					className="object-cover transition-transform duration-300 group-hover:scale-[1.0125]"
					sizes="(max-width: 640px) 100vw, (max-width: 992px) 50vw, 33vw"
				/>
			</div>
			<div className="flex justify-between items-center pt-4 pb-5 px-2 gap-2">
				<h5 className="text-xl md:text-lg font-semibold text-main transition-colors duration-300 group-hover:text-brown">
					{project.title}
				</h5>
				<div className="text-base text-dark-gray shrink-0 whitespace-nowrap">{project.specs}</div>
			</div>
		</Link>
	);
}
