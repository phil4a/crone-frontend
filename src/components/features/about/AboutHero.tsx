import Image from 'next/image';
import Link from 'next/link';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

export function AboutHero() {
	return (
		<section className='pt-32 pb-10 md:pt-40 md:pb-20 lg:pt-50 lg:pb-25 bg-light-beige'>
			<HeaderThemeObserver theme='light' />
			<div className='container'>
				<div className='flex flex-col lg:flex-row lg:items-center lg:gap-10 xl:gap-20'>
					<div className='lg:w-1/2 mb-10 lg:mb-0'>
						<Title
							as='h1'
							variant='h2'
							className='mb-6 md:mb-10'
						>
							О компании
						</Title>

						<div className='space-y-4 md:space-y-6 text-base md:text-lg text-dark-gray mb-8 md:mb-10'>
							<p>
								«КРОНА» — это объединение опытных архитекторов, дизайнеров, инженеров и строителей,
								которые работают в единой команде, чтобы создать для вас уникальный дом. Мы
								сопровождаем проект на всех этапах — от первых эскизов до завершения отделочных
								работ.
							</p>
							<p>
								Мы являемся вашим единственным подрядчиком на протяжении всего процесса
								строительства, что позволяет нам оперативно принимать решения и эффективно управлять
								проектом. Мы берем на себя полную ответственность за качество и соблюдение сроков,
								чтобы вы могли получить дом, о котором мечтали.
							</p>
							<p>
								Каждый дом, который мы строим, индивидуален и создается с учетом ваших пожеланий. Мы
								предлагаем полный комплекс услуг «под ключ» и предоставляем гарантию на все работы
								сроком на 5 лет.
							</p>
						</div>

						<Button
							asChild
							variant='default'
						>
							<Link href='/projects'>Узнать больше о наших проектах</Link>
						</Button>
					</div>
					<div className='lg:w-1/2'>
						<div className='relative w-full aspect-[4/3] rounded-2xl overflow-hidden'>
							<Image
								src='/images/about/hero.jpg'
								alt='О компании Крона'
								fill
								className='object-cover'
								sizes='(max-width: 768px) 100vw, 50vw'
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
