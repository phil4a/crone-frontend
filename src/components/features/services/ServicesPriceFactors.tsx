import { Title } from '@/components/ui/Title';

const PRICE_FACTORS = [
	{
		title: 'Площадь и архитектура',
		text: 'Чем больше и сложнее проект, тем выше итоговая стоимость.'
	},
	{
		title: 'Толщина и сечение бруса',
		text: 'От выбора материала зависит не только цена, но и энергоэффективность.'
	},
	{
		title: 'Фундамент',
		text: 'Его тип определяется геологией участка и может значительно влиять на бюджет.'
	},
	{
		title: 'Уровень готовности',
		text: 'Дом «под усадку» и дом «под ключ» отличаются по стоимости в несколько раз.'
	},
	{
		title: 'Индивидуальный проект',
		text: 'Каждый дом проектируется персонально, поэтому универсального прайса быть не может.'
	}
];

const HOW_TO_KNOW_PRICE = [
	'Мы бесплатно проконсультируем вас и уточним пожелания к будущему дому.',
	'Подготовим предварительный расчёт с учётом ключевых параметров.',
	'Составим прозрачную смету, где каждая статья расходов будет понятна.'
];

export function ServicesPriceFactors() {
	return (
		<section className='py-16 md:py-20 lg:py-25 bg-white'>
			<div className='container'>
				<div className='mb-10 md:mb-12'>
					<Title
						as='h2'
						variant='h3'
						className='mb-4 md:mb-6'
					>
						Дом из клееного бруса — цена и факторы формирования стоимости
					</Title>
					<p className='text-base md:text-lg max-w-170'>
						Компания «Крона Групп» специализируется на строительстве домов из клееного бруса. При
						этом многие хотят заранее понять, какой бюджет потребуется. Но фиксированной стоимости
						не существует: цена дома из клееного бруса всегда зависит от множества факторов.
					</p>
				</div>

				<div className='grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-10'>
					<div className='bg-light-gray rounded-2xl p-6 md:p-7.5'>
						<h3 className='text-xl md:text-2xl font-bold text-main mb-5'>
							От чего зависит цена дома из клееного бруса
						</h3>
						<ul className='space-y-4'>
							{PRICE_FACTORS.map(f => (
								<li key={f.title}>
									<div className='font-semibold text-main'>{f.title}</div>
									<div className='text-main leading-relaxed'>{f.text}</div>
								</li>
							))}
						</ul>
					</div>

					<div className='bg-light-gray rounded-2xl p-6 md:p-7.5'>
						<h3 className='text-xl md:text-2xl font-bold text-main mb-5'>
							Как узнать цену именно вашего дома
						</h3>
						<ol className='list-decimal pl-5 space-y-3 text-main'>
							{HOW_TO_KNOW_PRICE.map(step => (
								<li
									key={step}
									className='leading-relaxed'
								>
									{step}
								</li>
							))}
						</ol>
						<p className='mt-5 text-main leading-relaxed'>
							Дом из клееного бруса (цена строительства) рассчитывается индивидуально для каждого
							клиента. Мы учитываем участок, архитектуру, инженерные решения и отделку. Такой
							подход позволяет создавать по-настоящему уникальные дома, которые отвечают всем
							ожиданиям владельцев.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
