import { Title } from '@/components/ui/Title';

const ADVANTAGES = [
	{
		title: 'Экология и климат',
		text: 'Клееный брус «дышит» и держит тепло даже в резко-континентальном климате Алтая — комфортно и зимой, и летом.'
	},
	{
		title: 'Скорость строительства',
		text: 'Домокомплект изготавливается на производстве и собирается на участке за недели, а не месяцы — короткий сезон Алтая используется по максимуму.'
	},
	{
		title: 'Растущий турпоток',
		text: 'Базы отдыха, глэмпинги и гостиницы на Алтае окупаются быстрее за счёт стабильного спроса на загородный отдых.'
	},
	{
		title: 'Сейсмостойкость',
		text: 'Деревянные конструкции легче и эластичнее каменных — это преимущество в сейсмоактивных районах региона.'
	},
	{
		title: 'Логистика под ключ',
		text: 'Берём на себя доставку материалов и организацию работ в удалённых локациях — вам не нужно искать подрядчиков на месте.'
	},
	{
		title: 'Единый подрядчик',
		text: 'Проектирование, производство и монтаж — в одной компании. Один договор, одна ответственность, предсказуемый бюджет.'
	}
];

export function AltayAdvantages() {
	return (
		<section className='py-16 md:py-20 lg:py-25 bg-white'>
			<div className='container'>
				<div className='mb-10 max-w-3xl md:mb-14'>
					<Title
						as='h2'
						variant='h2'
						className='mb-4 md:mb-6'
					>
						Почему стоит строить на Алтае
					</Title>
					<p className='text-base text-dark-gray md:text-lg'>
						Уникальная природа, растущий туристический рынок и технологичность клееного бруса
						делают Алтай одним из самых перспективных регионов для загородного строительства.
					</p>
				</div>

				<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
					{ADVANTAGES.map((item, index) => (
						<div
							key={item.title}
							className='flex flex-col rounded-lg bg-light-beige p-6 md:p-8'
						>
							<span className='mb-5 text-2xl font-black text-beige md:text-3xl'>
								{String(index + 1).padStart(2, '0')}
							</span>
							<h3 className='mb-3 text-xl font-bold text-brown md:text-2xl'>{item.title}</h3>
							<p className='text-base text-main/80'>{item.text}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
