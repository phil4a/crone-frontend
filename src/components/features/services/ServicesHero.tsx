import Link from 'next/link';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/pages.config';

export function ServicesHero() {
	return (
		<section className='pt-32 md:pt-40 lg:pt-50 pb-16 md:pb-20 lg:pb-25 bg-white'>
			<HeaderThemeObserver theme='light' />
			<div className='container'>
				<div className='flex flex-col lg:flex-row lg:items-center lg:gap-10 xl:gap-20'>
					<div className='lg:basis-1/2 mb-10 lg:mb-0'>
						<Title
							as='h1'
							variant='h2'
							className='mb-6 md:mb-10'
						>
							Услуги строительства домов из клееного бруса — проектирование, сборка, отделка
						</Title>

						<div className='space-y-4 md:space-y-6 text-base mb-8 md:mb-10'>
							<p>
								<b>
									Компания КРОНА предоставляет полный комплекс услуг по строительству домов из
									клееного бруса в Новосибирске и других регионах.
								</b>
							</p>
							<p>
								Мы сопровождаем проект на всех этапах: от архитектурного проектирования до
								внутренней отделки и ввода в эксплуатацию.
							</p>
							<p>
								Работаем только с высококачественным клееным брусом, что гарантирует долговечность,
								экологичность и эстетичность вашего будущего дома.
							</p>
						</div>

						<Button
							as={Link}
							href={PAGE.CONTACTS}
							className='w-full md:w-fit'
						>
							Оставить заявку
						</Button>
					</div>

					<div className='grow shrink-0 -mx-5 lg:mx-0 lg:basis-1/2'>
						<div className='relative w-full aspect-video md:rounded-2xl overflow-hidden bg-black'>
							<video
								autoPlay
								muted
								loop
								playsInline
								poster='/video/hero-desktop-poster.webp'
								className='absolute inset-0 h-full w-full object-cover'
							>
								<source
									src='/video/hero-mobile-2.mp4'
									type='video/mp4'
									media='(max-width: 767px), (orientation: portrait)'
								/>
								<source
									src='/video/hero-desktop.mp4'
									type='video/mp4'
								/>
							</video>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
