import Link from 'next/link';
import { PROJECTS_DATA } from '@/config/projects.data';
import { ProjectCard } from './projects/ProjectCard';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/Button';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { PAGE } from '@/config/pages.config';

export function Projects() {
	return (
		<section className="pb-20 md:pb-25 lg:pb-37.5 bg-white relative">
			<HeaderThemeObserver theme="light" />
			<div className="container">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4 mb-10">
					<Title as="h2" variant="h2">
						Наши проекты
					</Title>
					<Button asChild variant="outline" className="w-full md:w-auto h-11 md:h-12.5 px-8">
						<Link href={PAGE.OBJECTS}>Смотреть проекты</Link>
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{PROJECTS_DATA.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}
