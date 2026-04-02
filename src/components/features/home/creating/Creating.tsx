import Link from 'next/link';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { cn } from '@/lib/utils';

export function Creating() {
	return (
		<section className='pb-20 md:pb-25 lg:pb-37.5 bg-white relative creating'>
			<HeaderThemeObserver theme='light' />
			<div className='container'>
				<Badge
					variant='beige'
					className='mb-2.5 md:mb-3 leading-[1.4] font-normal'
				>
					Производство
				</Badge>
				<div className='mb-8 md:mb-10'>
					<Title
						as='h2'
						variant='h2'
					>
						Как создаются наши дома
					</Title>
				</div>

				<div className='flex flex-col-reverse xl:flex-row lg:items-center gap-8 lg:gap-20'>
					{/* Left Content */}
					<div className='flex-1 xl:max-w-[50%] flex flex-col items-start text-main'>
						<p className='mb-6 md:mb-8 text-base font-bold md:text-lg leading-relaxed'>
							Большинство наших проектов реализуется с использованием материалов, произведённых на
							мощностях завода «Кадрин».
						</p>

						<div className='mb-8 md:mb-10'>
							<p className='mb-4 font-semibold'>Мы работаем с лучшей древесиной Горного Алтая:</p>
							<ul className='flex flex-col gap-4 text-lg list-none'>
								<li>
									<span className='font-bold'>Сосна</span> — устойчива к влаге, отличается
									долговечностью и создаёт особый микроклимат в доме благодаря природным смолам.
								</li>
								<li>
									<span className='font-bold'>Кедр</span> — символ прочности и элегантности. Этот
									материал славится высокой устойчивостью к перепадам температуры и долговечностью.
								</li>
								<li>
									<span className='font-bold'>Лиственница</span> — идеальна для наружной отделки
									благодаря её способности противостоять влаге и гниению.
								</li>
							</ul>
						</div>

						<Link
							href='/articles/articles-materials/pochemu-kleeniy-brus/'
							target='_blank'
							className={cn(buttonVariants({ variant: 'default' }), 'w-full md:w-auto text-center')}
						>
							О клееном брусе
						</Link>
					</div>

					{/* Right Video */}
					<div className='flex-1 w-full'>
						<div className='relative w-full pt-[54.72%] rounded-lg overflow-hidden bg-gray-100'>
							<iframe
								src='https://kinescope.io/embed/216uAEpghNmi3jXtR6W3Q6'
								allow='autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;'
								className='absolute top-0 left-0 w-full h-full border-0'
								title='Как создаются наши дома'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
