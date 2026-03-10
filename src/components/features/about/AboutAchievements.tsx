import Image from 'next/image';

import { Title } from '@/components/ui/Title';

const ACHIEVEMENTS = [
	{
		number: '200+',
		text: 'количество проектов'
	},
	{
		number: '150 000 м²',
		text: 'общая площадь построенных объектов'
	},
	{
		number: '15+',
		text: 'лет на рынке'
	}
];

export function AboutAchievements() {
	return (
		<section className='relative py-20 md:py-30 lg:py-40 overflow-hidden'>
			<div className='absolute inset-0 w-full h-full pointer-events-none select-none'>
				<Image
					src='/images/about/vectors.svg'
					alt=''
					fill
					className='object-cover opacity-10'
				/>
			</div>
			<div className='container relative z-10'>
				<Title
					as='h2'
					variant='h3'
					className='mb-10 md:mb-16 text-center'
				>
					Коротко о наших достижениях в цифрах
				</Title>

				<ul className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-20 text-center'>
					{ACHIEVEMENTS.map((item, index) => (
						<li
							key={index}
							className='flex flex-col items-center'
						>
							<div className='text-4xl md:text-5xl lg:text-6xl font-bold text-main mb-4'>
								{item.number}
							</div>
							<div className='text-lg md:text-xl text-dark-gray max-w-[200px]'>
								{item.text}
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
