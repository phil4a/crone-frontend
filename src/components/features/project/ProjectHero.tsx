import { FeedbackModalTrigger } from '@/components/common/FeedbackModal';
import { ProjectLikeClient } from '@/components/common/projects/ProjectLikeClient';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/pages.config';

import { floorsLabel } from '@/lib/formatters/pluralize';
import { formatValue } from '@/lib/formatters/values';
import { Project } from '@/types/project.types';

export function ProjectHero({ title, specs, globalId, id, likes }: Project) {
	const heroItems = [
		{ label: 'Площадь', value: formatValue(specs.area, 'м²') },
		{ label: 'Комнат', value: formatValue(specs.rooms) },
		{ label: floorsLabel(specs.floor), value: specs.floor > 0 ? specs.floor : null },
		{ label: 'Тип', value: specs.type || null },
		{ label: 'Город', value: specs.city || null }
	].filter(item => item.value);
	return (
		<section className='pt-28 md:pt-36 pb-10'>
			<HeaderThemeObserver theme='light' />
			<div className='container'>
				<Breadcrumbs
					className='mb-12'
					items={[{ label: 'Проекты', href: PAGE.OBJECTS }, { label: title }]}
				/>
				<div className='flex flex-col'>
					<div className='flex gap-5 items-baseline sm:items-center'>
						<Title
							as='h1'
							variant='h2'
							className='uppercase'
						>
							{title}
						</Title>
						<ProjectLikeClient
							projectId={globalId || String(id)}
							initialLikes={likes}
							className='h-fit bg-light-beige hover:bg-beige'
							textClassName='text-sm md:text-lg'
						/>
					</div>
					<div className='flex flex-col gap-6 mt-10 xl:my-10 xl:flex-row xl:items-center xl:justify-between border-t border-t-brown/35 xl:border-y xl:border-y-brown/35'>
						<div className='grow pt-5.5 xl:py-5.5 grid grid-cols-2 xl:grid-cols-5 gap-4'>
							{heroItems.map(item => (
								<div
									key={item.label}
									className='bg-white rounded-2xl'
								>
									<div className='text-xl md:text-2xl font-bold text-nowrap text-brown'>
										{item.value}
									</div>
									<div className='text-main'>{item.label}</div>
								</div>
							))}
						</div>
						<div className='w-full md:w-auto pt-10 border-t border-t-brown/35 xl:border-t-0 xl:pt-0'>
							<FeedbackModalTrigger className='w-full'>Написать нам</FeedbackModalTrigger>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
