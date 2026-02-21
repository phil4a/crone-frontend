import { Title } from '@/components/ui/Title';

import { GeographyMap } from './geography/GeographyMap';

export function Geography() {
	return (
		<section className='pb-15 xl:pb-25 bg-white'>
			<div className='container'>
				<div className='flex flex-col xl:flex-row xl:items-center gap-10 xl:gap-15'>
					<div className='w-full xl:w-1/2 flex flex-col gap-6'>
						<Title
							variant='h2'
							className=' xl:mb-4'
						>
							География объектов
						</Title>
						<div className='flex flex-col gap-6 text-main text-base xl:text-lg xl:pr-6 leading-[150%]'>
							<p>
								Наша компания специализируется на строительстве уникальных домов из клееного бруса
								по индивидуальным проектам. Мы создаём не просто жильё — мы создаём пространство,
								отражающее ваш стиль, образ жизни и мечты.
							</p>
							<p>
								Нам неважно, где строить ваш дом — будь то сердце Сибири, горные районы или
								прибрежные просторы. За годы работы мы успешно реализовали сотни проектов по всей
								России и в странах СНГ, доказав, что качество и мастерство не зависят от расстояния.
							</p>
							<p>
								Каждый проект — это результат внимательной работы архитекторов, инженеров и
								мастеров, объединённых одной целью: создать дом, который будет вдохновлять вас
								каждый день.
							</p>
						</div>
					</div>
					<div className='w-full xl:w-1/2'>
						<GeographyMap />
					</div>
				</div>
			</div>
		</section>
	);
}
