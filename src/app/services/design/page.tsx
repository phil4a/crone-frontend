import type { Metadata } from 'next';
import Image from 'next/image';

import { FeedbackForm } from '@/components/common/FeedbackForm';
import { FeedbackModalTrigger } from '@/components/common/FeedbackModal';
import { ServicesProjects } from '@/components/features/services/ServicesProjects';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Title } from '@/components/ui/Title';

export const metadata: Metadata = {
	title: 'Проектирование домов | Крона Групп',
	description:
		'Индивидуальное проектирование домов из клееного бруса: планировки, конструктивные решения и подробная рабочая документация.'
};

const PRICES = [
	{ title: 'Эскизный проект', price: '950 руб/м²' },
	{ title: 'Деревянные конструкции', price: '350 руб/м²' },
	{ title: 'Дизайн проект', price: 'от 5500 руб/м²' },
	{ title: 'Генеральный подряд', price: 'в зависимости от задач' }
];

const ADVANTAGES = [
	{
		title: 'Эксклюзивность',
		text: 'Все проекты — авторские и разработаны индивидуально, что делает каждый дом уникальным.'
	},
	{
		title: 'Качество и надёжность',
		text: 'Используем только сертифицированные материалы, проверенные временем.'
	},
	{
		title: 'Профессионализм',
		text: 'Учитываем любые пожелания заказчика, создавая проекты любой сложности.'
	},
	{
		title: 'Сопровождение',
		text: 'От эскизных решений до детализированной рабочей документации — ведём проект на всех этапах.'
	}
];

const WORK_STEPS = [
	'Планы этажей: четкое зонирование помещений и оптимальное распределение пространства.',
	'Планы балок перекрытий: детальная проработка несущих конструкций.',
	'План кровли: конструктивные решения с учетом климатических особенностей.',
	'Виды и планы стропильной системы: расчеты для устойчивой и долговечной кровли.',
	'Расположение кабельных каналов: при наличии электропроекта — удобство монтажа инженерных систем.',
	'Ведомость материалов: перечень элементов с характеристиками.',
	'Фасады: внешний облик дома с учетом современных архитектурных тенденций.',
	'Аксонометрия: наглядное трехмерное представление проекта.',
	'Развертки по стенам: детализация для точного исполнения работ.',
	'Спецификация: список материалов с техническими характеристиками.',
	'Деталировка: проработка узлов для качества сборки.',
	'Оптимизация: баланс между затратами, сроками и качеством строительства.'
];

export default function ServicesDesignPage() {
	return (
		<main className='bg-white'>
			<section className='pt-32 md:pt-40 lg:pt-50 xl:pt-52 pb-16 md:pb-20 lg:pb-25 bg-white'>
				<HeaderThemeObserver theme='light' />
				<div className='container'>
					<div className='flex flex-col xl:flex-row xl:items-center gap-10 xl:gap-7'>
						<div className='xl:basis-1/3'>
							<Title
								as='h1'
								variant='h2'
								className='mb-6 md:mb-10 text-[clamp(28px,4vw,40px)] xl:text-[clamp(30px,2vw,40px)]'
							>
								Проектирование домов из клееного бруса
							</Title>

							<div className='space-y-4 md:space-y-6 text-base mb-8 md:mb-10'>
								<p className='font-semibold'>
									Эксклюзивные индивидуальные проекты для строительства под ключ
								</p>
								<p>
									Мы создаём уникальные авторские проекты домов, полностью адаптированные к
									особенностям вашего участка и вашим пожеланиям. Разработаем оптимальные планировки
									и подберем проверенные и долговечные материалы.
								</p>
							</div>

							<FeedbackModalTrigger className='w-full md:w-fit'>
								Оставить заявку
							</FeedbackModalTrigger>
						</div>

						<div className='grow shrink-0 -mx-5 md:-mx-(--spacing-container-padding) xl:mx-0 xl:basis-2/3'>
							<div className='relative w-full aspect-video overflow-hidden xl:rounded-lg'>
								<Image
									src='/images/services/design-1.webp'
									alt='Проектирование домов из клееного бруса'
									fill
									priority
									className='object-cover'
									sizes='(max-width: 1279px) 100vw, 66vw'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='py-16 md:py-20 lg:py-25 bg-light-gray'>
				<HeaderThemeObserver theme='light' />
				<div className='container'>
					<Title
						as='h2'
						variant='h3'
						className='mb-6'
					>
						Комплексный подход
					</Title>
					<p className='text-base md:text-lg mb-10 max-w-5xl'>
						Каждый проект — это эксклюзивное решение, созданное с нуля. Мы учитываем детали, от
						выбора материалов до технологий производства, чтобы обеспечить качество строительства
						под ключ. Проектирование является неотъемлемой частью полного цикла строительства, что
						позволяет гарантировать слаженную работу на всех этапах реализации.
					</p>

					<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
						{ADVANTAGES.map(item => (
							<li
								key={item.title}
								className='rounded-lg bg-white p-6'
							>
								<div className='text-xl font-bold text-brown mb-3'>{item.title}</div>
								<p className='text-main leading-relaxed'>{item.text}</p>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className='py-16 md:py-20 lg:py-25 bg-white'>
				<HeaderThemeObserver theme='light' />
				<div className='container'>
					<div className='grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-7.5'>
						<div>
							<div className='mb-10 md:mb-12'>
								<Title
									as='h2'
									variant='h3'
									className='mb-4 md:mb-6'
								>
									Этапы разработки рабочего проекта
								</Title>
								<p className='text-base md:text-lg text-main max-w-4xl'>
									Рабочий проект включает подробную документацию, обеспечивающую точность и
									эффективность строительства.
								</p>
							</div>

							<ol className='space-y-3 list-decimal pl-5 text-main leading-relaxed'>
								{WORK_STEPS.map(step => (
									<li key={step}>{step}</li>
								))}
							</ol>
						</div>
						<div className='rounded-lg overflow-hidden bg-brown text-white'>
							<div className='relative aspect-video'>
								<Image
									src='/images/services/design-2.webp'
									alt='Проектирование и документация'
									fill
									className='object-cover'
									sizes='(max-width: 1279px) 100vw, 50vw'
								/>
								<div className='absolute inset-0 bg-black/35' />
							</div>

							<div className='p-6 md:p-8'>
								<Title
									as='h3'
									variant='h3'
									className='text-white mb-4'
								>
									Проекты для бизнеса
								</Title>
								<p className='text-white/90 leading-relaxed mb-6'>
									Мы реализуем проекты не только для частных лиц, но и для юридических лиц.
									Индивидуальный подход помогает разрабатывать архитектурные решения для
									коммерческих объектов, где важны требования бизнеса и оптимизация затрат.
								</p>
								<FeedbackModalTrigger className='w-full sm:w-fit'>
									Отправить заявку
								</FeedbackModalTrigger>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='py-16 md:py-20 lg:py-25 bg-light-gray'>
				<HeaderThemeObserver theme='light' />
				<div className='container'>
					<Title
						as='h2'
						variant='h2'
						className='mb-10'
					>
						Цены на проектирование
					</Title>

					<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
						{PRICES.map(item => (
							<div
								key={item.title}
								className='rounded-xl bg-white p-6'
							>
								<div className='text-lg font-semibold text-main mb-2'>{item.title}</div>
								<div className='text-2xl font-bold text-brown'>{item.price}</div>
							</div>
						))}
					</div>

					<div className='mt-10 flex justify-center'>
						<FeedbackModalTrigger
							variant='outline'
							className='w-full md:w-fit'
						>
							Заказать проектирование
						</FeedbackModalTrigger>
					</div>
				</div>
			</section>

			<ServicesProjects />

			<FeedbackForm
				formId={225}
				title='Закажите проект у нас!'
				text='Заполните форму заявки, и мы вышлем вам презентацию'
			/>
		</main>
	);
}
