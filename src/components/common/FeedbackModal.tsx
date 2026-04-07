'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { FeedbackForm } from '@/components/common/FeedbackForm';
import { Button, type ButtonProps } from '@/components/ui/Button';

import { useFeedbackModalStore } from '@/store/feedbackModal';

import { CloseIcon } from '../ui/Icons';

import { cn } from '@/lib/utils';

function getFocusableElements(container: HTMLElement) {
	const selector = [
		'a[href]',
		'button:not([disabled])',
		'textarea:not([disabled])',
		'input:not([disabled])',
		'select:not([disabled])',
		'[tabindex]:not([tabindex="-1"])'
	].join(',');

	return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
		element => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true'
	);
}

export function FeedbackModal() {
	const isOpen = useFeedbackModalStore(state => state.isOpen);
	const close = useFeedbackModalStore(state => state.close);

	const dialogRef = useRef<HTMLDivElement | null>(null);
	const previouslyFocusedRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isOpen) return;

		previouslyFocusedRef.current =
			document.activeElement instanceof HTMLElement ? document.activeElement : null;

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const frame = requestAnimationFrame(() => {
			const dialog = dialogRef.current;
			if (!dialog) return;
			const focusable = getFocusableElements(dialog);
			(focusable[0] ?? dialog).focus();
		});

		return () => {
			cancelAnimationFrame(frame);
			document.body.style.overflow = originalOverflow;
			previouslyFocusedRef.current?.focus();
		};
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				close();
				return;
			}

			if (event.key !== 'Tab') return;

			const dialog = dialogRef.current;
			if (!dialog) return;

			const focusable = getFocusableElements(dialog);
			if (focusable.length === 0) {
				event.preventDefault();
				dialog.focus();
				return;
			}

			const active = document.activeElement instanceof HTMLElement ? document.activeElement : null;
			const currentIndex = active ? focusable.indexOf(active) : -1;
			const lastIndex = focusable.length - 1;

			if (event.shiftKey) {
				if (currentIndex <= 0) {
					event.preventDefault();
					focusable[lastIndex]?.focus();
				}
				return;
			}

			if (currentIndex === -1 || currentIndex >= lastIndex) {
				event.preventDefault();
				focusable[0]?.focus();
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [close, isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const handlePointerDown = (event: MouseEvent | TouchEvent) => {
			const dialog = dialogRef.current;
			if (!dialog) return;

			const target = event.target;
			if (!(target instanceof Node)) return;

			if (!dialog.contains(target)) {
				close();
			}
		};

		document.addEventListener('mousedown', handlePointerDown, true);
		document.addEventListener('touchstart', handlePointerDown, true);
		return () => {
			document.removeEventListener('mousedown', handlePointerDown, true);
			document.removeEventListener('touchstart', handlePointerDown, true);
		};
	}, [close, isOpen]);

	if (!isOpen) return null;
	if (typeof document === 'undefined') return null;

	return createPortal(
		<div
			className='fixed inset-0 z-50 flex items-center justify-center p-4'
			role='dialog'
			aria-modal='true'
			aria-labelledby='feedback-modal-title'
		>
			<div className='absolute inset-0 bg-black/55' />
			<div
				ref={dialogRef}
				tabIndex={-1}
				className={cn(
					'relative w-full max-w-lg rounded-lg bg-white p-6 md:p-8 shadow-xl',
					'max-h-[calc(100vh-2rem)] overflow-auto'
				)}
			>
				<div className='flex items-start justify-between gap-4'>
					<h2
						id='feedback-modal-title'
						className='text-2xl md:text-3xl font-extrabold text-main'
					>
						Оставить заявку
					</h2>
					<button
						type='button'
						onClick={close}
						aria-label='Закрыть'
						className='shrink-0 rounded-sm cursor-pointer bg-light-beige p-2.5 text-brown hover:text-beige transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-beige'
					>
						<CloseIcon />
					</button>
				</div>

				<div className='mt-5'>
					<FeedbackForm
						variant='modal'
						showHeading={false}
						showMessageField={false}
						formId={223}
						onSuccess={close}
					/>
				</div>
			</div>
		</div>,
		document.body
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
