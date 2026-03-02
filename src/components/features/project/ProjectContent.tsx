import Image from 'next/image';
import Link from 'next/link';

import { FeedbackForm } from '@/components/common/FeedbackForm';
import { ProjectCardDetailed } from '@/components/common/projects/ProjectCardDetailed';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/pages.config';

import { ProjectHero } from './ProjectHero';
import { ProjectMainImage } from './ProjectMainImage';
import { ProjectParams } from './ProjectParams';
import { Project, ProjectImage } from '@/types/project.types';

interface ProjectContentProps {
	project: Project;
	relatedProjects?: Project[];
}

const GallerySection = ({ title, items }: { title: string; items: ProjectImage[] }) => {
	if (!items.length) return null;

	return (
		<section className='py-12 md:py-16'>
			<div className='container'>
				<Title
					as='h2'
					variant='h3'
					className='mb-8'
				>
					{title}
				</Title>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					{items.map((item, index) => (
						<div
							key={`${item.url}-${index}`}
							className='relative w-full aspect-4/3'
						>
							<Image
								src={item.url}
								alt={item.alt || title}
								fill
								className='object-cover rounded-2xl'
								sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export function ProjectContent({ project, relatedProjects = [] }: ProjectContentProps) {
	const filteredRelated = relatedProjects.filter(item => item.slug !== project.slug).slice(0, 4);

	return (
		<main className=''>
			<ProjectHero {...project} />
			<ProjectMainImage {...project} />
			<ProjectParams {...project} />

			<GallerySection
				title='Результат'
				items={project.galleries.result}
			/>
			<GallerySection
				title='Планировка'
				items={project.galleries.plans}
			/>

			<FeedbackForm />

			{filteredRelated.length > 0 && (
				<section className='py-16 md:py-20 bg-light-gray'>
					<div className='container'>
						<Title
							as='h2'
							variant='h3'
							className='mb-8'
						>
							Похожие проекты
						</Title>
						<ul className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							{filteredRelated.map(item => (
								<ProjectCardDetailed
									key={item.id}
									project={item}
								/>
							))}
						</ul>
					</div>
				</section>
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
