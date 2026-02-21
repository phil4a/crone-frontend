'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { EmailIcon, PhoneIcon, TelegramIcon, WhatsappIcon } from '@/components/ui/Icons';
import { Logo } from '@/components/ui/Logo';

import { MAIN_MENU } from '@/config/navigation.config';
import { SITE_CONFIG } from '@/config/site.config';

import { useHeaderStore } from '@/store/header';

import { cn } from '@/lib/utils';

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const { theme } = useHeaderStore();

	const HEADER_TRANSITION_DURATION = 600;

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		// Check initial scroll
		handleScroll();

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close menu on route change
	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	// Determine styles based on theme and state
	const isLightTheme = theme === 'light';
	const isDarkOrTransparent = theme === 'dark' || theme === 'transparent';

	// Background logic
	// 1. Menu Open -> White
	// 2. Light Theme (White Section) -> White
	// 3. Dark/Transparent Theme:
	//    - Scrolled -> Blurred Dark
	//    - Top -> Transparent
	const bgClass = (() => {
		if (isMenuOpen) return 'bg-white';
		if (isLightTheme) return 'bg-white shadow-[0px_5px_16px_0px_rgba(241,236,231,0.4)]';
		if (isScrolled) return 'bg-black/15 backdrop-blur-[4px]';
		return 'bg-transparent';
	})();

	// Text Color Logic
	// Light Theme or Menu Open -> Main (Dark) Color
	// Dark/Transparent Theme -> White Color
	const isDarkText = isMenuOpen || isLightTheme;
	const textColorClass = isDarkText ? 'text-brown' : 'text-white';
	const linkColorClass = isDarkText ? 'text-main' : 'text-white';
	const hoverColorClass = isDarkText ? 'hover:text-beige' : 'hover:text-beige';

	// Logo Color
	const logoColorClass = isDarkText ? 'text-brown' : 'text-white';

	return (
		<header
			className={cn(
				'fixed left-0 top-0 z-2 w-full transition-all duration-500',
				bgClass,
				isScrolled ? 'py-2' : 'py-5 md:py-5'
				// Override padding if menu is open to match design if needed,
				// but usually menu open keeps current padding or fixed.
				// Let's keep scroll logic for padding.
			)}
		>
			<div
				className={cn(
					'container flex items-center justify-between gap-7.5 transition-[padding] duration-300'
				)}
			>
				<Link
					href='/'
					className='group relative z-3 shrink-0'
				>
					<Logo className={cn('w-40.5 transition-colors duration-300 xl:w-62.5', logoColorClass)} />
				</Link>

				<div className='hidden md:flex flex-1 xl:hidden gap-8 justify-end'>
					<Link
						href={SITE_CONFIG.contacts.email.href}
						className={cn(
							'group flex items-center gap-2.5 transition-colors text-sm font-bold',
							textColorClass,
							hoverColorClass
						)}
					>
						<EmailIcon className='transition-colors group-hover:text-beige' />
						<span className='hidden 2xl:inline text-nowrap'>
							{SITE_CONFIG.contacts.email.label}
						</span>
					</Link>

					<Link
						href={SITE_CONFIG.contacts.phone.href}
						className={cn(
							'group flex items-center gap-2.5 transition-colors text-sm font-bold',
							textColorClass,
							hoverColorClass
						)}
					>
						<PhoneIcon className='transition-colors group-hover:text-beige' />
						<span className='hidden 2xl:inline text-nowrap'>
							{SITE_CONFIG.contacts.phone.label}
						</span>
					</Link>

					<Link
						href={SITE_CONFIG.contacts.socials.telegram}
						className={cn('transition-colors', textColorClass, hoverColorClass)}
					>
						<TelegramIcon />
					</Link>

					<Link
						href={SITE_CONFIG.contacts.socials.whatsapp}
						className={cn('transition-colors', textColorClass, hoverColorClass)}
					>
						<WhatsappIcon />
					</Link>
				</div>
				{/* Mobile Menu Button */}
				<div className='xl:hidden z-5 bg-beige h-11 w-11 flex items-center justify-center rounded-lg'>
					<button
						type='button'
						className={cn('relative h-4.5 w-6 cursor-pointer', isMenuOpen && 'menu-open')}
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<span
							className={cn(
								'absolute left-0 top-[calc(50%-1px)] h-0.5 w-full bg-white transition-all duration-300',
								isMenuOpen && 'scale-0'
							)}
						/>
						<span
							className={cn(
								'absolute left-0 top-0 h-0.5 w-full bg-white transition-all duration-300',
								isMenuOpen && 'top-[calc(50%-1px)] rotate-45'
							)}
						/>
						<span
							className={cn(
								'absolute bottom-0 left-0 h-0.5 w-full bg-white transition-all duration-300',
								isMenuOpen && 'bottom-[calc(50%-1px)] -rotate-45'
							)}
						/>
					</button>
				</div>

				{/* Navigation & Actions */}
				<div
					className={cn(
						'fixed inset-0 z-2 flex flex-col bg-white px-5 md:px-10 pt-25 pb-5 transition-transform duration-300 xl:static xl:flex xl:flex-1 xl:h-auto xl:w-auto xl:translate-x-0 xl:flex-row xl:items-center xl:justify-between xl:gap-7.5 xl:bg-transparent xl:p-0',
						!isMenuOpen && 'translate-x-full'
					)}
				>
					<nav className='mb-10 xl:mb-0 xl:grow'>
						<ul className='flex flex-col gap-6 xl:flex-row xl:gap-8 justify-center'>
							{MAIN_MENU.map(item => (
								<li key={item.href}>
									<Link
										href={item.href}
										className={cn(
											'relative text-lg font-medium uppercase transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-beige after:transition-[width] hover:after:w-full xl:text-base text-nowrap',
											linkColorClass,
											hoverColorClass
										)}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className='flex flex-1 flex-col gap-7.5 xl:flex-row xl:items-center 2xl:gap-8 justify-end xl:grow-0'>
						<Link
							href={SITE_CONFIG.contacts.email.href}
							className={cn(
								'group flex items-center gap-2.5 transition-colors text-sm font-bold',
								textColorClass,
								hoverColorClass
							)}
						>
							<EmailIcon className='transition-colors group-hover:text-beige' />
							<span className='inline xl:hidden 2xl:inline text-nowrap'>
								{SITE_CONFIG.contacts.email.label}
							</span>
						</Link>

						<Link
							href={SITE_CONFIG.contacts.phone.href}
							className={cn(
								'group flex items-center gap-2.5 transition-colors text-sm font-bold',
								textColorClass,
								hoverColorClass
							)}
						>
							<PhoneIcon className='transition-colors group-hover:text-beige' />
							<span className='inline xl:hidden 2xl:inline text-nowrap'>
								{SITE_CONFIG.contacts.phone.label}
							</span>
						</Link>

						<div className='flex items-center gap-6 xl:gap-4'>
							<Link
								href={SITE_CONFIG.contacts.socials.telegram}
								className={cn('transition-colors', textColorClass, hoverColorClass)}
							>
								<TelegramIcon />
							</Link>
							<Link
								href={SITE_CONFIG.contacts.socials.whatsapp}
								className={cn('transition-colors', textColorClass, hoverColorClass)}
							>
								<WhatsappIcon />
							</Link>
						</div>

						<Button
							className={cn(
								'mt-0 xl:w-auto',
								!isMenuOpen && !isLightTheme && !isScrolled && 'hidden xl:flex'
							)}
						>
							Оставить заявку
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
