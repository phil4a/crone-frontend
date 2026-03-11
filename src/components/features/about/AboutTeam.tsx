import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { MaxIcon, TelegramIcon, WhatsappIcon } from '@/components/ui/Icons';
import { Title } from '@/components/ui/Title';

import { SITE_CONFIG } from '@/config/site.config';

const TEAM = [
	{
		name: 'Назаркин Сергей',
		position: 'Генеральный директор ООО “Крона Групп”',
		messengers: [
			{
				icon: <MaxIcon className='w-6 h-6 hover:text-beige transition-colors' />,
				link: SITE_CONFIG.contacts.socials.max
			},
			{
				icon: <WhatsappIcon className='w-6 h-6 hover:text-beige transition-colors' />,
				link: SITE_CONFIG.contacts.socials.whatsapp
			},
			{
				icon: <TelegramIcon className='w-6 h-6 hover:text-beige transition-colors' />,
				link: SITE_CONFIG.contacts.socials.telegram
			}
		],
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

const WORK_TEXT =
	'Мы обладаем всеми необходимыми компетенциями для строительства домов из клееного бруса: архитектурное и конструкторское проектирование, дизайн интерьера и экстерьера, производство и монтаж деревянных конструкций, управление проектами, отделочные работы, а также проектирование и установка инженерных коммуникаций. Обеспечиваем полный цикл услуг, контролируя качество на каждом этапе и предоставляя гарантию на все выполненные работы.';

export function AboutTeam() {
	return (
		<section className='pb-16 md:pb-20 lg:pb-25'>
			<div className='container'>
				<Title
					as='h2'
					variant='h3'
					className='mb-4 md:mb-6'
				>
					Команда
				</Title>
				<div className='space-y-2 text-base max-w-240 mb-8'>
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

				<div className='flex flex-col xl:flex-row gap-10 xl:gap-5'>
					<div className='flex flex-1 flex-col md:flex-row md:flex-1/2 gap-5'>
						{TEAM.map((member, index) => (
							<div
								key={index}
								className='flex-1 md:flex-1/2 flex flex-col gap-4 bg-white rounded-2xl'
							>
								<div className='relative aspect-square rounded-lg overflow-hidden'>
									<Image
										src={member.image}
										alt={member.name}
										fill
										className='object-cover'
									/>
								</div>
								<div className='flex flex-col text-left'>
									<h4 className='text-xl font-bold text-main mb-2'>{member.name}</h4>
									<p className='text-sm text-dark-gray mb-2'>{member.position}</p>
									<div className='flex items-center gap-3 mb-4'>
										{member.messengers?.map((messenger, index) => (
											<Link
												key={index}
												href={messenger.link}
												target='_blank'
												rel='noopener noreferrer'
												className='text-brown'
											>
												{messenger.icon}
											</Link>
										))}
									</div>
									<p className='text-base italic leading-relaxed'>«{member.quote}»</p>
								</div>
							</div>
						))}
					</div>
					<div className='relative w-full xl:flex-1 xl:basis-1/2 shrink-0'>
						<div className='relative h-80 md:h-160 xl:h-full min-h-80 md:min-h-160 rounded-lg overflow-hidden text-white'>
							<Image
								src='/images/about/work.jpg'
								alt='Работа Крона Групп'
								fill
								className='object-cover'
							/>
							<div className='hidden md:block absolute w-full h-4/5 xl:h-2/3 bottom-0 left-0 bg-linear-to-b from-transparent to-black' />
							<div className='hidden md:flex absolute bottom-0 left-0 p-7.5 flex-col gap-5'>
								<p className='leading-normal text-white'>{WORK_TEXT}</p>
								<Button className='w-full md:w-fit'>Отправить заявку</Button>
							</div>
						</div>

						<div className='md:hidden mt-6 flex flex-col gap-5 text-main'>
							<p className='leading-normal'>{WORK_TEXT}</p>
							<Button className='w-full'>Отправить заявку</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
