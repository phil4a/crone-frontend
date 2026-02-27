import { ProjectLike } from '@/components/common/projects/ProjectLike';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
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
		{ label: 'Тип', value: specs.type || null }
	].filter(item => item.value);
	return (
		<section className='pt-28 md:pt-36 pb-10 bg-light-gray'>
			<div className='container'>
				<Breadcrumbs items={[{ label: 'Проекты', href: PAGE.OBJECTS }, { label: title }]} />
				<div className='flex flex-col gap-8'>
					<div className='flex gap-5'>
						<Title
							as='h1'
							variant='h2'
							className='uppercase leading-none'
						>
							{title}
						</Title>
						<ProjectLike
							projectId={globalId || String(id)}
							initialLikes={likes}
							className='bg-light-beige hover:bg-beige'
							textClassName='text-lg'
						/>
					</div>
					<div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
						<div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
							{heroItems.map(item => (
								<div
									key={item.label}
									className='bg-white rounded-2xl p-4'
								>
									<div className='text-xl md:text-2xl font-semibold text-main'>{item.value}</div>
									<div className='text-dark-gray text-sm'>{item.label}</div>
								</div>
							))}
						</div>
						<Button className='w-full md:w-auto'>Написать нам</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
