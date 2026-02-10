import Image from 'next/image';
import Link from 'next/link';

import { EmailIcon, InstagramIcon, PhoneIcon, TelegramIcon } from '@/components/ui/Icons';
import { Logo } from '@/components/ui/Logo';

import { FOOTER_MENU } from '@/config/navigation.config';
import { SITE_CONFIG } from '@/config/site.config';

import { projectService } from '@/services/project.service';

export async function Footer() {
	const currentYear = new Date().getFullYear();
	const tags = await projectService.getProjectTags(7);

	const objectItems =
		tags.length > 0
			? tags.map(tag => ({
					label: tag.name,
					href: `/projects/?tags=${tag.slug}`
				}))
			: []; // Or fallback to static menu if needed

	return (
		<footer className='bg-main text-white py-15 xl:py-25'>
			<div className='container flex flex-col xl:block'>
				<div className='flex flex-col xl:flex-row gap-10 xl:gap-5 mb-5 xl:mb-0'>
					{/* LEFT COLUMN */}
					<div className='flex flex-col flex-1 xl:gap-10'>
						{/* Logo */}
						<Link
							href='/'
							className='mb-10 xl:mb-0 block w-fit'
						>
							<Logo className='text-white w-62.75 h-8' />
						</Link>

						{/* Mobile Only Contacts */}
						<div className='xl:hidden'>
							<FooterContacts />
						</div>

						{/* Desktop Only Info & Logos */}
						<div className='hidden xl:flex flex-col gap-10'>
							<FooterInfo year={currentYear} />
							<FooterLogos />
						</div>
					</div>

					{/* RIGHT COLUMN */}
					<div className='flex-1 flex flex-col xl:flex-row gap-10 xl:gap-5'>
						{/* Menus */}
						<div className='flex-1 flex flex-col sm:flex-row gap-10 xl:gap-5'>
							<FooterMenu
								title='Меню'
								items={FOOTER_MENU}
							/>
							{objectItems.length > 0 && (
								<FooterMenu
									title='Объекты'
									items={objectItems}
								/>
							)}
						</div>

						{/* Desktop Only Contacts */}
						<div className='hidden xl:block'>
							<FooterContacts />
						</div>
					</div>
				</div>

				{/* Mobile Only Info & Logos (Bottom) */}
				<div className='xl:hidden flex flex-col-reverse gap-10 mt-10'>
					<FooterInfo year={currentYear} />
					<FooterLogos />
				</div>
			</div>
		</footer>
	);
}

function FooterMenu({ title, items }: { title: string; items: { label: string; href: string }[] }) {
	return (
		<nav className='flex-1 min-w-50'>
			<h4 className='font-bold text-lg text-beige mb-6 uppercase tracking-wider'>{title}</h4>
			<ul className='flex flex-col gap-4'>
				{items.map((item, index) => (
					<li key={index}>
						<Link
							href={item.href}
							className='text-white hover:text-beige transition-colors leading-[130%]'
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

function FooterContacts() {
	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-4 items-start'>
				<a
					href={SITE_CONFIG.contacts.socials.telegram}
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center gap-3 text-white hover:text-beige transition-colors'
				>
					<TelegramIcon className='w-4.5 h-4.5' />
					<span>Наш telegram-канал</span>
				</a>
				<a
					href={SITE_CONFIG.contacts.email.href}
					className='flex items-center gap-3 text-white hover:text-beige transition-colors'
				>
					<EmailIcon className='w-4.5 h-3.75' />
					<span>{SITE_CONFIG.contacts.email.label}</span>
				</a>
				<a
					href={SITE_CONFIG.contacts.phone.href}
					className='flex items-center gap-3 text-white hover:text-beige transition-colors'
				>
					<PhoneIcon className='w-4.5 h-4.75' />
					<span>{SITE_CONFIG.contacts.phone.label}</span>
				</a>
				<a
					href={SITE_CONFIG.contacts.socials.instagram}
					target='_blank'
					rel='noopener noreferrer'
					className='hidden xl:flex flex-col items-start gap-2 text-white hover:text-beige transition-colors'
					aria-label='Больше информации в instagram'
				>
					<Image
						src='/images/footer/insta-desktop.svg'
						alt='логотип инстаграм'
						width={160}
						height={160}
						className='w-40 h-40'
					/>
					<span className='text-lg'>@cronegroupnsk</span>
				</a>
				<a
					href={SITE_CONFIG.contacts.socials.instagram}
					target='_blank'
					rel='noopener noreferrer'
					className='xl:hidden flex items-center gap-3 text-white hover:text-beige transition-colors'
				>
					<InstagramIcon className='w-8 h-8' />
				</a>
			</div>
		</div>
	);
}

function FooterInfo({ year }: { year: number }) {
	return (
		<div className='flex flex-col max-w-75 text-white/60 text-base xl:mt-0'>
			<div className='flex flex-col gap-2'>
				<p className='text-sm'>
					Проектирование и строительство деревянных домов из клееного бруса под ключ в Новосибирске
				</p>
				<p>© {year} ООО «Крона Групп»</p>
			</div>
			<Link
				href='#'
				className='hover:text-white transition-colors mt-4'
			>
				Политика конфиденциальности
			</Link>
		</div>
	);
}

function FooterLogos() {
	return (
		<div className='flex flex-col sm:flex-row gap-6 sm:gap-10 xl:gap-6 items-start'>
			<div className='grid grid-cols-[76px_1fr] gap-4 items-center'>
				<div className='relative flex justify-center w-full h-full'>
					<Image
						src='/images/footer/kadrin.png'
						alt='Кадрин'
						fill
						sizes='(max-width: 768px) 100vw, 100px'
						className='max-h-14 w-auto object-contain'
					/>
				</div>
				<p className='text-sm uppercase leading-[140%] max-w-40.5'>
					Официальный представитель завода «Кадрин»
				</p>
			</div>
			<div className='grid grid-cols-[76px_1fr] gap-4 items-center'>
				<div className='relative flex justify-center w-full h-full'>
					<Image
						src='/images/footer/npadd.png'
						alt='Ассоциация деревянного домостроения'
						fill
						sizes='(max-width: 768px) 100vw, 100px'
						className='max-h-14 w-auto object-contain'
					/>
				</div>
				<p className='text-sm uppercase leading-[140%] max-w-40.5'>
					Ассоциация деревянного домостроения
				</p>
			</div>
		</div>
	);
}
