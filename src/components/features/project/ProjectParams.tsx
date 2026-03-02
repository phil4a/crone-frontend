import {
	AreaIcon,
	BathroomIcon,
	BedroomIcon,
	FloorIcon,
	GarageIcon,
	RoomIcon,
	SaunaIcon,
	TerraceIcon
} from '@/components/ui/ProjectIcons';
import { Title } from '@/components/ui/Title';

import { formatValue } from '@/lib/formatters/values';
import { Project } from '@/types/project.types';

export function ProjectParams({ description, specs, features }: Project) {
	const paramsMap = [
		{ label: 'Площадь', value: formatValue(specs.area, 'м²'), icon: AreaIcon },
		{ label: 'Этажей', value: formatValue(specs.floor), icon: FloorIcon },
		{ label: 'Жилых комнат', value: formatValue(specs.rooms), icon: RoomIcon },
		{ label: 'Спален', value: formatValue(specs.bedrooms), icon: BedroomIcon },
		{
			label: 'Ванных комнат',
			value: specs.bathrooms ? String(specs.bathrooms) : null,
			icon: BathroomIcon
		},
		{ label: 'Терраса', value: features.terrace ? 'есть' : 'нет', icon: TerraceIcon },
		{ label: 'Гараж', value: features.garage ? 'есть' : 'нет', icon: GarageIcon },
		{ label: 'Баня / Хаммам / Сауна', value: features.sauna ? 'есть' : 'нет', icon: SaunaIcon }
	];

	return (
		<section className='py-16 md:py-20 bg-white'>
			<div className='container'>
				<div className='grid grid-cols-1 xl:grid-cols-5 gap-8 items-center'>
					<div className='xl:col-span-3'>
						<Title
							as='h2'
							variant='h3'
							className='mb-6'
						>
							Особенности проекта
						</Title>
						<div
							className='text-main leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_li]:list-disc [&_li]:ml-5 [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:font-semibold'
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					</div>
					<div className='xl:col-span-2'>
						<div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-4'>
							{paramsMap.map(item =>
								item.value ? (
									<div
										key={item.label}
										className='flex gap-4 items-center px-2 py-4 border-light-beige border-t sm:nth-last-[2]:border-b last:border-b'
									>
										<div className='flex items-center justify-center w-12 h-12 rounded-sm bg-beige'>
											{item.icon && <item.icon className='h-5 w-5 text-white' />}
										</div>
										<div className=''>
											<div className='text-dark-gray'>{item.label}</div>
											<div className='text-lg font-semibold text-main'>{item.value}</div>
										</div>
									</div>
								) : null
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
