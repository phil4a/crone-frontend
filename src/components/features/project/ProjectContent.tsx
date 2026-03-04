import Link from 'next/link';

import { FeedbackForm } from '@/components/common/FeedbackForm';
import { ProjectCardDetailed } from '@/components/common/projects/ProjectCardDetailed';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/pages.config';

import { ProjectGallery } from './ProjectGallery';
import { ProjectHero } from './ProjectHero';
import { ProjectMainImage } from './ProjectMainImage';
import { ProjectParams } from './ProjectParams';
import { ProjectRelated } from './ProjectRelated';
import { VideoGallery } from './VideoGallery';

import type { Project } from '@/types/project.types';
import { ProjectBackButton } from './ProjectBackButton';

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
				title='Процесс'
				projectAlt={project.title}
				items={project.galleries.process}
			/>

			<ProjectGallery
				title='Результат'
				projectAlt={project.title}
				items={project.galleries.result}
			/>

			<VideoGallery
				title='Видео'
				projectAlt={project.title}
				items={project.videos.gallery}
			/>

			<FeedbackForm />

			{relatedProjects.length > 0 && (
				<ProjectRelated relatedProjects={relatedProjects} />
			)}

			<ProjectBackButton />
		</main>
	);
}
