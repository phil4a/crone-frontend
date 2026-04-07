'use client';

import { FeedbackForm } from '@/components/common/FeedbackForm';
import { Button, type ButtonProps } from '@/components/ui/Button';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/Dialog';

import { useFeedbackModalStore } from '@/store/feedbackModal';

import { CloseIcon } from '../ui/Icons';

export function FeedbackModal() {
	const isOpen = useFeedbackModalStore(state => state.isOpen);
	const open = useFeedbackModalStore(state => state.open);
	const close = useFeedbackModalStore(state => state.close);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={nextOpen => {
				if (nextOpen) {
					open();
				} else {
					close();
				}
			}}
		>
			<DialogContent className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100vh-2rem)] overflow-y-auto'>
				<div className='flex items-start justify-between gap-4'>
					<DialogTitle>Оставить заявку</DialogTitle>
					<DialogClose asChild>
						<button
							type='button'
							aria-label='Закрыть'
							className='shrink-0 rounded-sm cursor-pointer bg-light-beige p-2.5 text-brown hover:text-beige transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-beige'
						>
							<CloseIcon />
						</button>
					</DialogClose>
				</div>

				<div className='mt-1'>
					<FeedbackForm
						variant='modal'
						showHeading={false}
						showMessageField={false}
						formId={223}
						onSuccess={close}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export function FeedbackModalTrigger({
	children,
	onClick,
	...props
}: Omit<ButtonProps, 'type'> & { children: React.ReactNode }) {
	const open = useFeedbackModalStore(state => state.open);

	return (
		<Button
			type='button'
			{...props}
			onClick={event => {
				onClick?.(event);
				open();
			}}
		>
			{children}
		</Button>
	);
}
