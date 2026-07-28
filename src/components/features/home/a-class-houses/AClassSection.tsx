import { getImageProps } from 'next/image';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Badge } from '@/components/ui/Badge';
import { Title } from '@/components/ui/Title';

import { AClassImageScroller } from './AClassImageScroller';
import { HotspotsLayer } from './HotspotsLayer';
import { hotspots } from '@/data/a-class-houses-hotspots.data';

export function AClassSection() {
	const { props: imgProps } = getImageProps({
		src: '/images/home/aclass.jpg',
		alt: 'Дома А-класса',
		width: 1800,
		height: 869,
		// Ниже lg картинка едет в горизонтальном скролле: её ширина = 75dvh * 1800/869 ≈ 155vh
		sizes: '(min-width: 1024px) 100vw, 155vh',
		priority: true
	});

	return (
		<section className='features pb-20 md:pb-25 lg:pb-37.5 bg-white relative overflow-hidden'>
			<div className='container'>
				<div className='mb-8 md:mb-10'>
					<Badge
						variant='beige'
						className='mb-2.5 md:mb-3 leading-[1.4] font-normal'
					>
						Архитектура
					</Badge>
					<Title
						as='h2'
						variant='h2'
					>
						Дома А-класса
					</Title>
					<div className='space-y-2 text-base max-w-240 my-4'>
						<p>
							Дом А-класса — это решение для тех, кто выбирает жить осознанно: натуральное дерево,
							безупречная геометрия клееного бруса и архитектура, спроектированная под конкретный
							участок и конкретную семью, а не подогнанная под типовой шаблон.
						</p>
						<p>
							Здесь утренний свет проходит сквозь панорамные окна, тепло согревает, а дом прослужит
							нескольким поколениям, оставаясь таким же надёжным и красивым, каким был задуман с
							первого эскиза.
						</p>
						<p>
							<b>Это не просто строительство — это создание места, куда хочется возвращаться.</b>
						</p>
					</div>
				</div>
			</div>
			<div className='relative w-full select-none'>
				<HeaderThemeObserver theme='transparent' />

				<AClassImageScroller>
					<img
						{...imgProps}
						alt='Дома А-класса'
						className='absolute inset-0 h-full w-full object-cover'
					/>

					<HotspotsLayer hotspots={hotspots} />
				</AClassImageScroller>
			</div>
		</section>
	);
}
