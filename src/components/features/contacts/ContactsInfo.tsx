import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import {
	ContactsInstagramIcon,
	ContactsVkIcon,
	ContactsWhatsappIcon,
	EmailIcon,
	MarkerIcon,
	MaxIcon,
	PhoneIcon,
	TelegramIcon
} from '@/components/ui/Icons';
import { Title } from '@/components/ui/Title';

import { SITE_CONFIG } from '@/config/site.config';

import { HeaderThemeObserver } from '../../layout/HeaderThemeObserver';

export function ContactsInfo() {
	return (
		<section className='pb-10 pt-32 md:pb-15 md:pt-40 xl:pb-17.5 xl:pt-52'>
			<HeaderThemeObserver theme='light' />
			<div className='container'>
				<div className='mb-8 md:mb-12'>
					<Title
						as='h1'
						variant='h2'
					>
						Контакты
					</Title>
				</div>
				<div className='grid grid-cols-1 gap-8 lg:grid-cols-2 md:gap-x-7.5 md:gap-y-10 xl:grid-cols-5'>
					{/* Address */}
					<div className='xl:col-span-2'>
						<Badge
							variant='beige'
							className='mb-4 gap-2.5'
						>
							<MarkerIcon />
							<span className='font-light text-base'>Адрес</span>
						</Badge>
						<h4 className='text-lg font-bold leading-tight md:text-2xl'>
							{SITE_CONFIG.contacts.address}
						</h4>
						<p className='mt-2'>Время работы: пн-пт 9:00 — 18:00</p>
					</div>

					{/* Phone */}
					<div>
						<Badge
							variant='beige'
							className='mb-4 gap-2.5'
						>
							<PhoneIcon />
							<span className='font-light text-base'>Телефон</span>
						</Badge>
						<Link
							href={SITE_CONFIG.contacts.phone.href}
							className='block text-nowrap text-lg font-bold leading-tight hover:text-brown transition-colors md:text-2xl'
						>
							{SITE_CONFIG.contacts.phone.label}
						</Link>
					</div>

					{/* Email */}
					<div>
						<Badge
							variant='beige'
							className='mb-4 gap-2.5'
						>
							<EmailIcon />
							<span className='font-light text-base'>Почта</span>
						</Badge>
						<Link
							href={SITE_CONFIG.contacts.email.href}
							className='block text-nowrap text-lg font-bold leading-tight hover:text-brown transition-colors md:text-2xl'
						>
							{SITE_CONFIG.contacts.email.label}
						</Link>
					</div>

					{/* Social */}
					<div className='flex gap-4 items-baseline-last mb-8'>
						<Link
							href={SITE_CONFIG.contacts.socials.instagram}
							target='_blank'
							className='self-end'
						>
							<ContactsInstagramIcon className='rounded-sm' />
						</Link>
						<Link
							href={SITE_CONFIG.contacts.socials.telegram}
							target='_blank'
							className='h-8 w-8 flex items-center justify-center rounded-sm bg-beige text-white self-end'
						>
							<TelegramIcon />
						</Link>
						<Link
							href={SITE_CONFIG.contacts.socials.whatsapp}
							target='_blank'
							className='self-end'
						>
							<ContactsWhatsappIcon className='rounded-sm' />
						</Link>
						<Link
							href={SITE_CONFIG.contacts.socials.vk}
							target='_blank'
							className='self-end'
						>
							<ContactsVkIcon className='rounded-sm' />
						</Link>
						<Link
							href={SITE_CONFIG.contacts.socials.max}
							target='_blank'
							className='w-8 h-8 flex items-center justify-center text-white bg-beige rounded-sm self-end'
						>
							<MaxIcon />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
