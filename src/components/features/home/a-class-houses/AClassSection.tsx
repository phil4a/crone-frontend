import { getImageProps } from 'next/image';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Badge } from '@/components/ui/Badge';
import { Title } from '@/components/ui/Title';

import { HotspotsLayer } from './HotspotsLayer';
import { hotspots as hotspotsDesktop, hotspotsMobile } from '@/data/a-class-houses-hotspots.data';

const BREAKPOINT_MEDIA = '(min-width: 1024px)';

export function AClassSection() {
	const {
		props: { srcSet: desktopSrcSet }
	} = getImageProps({
		src: '/images/home/aclass.jpg',
		alt: 'Дома А-класса',
		width: 1800,
		height: 869,
		sizes: '100vw',
		priority: true
	});

	const { props: mobileImgProps } = getImageProps({
		src: '/images/home/aclass-mobile.jpg',
		alt: 'Дома А-класса',
		width: 627,
		height: 794,
		sizes: '100vw',
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
			<div className='relative w-full select-none aspect-627/794 lg:aspect-1800/869'>
				<HeaderThemeObserver theme='transparent' />

				<picture>
					<source
						media={BREAKPOINT_MEDIA}
						srcSet={desktopSrcSet}
					/>
					<img
						{...mobileImgProps}
						alt='Дома А-класса'
						className='absolute inset-0 h-full w-full object-cover'
					/>
				</picture>

				<HotspotsLayer
					hotspots={hotspotsDesktop}
					className='hidden lg:block'
				/>
				<HotspotsLayer
					hotspots={hotspotsMobile}
					className='lg:hidden'
				/>
			</div>
		</section>
	);
}
