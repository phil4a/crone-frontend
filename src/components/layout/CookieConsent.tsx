'use client';

import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/Button';

import { acceptAll, loadConsent } from '@/lib/cookies/consent';
import { cn } from '@/lib/utils';
import type { CookieConsentPreferences } from '@/types/cookies.types';

function subscribeConsent(onStoreChange: () => void): () => void {
	if (typeof window === 'undefined') {
		return () => {};
	}

	const handler = () => {
		onStoreChange();
	};

	window.addEventListener('storage', handler);
	window.addEventListener('crone-cookie-consent', handler);

	return () => {
		window.removeEventListener('storage', handler);
		window.removeEventListener('crone-cookie-consent', handler);
	};
}

export function CookieConsent({
	className,
	initialConsent = null
}: {
	className?: string;
	initialConsent?: CookieConsentPreferences | null;
}) {
	const isHydrated = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false
	);

	const consent = useSyncExternalStore(
		subscribeConsent,
		() => (loadConsent() ? '1' : ''),
		() => (initialConsent ? '1' : '')
	);
	const [dismissed, setDismissed] = useState(false);

	if (!isHydrated) {
		return <div suppressHydrationWarning />;
	}

	if (dismissed || consent) return null;

	return (
		<div
			className={cn(
				'fixed bottom-2 left-[5%] right-0 z-1 pointer-events-auto isolate max-w-9/10 rounded-xl',
				'bg-light-gray border-t border-light-beige',
				'px-4 py-3 md:bottom-0 md:left-0 md:px-6 md:py-4 md:max-w-full md:rounded-none',
				className
			)}
		>
			<div className='flex flex-row items-start md:items-center justify-center gap-3'>
				<div className='text-xs text-main md:max-w-[60%]'>
					<p>
						Мы используем файлы cookie для персонализации сервисов и измерения аудитории. Вы можете
						запретить обработку cookie в настройках браузера.{' '}
						<Link
							href='/cookies-policy/'
							target='_blank'
							className='underline underline-offset-2 text-brown hover:text-beige transition-colors'
						>
							Ознакомьтесь с политикой использования cookie
						</Link>
						.
					</p>
				</div>

				<div className='flex items-center gap-2 md:gap-3'>
					<Button
						variant='secondary'
						size='sm'
						type='button'
						className='px-2 bg-green-700 text-white md:px-4'
						onClick={() => {
							acceptAll();
							window.dispatchEvent(new Event('crone-cookie-consent'));
							setDismissed(true);
						}}
					>
						Принять
					</Button>
				</div>
			</div>
		</div>
	);
}
