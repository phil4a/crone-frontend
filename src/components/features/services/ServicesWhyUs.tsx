import { Title } from '@/components/ui/Title';

const ITEMS = [
	'Опыт работы по всей России и СНГ',
	'Индивидуальный подход',
	'Высокое качество материалов',
	'Гарантия на все этапы работ'
];

export function ServicesWhyUs() {
	return (
		<section className='pb-16 md:pb-20 lg:pb-25'>
			<div className='container'>
				<div className='bg-light-beige xl:rounded-lg p-5 md:p-10 lg:p-10 -mx-5 md:-mx-(--spacing-container-padding) xl:mx-0'>
					<div className='mb-10 md:mb-12'>
						<Title
							as='h2'
							variant='h3'
							className='mb-4 md:mb-6'
						>
							Почему выбирают нас?
						</Title>
						<p className='text-base md:text-lg'>
							От идеи до готового дома. Создаем комфорт и стиль с использованием натуральных
							материалов
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
						{ITEMS.map(item => (
							<div
								key={item}
								className='bg-white/50 rounded-lg py-8.5 px-10 md:py-21 md:px-10 text-[clamp(18px,1.5vw,24px)] text-brown font-bold text-center'
							>
								{item}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
