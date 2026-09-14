import { Title } from '@/components/ui/Title';

const STEPS = [
	{
		title: 'Заявка и консультация',
		text: 'Обсуждаем задачу, назначение объекта, бюджет и особенности участка на Алтае.'
	},
	{
		title: 'Проект и смета',
		text: 'Разрабатываем архитектурный проект и фиксируем прозрачную смету без скрытых доплат.'
	},
	{
		title: 'Производство домокомплекта',
		text: 'Изготавливаем клееный брус на собственном производстве с контролем качества.'
	},
	{
		title: 'Логистика на участок',
		text: 'Берём на себя доставку материалов в регион, включая удалённые локации.'
	},
	{
		title: 'Монтаж и отделка',
		text: 'Собираем объект и выполняем отделку — используем короткий строительный сезон максимально.'
	},
	{
		title: 'Сдача под ключ',
		text: 'Передаём готовый объект с гарантией 5 лет и поддержкой после сдачи.'
	}
];

export function AltayProcess() {
	return (
		<section className='py-16 md:py-20 lg:py-25 bg-white'>
			<div className='container'>
				<div className='mb-10 max-w-3xl md:mb-14'>
					<Title
						as='h2'
						variant='h2'
						className='mb-4 md:mb-6'
					>
						Как мы работаем
					</Title>
					<p className='text-base text-dark-gray md:text-lg'>
						Полный цикл в одной компании — от первой консультации до сдачи объекта. Вам не нужно
						искать проектировщиков, поставщиков и монтажников по отдельности.
					</p>
				</div>

				<ol className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
					{STEPS.map((step, index) => (
						<li
							key={step.title}
							className='relative flex flex-col rounded-lg border border-light-beige p-6 md:p-8'
						>
							<div className='mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-beige text-lg font-black text-white'>
								{index + 1}
							</div>
							<h3 className='mb-3 text-xl font-bold text-brown'>{step.title}</h3>
							<p className='text-base text-main/80'>{step.text}</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
