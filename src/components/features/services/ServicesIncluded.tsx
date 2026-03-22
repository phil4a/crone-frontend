'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Title } from '@/components/ui/Title';

import { cn } from '@/lib/utils';

interface PriceRow {
	label: string;
	value: string;
}

interface ServiceItem {
	title: string;
	text?: string;
	subtitle?: string;
	bullets?: string[];
	prices?: PriceRow[];
	link?: string;
	note?: string;
	buttonText?: string;
}

const SERVICES: ServiceItem[] = [
	{
		title: 'Индивидуальное проектирование домов',
		text: 'Мы не используем типовые решения. Каждый проект — это отражение ваших пожеланий, образа жизни и особенностей участка. В результате вы получаете уникальный проект загородного дома из клееного бруса, адаптированный под ваш стиль жизни и архитектурные предпочтения.',
		link: '/services/design',
		subtitle: 'Цены на проектирование домов',
		prices: [
			{ label: 'Эскизный проект', value: '950 руб/м²' },
			{ label: 'Деревянные конструкции', value: '350 руб/м²' },
			{ label: 'Дизайн проект', value: 'от 5500 руб/м²' },
			{ label: 'Генеральный подряд', value: 'в зависимости от задач' }
		]
	},
	{
		title: 'Эскизный и рабочий проект строительства',
		text: 'Мы разрабатываем эскизные и рабочие проекты, которые станут основой для создания вашего идеального дома, сочетая эстетическую концепцию с техническими требованиями.'
	},
	{
		title: 'Заливка фундамента',
		text: 'Фундамент — ключевой этап строительства деревянного дома. Мы подбираем оптимальный тип основания (свайно-винтовой, ленточный, плитный) в зависимости от типа почвы, рельефа и уровня грунтовых вод. Гарантируем точные расчёты и надёжную реализацию.'
	},
	{
		title: 'Сборка стен из клееного бруса',
		text: 'После завершения фундамента мы переходим к возведению стен из клееного бруса.',
		bullets: [
			'Установка подвенечного оклада. Этот элемент защищает нижние ряды бруса от влаги. Мы используем лиственницу, которая обладает высокой стойкостью к гниению.',
			'Монтаж стен. Стены дома собираются из клееного бруса поэтапно, с соблюдением всех технологических норм. Каждый этап проверяется на точность соединений, что обеспечивает долговечность конструкции.'
		]
	},
	{
		title: 'Установка стропильной системы и кровли',
		bullets: [
			'Стропильная система. Это основа крыши, которая отвечает за равномерное распределение нагрузки и устойчивость кровли.',
			'Монтаж кровли. Мы устанавливаем кровельные материалы, которые надежно защищают дом от осадков, механических повреждений и перепадов температур.',
			'Проектирование и установка стропильной системы с расчетом нагрузки.',
			'Монтаж кровли из современных материалов: металлочерепица, гибкая черепица, фальцевая и др.',
			'Кровельная система обеспечивает полную герметичность и защищает дом от атмосферных воздействий.'
		]
	},
	{
		title: 'Наружная отделка деревянного дома',
		bullets: [
			'Обработка фасадов антисептиками и маслами, которые защищают древесину от влаги и УФ-излучения.',
			'Монтаж окон и дверей (деревянные, комбинированные).',
			'Установка архитектурных и декоративных элементов.'
		]
	},
	{
		title: 'Подведение инженерных коммуникаций',
		text: 'На этом этапе мы проводим монтаж инженерных систем:',
		bullets: [
			'Электромонтажные работы и подключение к электросети.',
			'Установка систем отопления.',
			'Вентиляция и кондиционирование.',
			'Монтаж водоснабжения и канализации.'
		]
	},
	{
		title: 'Внутренняя отделка домов из клееного бруса',
		text: 'Когда все строительные работы завершены, мы приступаем к внутренней отделке:',
		bullets: [
			'Укладка полов и монтаж потолков.',
			'Обработка стен защитными покрытиями.',
			'Подготовка дома к меблировке и заселению.'
		],
		note: 'Мы выполняем внутреннюю отделку в натуральном дереве или с применением современных отделочных материалов — в зависимости от вашего стиля и бюджета.'
	}
];

export function ServicesIncluded() {
	const id = useId();
	const [openIndexes, setOpenIndexes] = useState<Set<number>>(() => new Set([0]));
	const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
	const [contentHeights, setContentHeights] = useState<number[]>([]);
	const isInitRef = useRef(false);

	const toggle = useCallback((index: number) => {
		setOpenIndexes(prev => {
			const next = new Set(prev);
			if (next.has(index)) {
				next.delete(index);
				return next;
			}
			next.add(index);
			return next;
		});
	}, []);

	useLayoutEffect(() => {
		if (isInitRef.current) return;

		const indexes = Array.from(openIndexes);
		if (indexes.length === 0) {
			isInitRef.current = true;
			return;
		}

		setContentHeights(prev => {
			const next = prev.slice();
			for (const index of indexes) {
				const el = contentRefs.current[index];
				next[index] = el?.scrollHeight ?? 0;
			}
			return next;
		});

		isInitRef.current = true;
	}, [openIndexes]);

	useEffect(() => {
		if (!isInitRef.current) return;

		const indexes = Array.from(openIndexes);
		if (indexes.length === 0) return;

		const raf = window.requestAnimationFrame(() => {
			setContentHeights(prev => {
				const next = prev.slice();
				for (const index of indexes) {
					const el = contentRefs.current[index];
					next[index] = el?.scrollHeight ?? 0;
				}
				return next;
			});
		});

		return () => {
			window.cancelAnimationFrame(raf);
		};
	}, [openIndexes]);

	const items = useMemo(() => SERVICES, []);

	return (
		<section className='py-16 md:py-20 lg:py-25 bg-light-gray'>
			<div className='container'>
				<div className='mb-10 md:mb-12'>
					<Title
						as='h2'
						variant='h3'
						className='mb-4 md:mb-6'
					>
						Что входит в услуги по строительству домов из клееного бруса
					</Title>
					<p className=''>
						Мы сопровождаем ваш проект на каждом этапе: от проектирования до внутренней отделки.
						Каждая услуга адаптируется под ваши пожелания.
					</p>
				</div>

				<div className='space-y-4'>
					{items.map((item, index) => {
						const itemId = `${id}-${index}`;
						const isOpen = openIndexes.has(index);

						return (
							<div
								key={item.title}
								className='rounded-lg'
							>
								<button
									type='button'
									aria-expanded={isOpen}
									aria-controls={`${itemId}-content`}
									id={`${itemId}-trigger`}
									onClick={() => toggle(index)}
									className={cn(
										'w-full cursor-pointer py-3 px-6 select-none font-bold rounded-lg text-lg transition-colors md:text-xl text-left flex items-center gap-4',
										isOpen ? 'bg-brown text-white' : 'bg-beige text-main'
									)}
								>
									<span className='flex-1'>{item.title}</span>
									<span
										className={cn(
											'shrink-0 transition-transform duration-300',
											isOpen && 'rotate-180'
										)}
										aria-hidden='true'
									>
										<svg
											width='20'
											height='20'
											viewBox='0 0 20 20'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M5 8L10 13L15 8'
												stroke='currentColor'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</span>
								</button>

								<div
									id={`${itemId}-content`}
									role='region'
									aria-labelledby={`${itemId}-trigger`}
									className={cn(
										'px-4 md:px-6 overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out',
										isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
									)}
									style={{ maxHeight: isOpen ? `${contentHeights[index] ?? 0}px` : '0px' }}
									ref={el => {
										contentRefs.current[index] = el;
									}}
								>
									<div className='pt-4 md:pt-5 space-y-4 text-base text-main'>
										{item.text && <p className='leading-relaxed'>{item.text}</p>}
										{item.link && (
											<Link
												href={item.link}
												className='relative text-lg transition-colors after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-beige hover:after:w-full xl:text-base text-nowrap text-main hover:text-beige'
											>
												Узнать подробнее
											</Link>
										)}

										{item.prices && (
											<div>
												{item.subtitle && (
													<h2 className='mt-10 text-main font-bold text-xl'>{item.subtitle}</h2>
												)}
												<div className='my-4 grid grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-3'>
													{item.prices.map(price => (
														<div
															key={price.label}
															className='flex flex-col gap-2 bg-light-beige rounded-xl p-5'
														>
															<div>{price.label}</div>
															<div className='text-xl text-brown font-bold'>{price.value}</div>
														</div>
													))}
												</div>
											</div>
										)}

										{item.bullets && (
											<ul className='list-disc pl-5 space-y-2'>
												{item.bullets.map(b => (
													<li
														key={b}
														className='leading-relaxed'
													>
														{b}
													</li>
												))}
											</ul>
										)}

										{item.note && <p className='leading-relaxed'>{item.note}</p>}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
