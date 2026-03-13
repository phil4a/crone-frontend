import { Title } from '@/components/ui/Title';

const ITEMS = [
	'Опыт работы по всей России и СНГ',
	'Индивидуальный подход',
	'Высокое качество материалов',
	'Гарантия на все этапы работ'
];

export function ServicesWhyUs() {
	return (
		<section className='py-16 md:py-20 lg:py-25 bg-white'>
			<div className='container'>
				<div className='mb-10 md:mb-12'>
					<Title
						as='h2'
						variant='h3'
						className='mb-4 md:mb-6'
					>
						Почему выбирают нас?
					</Title>
					<p className='text-base md:text-lg max-w-170'>
						От идеи до готового дома. Создаем комфорт и стиль с использованием натуральных
						материалов
					</p>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
					{ITEMS.map(item => (
						<div
							key={item}
							className='bg-light-gray rounded-2xl p-6 md:p-7.5 text-main font-semibold'
						>
							{item}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
