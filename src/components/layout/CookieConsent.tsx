'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';

import { acceptAll, rejectAll, savePreferences } from '@/lib/cookies/consent';
import { cn } from '@/lib/utils';
import type { CookieConsentPreferences } from '@/types/cookies.types';

export function CookieConsent({
	className,
	initialConsent = null
}: {
	className?: string;
	initialConsent?: CookieConsentPreferences | null;
}) {
	const [visible, setVisible] = useState(() => !initialConsent);
	const [analytics, setAnalytics] = useState(() => initialConsent?.analytics ?? true);
	const [marketing, setMarketing] = useState(() => initialConsent?.marketing ?? true);
	const [expanded, setExpanded] = useState(false);

	if (!visible) return null;

	return (
		<div
			className={cn(
				'fixed bottom-0 left-0 right-0 z-2147483647 pointer-events-auto isolate',
				'bg-light-gray border-t border-light-beige',
				'px-4 py-3 md:px-6 md:py-4',
				className
			)}
		>
			{/* <div className='container'> */}
			<div className='flex flex-row md:items-center justify-center gap-3'>
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
					{/* <button
							type='button'
							className='mt-2 text-brown underline underline-offset-2 hover:text-beige transition-colors'
							onClick={() => setExpanded(v => !v)}
							aria-expanded={expanded}
						>
							{expanded ? 'Скрыть настройки' : 'Настроить'}
						</button> */}
					{/* {expanded && (
							<div className='mt-2 flex flex-col gap-2'>
								<label className='flex items-center gap-2 text-main'>
									<input
										type='checkbox'
										checked={analytics}
										onChange={e => setAnalytics(e.target.checked)}
										className='h-4 w-4 rounded border-light-beige text-beige focus:ring-beige'
									/>
									<span className='text-xs'>Аналитические cookie</span>
								</label>
								<label className='flex items-center gap-2 text-main'>
									<input
										type='checkbox'
										checked={marketing}
										onChange={e => setMarketing(e.target.checked)}
										className='h-4 w-4 rounded border-light-beige text-beige focus:ring-beige'
									/>
									<span className='text-xs'>Маркетинговые cookie</span>
								</label>
							</div>
						)} */}
				</div>

				<div className='flex items-center gap-2 md:gap-3'>
					{/* <Button
							variant='outline'
							size='sm'
							type='button'
							onClick={() => {
								rejectAll();
								setVisible(false);
							}}
						>
							Отклонить
						</Button> */}
					<Button
						variant='secondary'
						size='sm'
						type='button'
						className='bg-green-700 text-white'
						onClick={() => {
							acceptAll();
							setVisible(false);
						}}
					>
						Принять
					</Button>
					{/* <Button
							variant='default'
							size='sm'
							type='button'
							onClick={() => {
								savePreferences({ analytics, marketing });
								setVisible(false);
							}}
						>
							Сохранить
						</Button> */}
				</div>
			</div>
		</div>
		// </div>
	);
}
