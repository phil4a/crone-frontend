import Image from 'next/image';
import Link from 'next/link';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

const USP = [
	'Проектируем и строим с 2009 года',
	'Клееный брус собственного производства',
	'Работаем по всей России и СНГ',
	'Гарантия 5 лет на все этапы работ'
];

export function AltayHero() {
	return (
		<section className='relative flex min-h-svh w-full items-end overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40  xl:items-center xl:pb-0'>
			<HeaderThemeObserver theme='transparent' />

			{/* Background */}
			<div className='absolute inset-0 -z-10'>
				<Image
					src='/images/altay/resort.png'
					alt='Дом из клееного бруса на Алтае'
					fill
					priority
					sizes='100vw'
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/30' />
			</div>

			<div className='container'>
				<div className='max-w-3xl'>
					<span className='mb-5 inline-block rounded-lg bg-beige/90 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white md:text-base'>
						Строительство на Алтае под ключ
					</span>
					<Title
						as='h1'
						variant='h1'
						color='white'
						className='mb-6 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.35)]'
					>
						Строительство из клееного бруса на Алтае
					</Title>
					<p className='mb-8 max-w-2xl text-lg text-white/90 md:text-xl'>
						Проектируем и строим экологичные деревянные объекты в гармонии с природой Алтая — от
						частного дома до туристической базы. Полный цикл: от архитектуры до сдачи под ключ.
					</p>

					<ul className='mb-10 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2'>
						{USP.map(item => (
							<li
								key={item}
								className='flex items-start gap-3 text-base text-white md:text-lg'
							>
								<svg
									width='22'
									height='22'
									viewBox='0 0 24 24'
									fill='none'
									className='mt-0.5 shrink-0 text-beige'
									aria-hidden='true'
								>
									<path
										d='M20 6L9 17l-5-5'
										stroke='currentColor'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
								{item}
							</li>
						))}
					</ul>

					<div className='flex flex-col gap-4 sm:flex-row'>
						<Button
							as={Link}
							href='#altay-podbor'
							className='w-full sm:w-auto'
						>
							Подобрать проект
						</Button>
						<Button
							as={Link}
							href='#altay-raboty'
							variant='outline'
							className='w-full border-white text-white hover:bg-white/10 active:bg-white/10 sm:w-auto'
						>
							Посмотреть работы
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
