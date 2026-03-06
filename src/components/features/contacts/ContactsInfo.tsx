import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { EmailIcon, MarkerIcon, PhoneIcon } from '@/components/ui/Icons';
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
					<div className='flex gap-4'>
						<Link
							href='#'
							className='flex h-12 w-12 items-center justify-center rounded bg-white text-brown transition-colors hover:bg-brown hover:text-white'
						>
							<svg
								width='32'
								height='32'
								viewBox='0 0 32 32'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='h-8 w-8'
							>
								<path
									d='M16 18.8C14.5 18.8 13.2 17.6 13.2 16C13.2 14.5 14.4 13.2 16 13.2C17.5 13.2 18.8 14.4 18.8 16C18.8 17.5 17.5 18.8 16 18.8Z'
									fill='currentColor'
								/>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M19.4 9.2H12.6C11.8 9.3 11.4 9.4 11.1 9.5C10.7 9.6 10.4 9.8 10.1 10.1C9.86261 10.3374 9.75045 10.5748 9.61489 10.8617C9.57916 10.9373 9.5417 11.0166 9.5 11.1C9.48453 11.1464 9.46667 11.1952 9.44752 11.2475C9.34291 11.5333 9.2 11.9238 9.2 12.6V19.4C9.3 20.2 9.4 20.6 9.5 20.9C9.6 21.3 9.8 21.6 10.1 21.9C10.3374 22.1374 10.5748 22.2495 10.8617 22.3851C10.9374 22.4209 11.0165 22.4583 11.1 22.5C11.1464 22.5155 11.1952 22.5333 11.2475 22.5525C11.5333 22.6571 11.9238 22.8 12.6 22.8H19.4C20.2 22.7 20.6 22.6 20.9 22.5C21.3 22.4 21.6 22.2 21.9 21.9C22.1374 21.6626 22.2495 21.4252 22.3851 21.1383C22.4209 21.0626 22.4583 20.9835 22.5 20.9C22.5155 20.8536 22.5333 20.8048 22.5525 20.7525C22.6571 20.4667 22.8 20.0762 22.8 19.4V12.6C22.7 11.8 22.6 11.4 22.5 11.1C22.4 10.7 22.2 10.4 21.9 10.1C21.6626 9.86261 21.4252 9.75045 21.1383 9.61488C21.0627 9.57918 20.9833 9.54167 20.9 9.5C20.8536 9.48453 20.8048 9.46666 20.7525 9.44752C20.4667 9.3429 20.0762 9.2 19.4 9.2ZM16 11.7C13.6 11.7 11.7 13.6 11.7 16C11.7 18.4 13.6 20.3 16 20.3C18.4 20.3 20.3 18.4 20.3 16C20.3 13.6 18.4 11.7 16 11.7ZM21.4 11.6C21.4 12.1523 20.9523 12.6 20.4 12.6C19.8477 12.6 19.4 12.1523 19.4 11.6C19.4 11.0477 19.8477 10.6 20.4 10.6C20.9523 10.6 21.4 11.0477 21.4 11.6Z'
									fill='currentColor'
								/>
							</svg>
						</Link>
						<Link
							href='#'
							className='flex h-12 w-12 items-center justify-center rounded bg-white text-brown transition-colors hover:bg-brown hover:text-white'
						>
							<svg
								width='32'
								height='32'
								viewBox='0 0 32 32'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='h-8 w-8'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M16.6919 12.0074C15.2589 12.6034 12.3949 13.8371 8.09992 15.7083C7.40248 15.9856 7.03714 16.257 7.00388 16.5223C6.94767 16.9706 7.50915 17.1472 8.27374 17.3876C8.37774 17.4203 8.4855 17.4542 8.59598 17.4901C9.34822 17.7346 10.3601 18.0207 10.8862 18.0321C11.3633 18.0424 11.8959 17.8457 12.4839 17.4419C16.4968 14.7331 18.5683 13.3639 18.6983 13.3344C18.7901 13.3136 18.9172 13.2874 19.0034 13.3639C19.0895 13.4405 19.0811 13.5855 19.0719 13.6244C19.0163 13.8615 16.8123 15.9106 15.6717 16.971C15.3161 17.3015 15.0639 17.536 15.0124 17.5896C14.8969 17.7096 14.7791 17.823 14.666 17.9321C13.9672 18.6058 13.4431 19.111 14.695 19.936C15.2967 20.3325 15.7781 20.6603 16.2584 20.9874C16.7829 21.3446 17.306 21.7009 17.9829 22.1446C18.1554 22.2576 18.3201 22.375 18.4805 22.4894C19.0909 22.9246 19.6393 23.3155 20.3168 23.2532C20.7105 23.217 21.1172 22.8468 21.3237 21.7427C21.8118 19.1335 22.7712 13.4801 22.9929 11.1505C23.0123 10.9464 22.9879 10.6851 22.9683 10.5705C22.9486 10.4558 22.9076 10.2924 22.7586 10.1715C22.582 10.0283 22.3095 9.99805 22.1877 10.0001C21.6335 10.01 20.7834 10.3056 16.6919 12.0074Z'
									fill='currentColor'
								/>
							</svg>
						</Link>
						<Link
							href='#'
							className='flex h-12 w-12 items-center justify-center rounded bg-white text-brown transition-colors hover:bg-brown hover:text-white'
						>
							<svg
								width='32'
								height='32'
								viewBox='0 0 32 32'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='h-8 w-8'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M12.6 21.7C13.6 22.3 14.8 22.6 16 22.6C19.7 22.6 22.6 19.6 22.6 16.1C22.6 14.3 22 12.7 20.7 11.4C19.4 10.2 17.8 9.5 16 9.5C12.4 9.5 9.39999 12.5 9.39999 16.1C9.39999 17.3 9.7 18.5 10.4 19.6L10.6 19.9L9.89999 22.3L12.4 21.6L12.6 21.7ZM18.2 17C18.4 17 19.4 17.5 19.6 17.6C19.6311 17.6156 19.6623 17.6287 19.6931 17.6417C19.8599 17.7121 20.0156 17.7779 20.1 18.2C20.2 18.2 20.2 18.6 20 19.1C19.9 19.5 19.1 20 18.7 20C18.6322 20 18.5673 20.0057 18.498 20.0119C18.1582 20.0419 17.712 20.0814 16.3 19.5C14.5475 18.799 13.3325 17.0999 12.9913 16.6228C12.9431 16.5554 12.9124 16.5124 12.9 16.5C12.883 16.466 12.8485 16.4116 12.8031 16.3399C12.5819 15.9906 12.1 15.2297 12.1 14.4C12.1 13.4 12.6 12.9 12.8 12.7C13 12.5 13.2 12.5 13.3 12.5H13.7C13.8 12.5 14 12.5 14.1 12.8C14.3 13.2 14.7 14.2 14.7 14.3C14.7 14.3333 14.7111 14.3667 14.7222 14.4C14.7445 14.4667 14.7667 14.5333 14.7 14.6C14.65 14.65 14.625 14.7 14.6 14.75C14.575 14.8 14.55 14.85 14.5 14.9L14.2 15.2C14.1 15.3 14 15.4 14.1 15.6C14.2 15.8 14.6 16.5 15.2 17C15.8751 17.5907 16.4078 17.8254 16.6778 17.9443C16.7278 17.9663 16.7688 17.9844 16.8 18C17 18 17.1 18 17.2 17.9C17.25 17.8 17.375 17.65 17.5 17.5C17.625 17.35 17.75 17.2 17.8 17.1C17.9 16.9 18 16.9 18.2 17Z'
									fill='currentColor'
								/>
							</svg>
						</Link>
						<Link
							href='#'
							className='flex h-12 w-12 items-center justify-center rounded bg-white text-brown transition-colors hover:bg-brown hover:text-white'
						>
							<svg
								width='32'
								height='32'
								viewBox='0 0 32 32'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='h-8 w-8'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M9.12 9.12C8 10.2507 8 12.0587 8 15.68V16.32C8 19.936 8 21.744 9.12 22.88C10.2507 24 12.0587 24 15.68 24H16.32C19.936 24 21.744 24 22.88 22.88C24 21.7493 24 19.9413 24 16.32V15.68C24 12.064 24 10.256 22.88 9.12C21.7493 8 19.9413 8 16.32 8H15.68C12.064 8 10.256 8 9.12 9.12Z'
									fill='currentColor'
								/>
								<path
									d='M16.512 19.5253C12.864 19.5253 10.784 17.0293 10.6987 12.8693H12.5333C12.592 15.92 13.936 17.2107 15.0027 17.4773V12.8693H16.7253V15.4987C17.776 15.3867 18.8853 14.1867 19.2587 12.864H20.976C20.836 13.5487 20.5563 14.1971 20.1543 14.7688C19.7524 15.3405 19.2369 15.8232 18.64 16.1867C19.3061 16.5182 19.8943 16.9872 20.366 17.5627C20.8376 18.1382 21.1818 18.8071 21.376 19.5253H19.4827C19.0773 18.2613 18.064 17.28 16.7253 17.1467V19.5253H16.512Z'
									fill='currentColor'
								/>
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
