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

			<section className='py-10 md:py-12 bg-white'>
				<div className='container'>
					<Button
						as={Link}
						href={PAGE.OBJECTS}
						variant='outline'
						className='gap-2'
					>
						<span className='flex items-center'>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M19 12L5 12'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M11 18L5 12L11 6'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</span>
						К проектам
					</Button>
				</div>
			</section>
		</main>
	);
}
