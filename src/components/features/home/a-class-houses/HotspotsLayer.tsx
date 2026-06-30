'use client';

import { Popover } from '@base-ui/react/popover';
import { X } from 'lucide-react';
import { useState } from 'react';

type Hotspot = {
	id: string;
	x: number;
	y: number;
	title: string;
	text: string;
	side?: 'top' | 'right' | 'bottom' | 'left';
};

export function HotspotsLayer({
	hotspots,
	className = ''
}: {
	hotspots: Hotspot[];
	className?: string;
}) {
	const [openId, setOpenId] = useState<string | null>(null);

	return (
		<div className={`absolute inset-0 ${className}`}>
			{hotspots.map(h => (
				<Popover.Root
					key={h.id}
					open={openId === h.id}
					onOpenChange={open => setOpenId(open ? h.id : null)}
				>
					<Popover.Trigger
						aria-label={h.title}
						className='group absolute z-1 -translate-x-1/2 -translate-y-1/2 outline-none'
						style={{ left: `${h.x}%`, top: `${h.y}%` }}
					>
						<span className='absolute -inset-3' />

						<span className='relative flex h-5 w-5 items-center justify-center sm:h-6 sm:w-6'>
							<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60' />
							<span
								className={[
									'relative inline-flex h-4 w-4 rounded-full cursor-pointer ring-2 ring-white/80 transition-all sm:h-5 sm:w-5',
									'bg-amber-500 shadow-[0_0_0_4px_rgba(0,0,0,0.15)]',
									'group-hover:scale-110',
									openId === h.id ? 'scale-110 bg-amber-600' : ''
								].join(' ')}
							/>
						</span>
					</Popover.Trigger>

					<Popover.Portal>
						<Popover.Positioner
							side={h.side ?? 'top'}
							sideOffset={12}
							collisionPadding={16}
							align='center'
							className='z-2'
						>
							<Popover.Popup className='popover-content w-[min(86vw,320px)] rounded-xl border border-neutral-200 bg-white p-4 text-neutral-900 shadow-xl'>
								<div className='flex items-start justify-between gap-3'>
									<Popover.Title className='text-lg font-semibold leading-snug text-brown lg:text-base'>
										{h.title}
									</Popover.Title>
									<Popover.Close
										aria-label='Закрыть'
										className='-mr-1 -mt-1 shrink-0 rounded-full p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700'
									>
										<X
											size={16}
											className='cursor-pointer'
										/>
									</Popover.Close>
								</div>
								<Popover.Description className='mt-1.5 text-sm leading-relaxed text-neutral-600'>
									{h.text}
								</Popover.Description>

								<Popover.Arrow className='fill-white' />
							</Popover.Popup>
						</Popover.Positioner>
					</Popover.Portal>
				</Popover.Root>
			))}
		</div>
	);
}
