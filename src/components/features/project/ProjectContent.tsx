import { FeedbackForm } from '@/components/common/FeedbackForm';
import { ViewportLazy } from '@/components/layout/ViewportLazy';

import { LazyProjectGallery } from './LazyProjectGallery';
import { ProjectBackButton } from './ProjectBackButton';
import { ProjectGallery } from './ProjectGallery';
import { ProjectHero } from './ProjectHero';
import { ProjectMainImage } from './ProjectMainImage';
import { ProjectParams } from './ProjectParams';
import { ProjectRelated } from './ProjectRelated';
import { VideoGallery } from './VideoGallery';
import type { Project } from '@/types/project.types';

interface ProjectContentProps {
	project: Project;
	relatedProjects?: Project[];
}

export function ProjectContent({ project, relatedProjects = [] }: ProjectContentProps) {
	return (
		<main className=''>
			<ProjectHero {...project} />
			<ProjectMainImage {...project} />
			<ProjectParams {...project} />
			<ViewportLazy rootMargin='500px'>
				<LazyProjectGallery
					title='Планировка'
					projectAlt={project.title}
					items={project.galleries.plans}
				/>
			</ViewportLazy>
			<ViewportLazy rootMargin='500px'>
				<LazyProjectGallery
					title='Результат'
					projectAlt={project.title}
					items={project.galleries.result}
				/>
			</ViewportLazy>
			<ViewportLazy rootMargin='500px'>
				<LazyProjectGallery
					title='Процесс'
					projectAlt={project.title}
					items={project.galleries.process}
				/>
			</ViewportLazy>
			<ViewportLazy rootMargin='500px'>
				<VideoGallery
					title='Видео'
					projectAlt={project.title}
					items={project.videos.gallery}
				/>
			</ViewportLazy>
			<FeedbackForm formId={225} />
			{relatedProjects.length > 0 && <ProjectRelated relatedProjects={relatedProjects} />}
			<ProjectBackButton />
		</main>
	);
}
