'use client';

import { JSX, useEffect, useState } from 'react';

import { CloseIcon, MaxIcon, PhoneIcon, TelegramIcon } from '@/components/ui/Icons';

import { SITE_CONFIG } from '@/config/site.config';

import { cn } from '@/lib/utils';

type FloatingFeedbackVariant = 'phone' | 'max' | 'telegram';

type FloatingFeedbackItem = {
	key: FloatingFeedbackVariant;
	ariaLabel: string;
	bgClassName: string;
	iconClassName: string;
	Icon: ({ className }: { className?: string }) => JSX.Element;
	href: string;
	isExternal?: boolean;
};

const ITEMS: FloatingFeedbackItem[] = [
	{
		key: 'phone',
		ariaLabel: 'Открыть телефон для звонка',
		bgClassName: 'bg-brown',
		iconClassName: 'text-white',
		Icon: PhoneIcon,
		href: SITE_CONFIG.contacts.phone.href
	},
	{
		key: 'max',
		ariaLabel: 'Открыть MAX',
		bgClassName: 'bg-[#7A3FF2]',
		iconClassName: 'text-white',
		Icon: MaxIcon,
		href: SITE_CONFIG.contacts.socials.max,
		isExternal: true
	},
	{
		key: 'telegram',
		ariaLabel: 'Открыть Telegram',
		bgClassName: 'bg-[#0088CC]',
		iconClassName: 'text-white',
		Icon: TelegramIcon,
		href: SITE_CONFIG.contacts.socials.telegram,
		isExternal: true
	}
];

export function FloatingFeedbackButton() {
	const [isExpanded, setIsExpanded] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (isExpanded) return;

		const id = window.setInterval(() => {
			setActiveIndex(prev => (prev + 1) % ITEMS.length);
		}, 2500);

		return () => window.clearInterval(id);
	}, [isExpanded]);

	const activeItem = ITEMS[activeIndex] ?? ITEMS[0];

	return (
		<div className='fixed bottom-5 right-4 z-1 md:bottom-8 md:right-6'>
			<div className='flex flex-col items-end gap-3'>
				<div className='flex flex-col items-end gap-3'>
					{ITEMS.map((item, index) => {
						const Icon = item.Icon;

						return (
							<a
								key={item.key}
								href={item.href}
								target={item.isExternal ? '_blank' : undefined}
								rel={item.isExternal ? 'noreferrer' : undefined}
								aria-label={item.ariaLabel}
								title={item.ariaLabel}
								onClick={() => setIsExpanded(false)}
								className={cn(
									'relative grid h-12 w-12 place-items-center rounded-full shadow-lg ring-1 ring-black/5 cursor-pointer md:h-14 md:w-14',
									'transition-[opacity,transform,box-shadow] duration-300',
									'hover:shadow-xl hover:scale-[1.04] active:scale-[0.98]',
									'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige focus-visible:ring-offset-2 focus-visible:ring-offset-white',
									'motion-reduce:transition-none',
									item.bgClassName,
									isExpanded ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0'
								)}
								style={{
									transitionDelay: isExpanded ? `${(ITEMS.length - 1 - index) * 70}ms` : '0ms'
								}}
							>
								<Icon className={cn('h-5 w-5 md:h-6 md:w-6', item.iconClassName)} />
							</a>
						);
					})}
				</div>

				<button
					type='button'
					aria-label={isExpanded ? 'Скрыть способы связи' : 'Открыть способы связи'}
					onClick={() => setIsExpanded(prev => !prev)}
					title={isExpanded ? 'Скрыть способы связи' : 'Открыть способы связи'}
					className={cn(
						'cursor-pointer relative grid h-12 w-12 place-items-center rounded-full shadow-lg ring-1 ring-black/5 transition-[background-color,transform,box-shadow] duration-500 md:h-14 md:w-14',
						'hover:shadow-xl hover:scale-[1.04] active:scale-[0.98]',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige focus-visible:ring-offset-2 focus-visible:ring-offset-white',
						'motion-reduce:transition-none',
						isExpanded ? 'bg-brown text-white' : activeItem.bgClassName
					)}
				>
					<span className='relative h-6 w-6'>
						<span
							aria-hidden
							className={cn(
								'absolute inset-0 grid place-items-center transition-[opacity,transform] duration-300',
								'motion-reduce:transition-none',
								isExpanded ? 'opacity-100 rotate-0' : 'opacity-0  -rotate-45'
							)}
						>
							<CloseIcon className='h-5 w-5 md:h-6 md:w-6' />
						</span>

						<span
							aria-hidden
							className={cn(
								'absolute inset-0 transition-[opacity,transform] duration-300',
								'motion-reduce:transition-none',
								isExpanded ? 'opacity-0 scale-75 rotate-45' : 'opacity-100 scale-100 rotate-0'
							)}
						>
							<span className='relative h-6 w-6 block'>
								{ITEMS.map((item, index) => {
									const Icon = item.Icon;
									const isActive = index === activeIndex;

									return (
										<span
											key={item.key}
											className={cn(
												'absolute inset-0 grid place-items-center transition-[opacity,transform]',
												'motion-reduce:transition-none',
												isActive ? 'duration-500 ease-out' : 'duration-150 ease-in',
												isActive ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-45'
											)}
										>
											<Icon className={cn('h-6 w-6', item.iconClassName)} />
										</span>
									);
								})}
							</span>
						</span>
					</span>
				</button>
			</div>
		</div>
	);
}
