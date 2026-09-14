import Image from 'next/image';

import { Title } from '@/components/ui/Title';

const ITEMS = [
	{
		title: 'Жилые дома',
		text: 'Загородные дома для сезонного и постоянного проживания.',
		image: '/images/altay/zhilie.jpg'
	},
	{
		title: 'Бани и СПА',
		text: 'Банные комплексы с бассейнами и зонами отдыха.',
		image: '/images/altay/spa.jpg'
	},
	{
		title: 'Базы отдыха',
		text: 'Туристические комплексы и глэмпинги под ключ.',
		image: '/images/altay/bazy.png'
	},
	{
		title: 'Гостиницы',
		text: 'Мини-отели и гостевые дома для турпотока.',
		image: '/images/altay/hotels.jpg'
	},
	{
		title: 'Рестораны',
		text: 'Кафе и рестораны с видовыми террасами.',
		image: '/images/altay/rest.png'
	},
	{
		title: 'Резиденции',
		text: 'Частные пространства из бруса.',
		image: '/images/altay/residence.png'
	}
];

export function AltayWhatWeBuild() {
	return (
		<section className='py-16 md:py-20 lg:py-25 bg-light-gray'>
			<div className='container'>
				<div className='mb-10 max-w-3xl md:mb-14'>
					<Title
						as='h2'
						variant='h2'
						className='mb-4 md:mb-6'
					>
						Что мы строим на Алтае
					</Title>
					<p className='text-base text-dark-gray md:text-lg'>
						От частного дома до готового туристического бизнеса — реализуем объекты любого масштаба
						и назначения из клееного бруса.
					</p>
				</div>

				<ul className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
					{ITEMS.map(item => (
						<li
							key={item.title}
							className='group relative overflow-hidden rounded-lg'
						>
							<div className='relative aspect-3/2 w-full'>
								<Image
									src={item.image}
									alt={item.title}
									fill
									sizes='(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw'
									className='object-cover transition-transform duration-500 group-hover:scale-105'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent' />
							</div>
							<div className='absolute inset-x-0 bottom-0 p-6'>
								<h3 className='mb-1.5 text-xl font-bold text-white md:text-2xl'>{item.title}</h3>
								<p className='text-sm text-white/85 md:text-base'>{item.text}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
