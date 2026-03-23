import { FeedbackForm } from '@/components/common/FeedbackForm';

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

			<ProjectGallery
				title='Планировка'
				projectAlt={project.title}
				items={project.galleries.plans}
			/>
			<ProjectGallery
				title='Результат'
				projectAlt={project.title}
				items={project.galleries.result}
			/>
			<ProjectGallery
				title='Процесс'
				projectAlt={project.title}
				items={project.galleries.process}
			/>
			<VideoGallery
				title='Видео'
				projectAlt={project.title}
				items={project.videos.gallery}
			/>
			<FeedbackForm formId={225} />
			{relatedProjects.length > 0 && <ProjectRelated relatedProjects={relatedProjects} />}
			<ProjectBackButton />
		</main>
	);
}
