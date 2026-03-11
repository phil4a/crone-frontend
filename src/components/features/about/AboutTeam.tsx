import Image from 'next/image';

import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

const TEAM = [
	{
		name: 'Назаркин Сергей',
		position: 'Генеральный директор ООО “Крона Групп”',
		quote:
			'В каждом проекте мы создаем не просто дом, а пространство, где рождаются самые ценные моменты жизни.',
		image: '/images/about/Sergey_N2.jpg'
	},
	{
		name: 'Прокофьев Сергей',
		position: 'Главный архитектор',
		quote:
			'Моя цель — гармонично соединить эстетику и функциональность, создавая дома, которые вдохновляют и радуют своих владельцев.',
		image: '/images/about/Sergey_P.jpg'
	}
];

export function AboutTeam() {
	return (
		<section className='py-20 md:py-30 lg:py-40 bg-light-beige'>
			<div className='container'>
				<div className='mb-12 md:mb-16 lg:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start'>
					<Title
						as='h2'
						variant='h3'
						className='mb-6 md:mb-0'
					>
						Наша команда
					</Title>
					<div className='space-y-6 text-base md:text-lg text-dark-gray'>
						<p>
							Наша команда — это сплоченный коллектив профессионалов, каждый из которых является
							экспертом в своей области, будь то архитектура, дизайн или строительство домов из
							клееного бруса.
						</p>
						<p>
							Мы работаем как единое целое, чтобы превратить ваши идеи в реальность, обеспечивая
							высокий стандарт качества на каждом этапе — от концепции до завершения строительства.
						</p>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 mb-12 md:mb-16'>
					{TEAM.map((member, index) => (
						<div
							key={index}
							className='flex flex-col md:flex-row gap-6 md:gap-8 bg-white rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300'
						>
							<div className='relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden mx-auto md:mx-0'>
								<Image
									src={member.image}
									alt={member.name}
									fill
									className='object-cover'
								/>
							</div>
							<div className='flex flex-col text-center md:text-left'>
								<h4 className='text-xl font-bold text-main mb-2'>{member.name}</h4>
								<p className='text-sm text-dark-gray mb-4 font-medium'>{member.position}</p>
								<p className='text-base text-gray-600 italic leading-relaxed'>
									&quot;{member.quote}&quot;
								</p>
							</div>
						</div>
					))}
				</div>

				<div className='relative rounded-2xl overflow-hidden bg-main text-white'>
					<div className='absolute inset-0 z-0'>
						<Image
							src='/images/about/work.jpg'
							alt='Наша работа'
							fill
							className='object-cover opacity-20'
						/>
						<div className='absolute inset-0 bg-main/80 mix-blend-multiply'></div>
					</div>
					<div className='relative z-10 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-16'>
						<div className='flex-1 text-base md:text-lg leading-relaxed text-white/90'>
							<p>
								Наша команда обладает всеми необходимыми компетенциями для строительства домов из
								клееного бруса: архитектурное и конструкторское проектирование, дизайн интерьера и
								экстерьера, производство и монтаж деревянных конструкций, управление проектами,
								отделочные работы, а также проектирование и установка инженерных коммуникаций. Мы
								обеспечиваем полный цикл услуг, контролируя качество на каждом этапе и предоставляя
								гарантию на все выполненные работы.
							</p>
						</div>
						<div className='shrink-0'>
							<Button
								variant='outline'
								className='bg-transparent text-white border-white hover:bg-white hover:text-main'
							>
								Отправить заявку
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
