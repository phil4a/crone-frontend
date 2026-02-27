import Image from 'next/image';
import Link from 'next/link';

import { FeedbackForm } from '@/components/common/FeedbackForm';
import { ProjectCardDetailed } from '@/components/common/projects/ProjectCardDetailed';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/pages.config';

import { Project, ProjectImage } from '@/types/project.types';

interface ProjectContentProps {
	project: Project;
	relatedProjects?: Project[];
}

const formatValue = (value: number | null | undefined, suffix?: string) => {
	if (!value || value <= 0) return null;
	return suffix ? `${value} ${suffix}` : String(value);
};

const GallerySection = ({ title, items }: { title: string; items: ProjectImage[] }) => {
	if (!items.length) return null;

	return (
		<section className='py-12 md:py-16 bg-white'>
			<div className='container'>
				<Title as='h2' variant='h3' className='mb-8'>
					{title}
				</Title>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					{items.map((item, index) => (
						<div key={`${item.url}-${index}`} className='relative w-full aspect-[4/3]'>
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
	const heroItems = [
		{ label: 'Площадь', value: formatValue(project.specs.area, 'м²') },
		{ label: 'Комнат', value: formatValue(project.specs.rooms) },
		{ label: 'Этажей', value: formatValue(project.specs.floor) },
		{ label: 'Тип', value: project.specs.type || null }
	].filter(item => item.value);

	const params = [
		{ label: 'Площадь', value: formatValue(project.specs.area, 'м²') },
		{ label: 'Этажей', value: formatValue(project.specs.floor) },
		{ label: 'Жилых комнат', value: formatValue(project.specs.rooms) },
		{ label: 'Спален', value: formatValue(project.specs.bedrooms) },
		{ label: 'Ванных комнат', value: project.specs.bathrooms ? String(project.specs.bathrooms) : null },
		{ label: 'Терраса', value: project.features.terrace ? 'есть' : 'нет' },
		{ label: 'Гараж', value: project.features.garage ? 'есть' : 'нет' },
		{ label: 'Баня', value: project.features.sauna ? 'есть' : 'нет' }
	];

	const filteredRelated = relatedProjects.filter(item => item.slug !== project.slug).slice(0, 4);

	return (
		<main className='bg-light-gray'>
			<HeaderThemeObserver theme='light' />
			<section className='pt-28 md:pt-36 pb-10 bg-light-gray'>
				<div className='container'>
					<Breadcrumbs
						items={[
							{ label: 'Проекты', href: PAGE.OBJECTS },
							{ label: project.title }
						]}
					/>
					<div className='flex flex-col gap-8'>
						<Title as='h1' variant='h2'>
							{project.title}
						</Title>
						<div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
							<div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
								{heroItems.map(item => (
									<div key={item.label} className='bg-white rounded-2xl p-4'>
										<div className='text-xl md:text-2xl font-semibold text-main'>{item.value}</div>
										<div className='text-dark-gray text-sm'>{item.label}</div>
									</div>
								))}
							</div>
							<Button className='w-full md:w-auto'>Получить презентацию</Button>
						</div>
					</div>
				</div>
			</section>

			<section className='relative w-full aspect-[16/7] bg-light-gray'>
				{project.coverImage ? (
					<Image
						src={project.coverImage.url}
						alt={project.coverImage.alt || project.title}
						fill
						className='object-cover'
						sizes='100vw'
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center text-dark-gray'>
						Нет фото
					</div>
				)}
			</section>

			<section className='py-16 md:py-20 bg-white'>
				<div className='container'>
					<div className='grid grid-cols-1 xl:grid-cols-5 gap-8'>
						<div className='xl:col-span-3'>
							<Title as='h2' variant='h3' className='mb-6'>
								Особенности проекта
							</Title>
							<div
								className='text-main leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_li]:list-disc [&_li]:ml-5 [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:font-semibold'
								dangerouslySetInnerHTML={{ __html: project.description }}
							/>
						</div>
						<div className='xl:col-span-2'>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								{params.map(item => (
									<div key={item.label} className='bg-light-gray rounded-2xl p-4'>
										<div className='text-sm text-dark-gray'>{item.label}</div>
										<div className='text-lg font-semibold text-main'>{item.value}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<GallerySection title='Результат' items={project.galleries.result} />
			<GallerySection title='Планировка' items={project.galleries.plans} />

			<FeedbackForm />

			{filteredRelated.length > 0 && (
				<section className='py-16 md:py-20 bg-light-gray'>
					<div className='container'>
						<Title as='h2' variant='h3' className='mb-8'>
							Похожие проекты
						</Title>
						<ul className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							{filteredRelated.map(item => (
								<ProjectCardDetailed key={item.id} project={item} />
							))}
						</ul>
					</div>
				</section>
			)}

			<section className='py-10 md:py-12 bg-white'>
				<div className='container'>
					<Button as={Link} href={PAGE.OBJECTS} variant='outline' className='gap-2'>
						<span className='flex items-center'>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M19 12L5 12' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
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
