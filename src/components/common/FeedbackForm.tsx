'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Title } from '@/components/ui/Title';

import { useFeedbackFormSubmit } from '@/hooks/useFeedbackFormSubmit';

import { HeaderThemeObserver } from '../layout/HeaderThemeObserver';
import { ViewportLazy } from '../layout/ViewportLazy';

import { cn } from '@/lib/utils';

const DynamicSmartCaptcha = dynamic(
	() => import('@/components/common/SmartCaptcha').then(mod => mod.SmartCaptcha),
	{ ssr: false }
);

const formSchema = z.object({
	name: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }),
	phone: z
		.string()
		.min(1, { message: 'Введите номер телефона' })
		.refine(
			value => {
				const digits = value.replace(/\D/g, '');
				return digits.length >= 10 && digits.length <= 15;
			},
			{ message: 'Введите корректный номер телефона (10-15 цифр)' }
		)
		.refine(value => /^[0-9+\-()\s]*$/.test(value), {
			message: 'Используйте только цифры и символы форматирования (+, -, пробел, скобки)'
		}),
	email: z.email({ message: 'Введите корректный email' }).optional().or(z.literal('')),
	message: z.string().optional(),
	accept: z.boolean().refine(v => v, { message: 'Необходимо согласиться с условиями' })
});

type FormValues = z.infer<typeof formSchema>;

interface FeedbackFormProps {
	title?: string;
	text?: string;
	className?: string;
	formId?: number;
	variant?: 'section' | 'modal';
	showHeading?: boolean;
	showMessageField?: boolean;
	onSuccess?: () => void;
}

export function FeedbackForm({
	className,
	title = 'Остались вопросы?',
	text = 'Заполните форму заявки, и наш специалист свяжется с вами в ближайшее время',
	formId,
	variant = 'section',
	showHeading = true,
	showMessageField = true,
	onSuccess
}: FeedbackFormProps) {
	const [captchaToken, setCaptchaToken] = useState<string | null>(null);
	const [captchaVisible, setCaptchaVisible] = useState(false);
	const [captchaKey, setCaptchaKey] = useState(0);
	const { mutateAsync: submitFeedback, isPending } = useFeedbackFormSubmit();
	const [pendingData, setPendingData] = useState<FormValues | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			phone: '',
			email: '',
			message: '',
			accept: false
		}
	});

	const resolvedFormId =
		typeof formId === 'number' && Number.isFinite(formId) && formId > 0 ? formId : undefined;

	const send = async (data: FormValues, token: string) => {
		await submitFeedback({
			name: data.name,
			phone: data.phone,
			email: data.email,
			message: data.message,
			captchaToken: token,
			formId: resolvedFormId
		});
	};

	const onCaptchaTokenChange = async (token: string | null) => {
		setCaptchaToken(token);
		if (!token) {
			return;
		}

		if (!pendingData) {
			return;
		}

		setPendingData(null);
		setCaptchaVisible(false);

		try {
			await send(pendingData, token);
			reset();
			setCaptchaToken(null);
			setCaptchaKey(key => key + 1);
			toast.success('Спасибо! Мы свяжемся с вами в ближайшее время.');
			onSuccess?.();
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Не удалось отправить форму';
			toast.error(message);
			setCaptchaToken(null);
			setCaptchaKey(key => key + 1);
		}
	};

	const onSubmit = async (data: FormValues) => {
		if (!captchaToken) {
			setPendingData(data);
			setCaptchaVisible(true);
			return;
		}

		try {
			await send(data, captchaToken);
			reset();
			setCaptchaToken(null);
			setCaptchaKey(key => key + 1);
			toast.success('Спасибо! Мы свяжемся с вами в ближайшее время.');
			onSuccess?.();
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Не удалось отправить форму';
			toast.error(message);
			setCaptchaToken(null);
			setCaptchaKey(key => key + 1);
		}
	};

	const { onChange: onPhoneChange, ...phoneProps } = register('phone');

	const heading = showHeading ? (
		<div className={cn(variant === 'section' ? 'xl:w-1/2 mb-7 md:mb-0' : 'mb-4')}>
			<Title
				as='h2'
				variant='h2'
				className={cn(variant === 'section' ? 'mb-6 md:mb-7.5' : 'mb-3')}
			>
				{title}
			</Title>
			<p className={cn('text-base md:text-lg text-brown', variant === 'section' && 'max-w-125')}>
				{text}
			</p>
		</div>
	) : null;

	const form = (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn('flex flex-col gap-4 md:gap-5', variant === 'section' ? 'flex-1' : 'w-full')}
		>
			<div className={cn('flex flex-col', variant === 'modal' ? 'gap-3' : 'gap-4 md:gap-5')}>
				<div>
					<Input
						label='Имя*'
						placeholder='Имя*'
						{...register('name')}
						className={cn(variant === 'modal' && 'bg-light-beige', errors.name && 'border-red-500')}
					/>
					{errors.name && (
						<span className='text-red-700 text-sm mt-1 pl-2'>{errors.name.message}</span>
					)}
				</div>
				<div>
					<Input
						label='Телефон*'
						placeholder='Телефон*'
						type='tel'
						{...phoneProps}
						onChange={e => {
							e.target.value = e.target.value.replace(/[^0-9+\-()\s]/g, '');
							onPhoneChange(e);
						}}
						className={cn(
							variant === 'modal' && 'bg-light-beige',
							errors.phone && 'border-red-500'
						)}
					/>
					{errors.phone && (
						<span className='text-red-700 text-sm mt-1 pl-2'>{errors.phone.message}</span>
					)}
				</div>
				<div>
					<Input
						label='Электронная почта'
						placeholder='Электронная почта'
						type='email'
						{...register('email')}
						className={cn(variant === 'modal' && 'bg-light-beige', errors.name && 'border-red-500')}
					/>
					{errors.email && (
						<span className='text-red-700 text-sm mt-1 pl-2'>{errors.email.message}</span>
					)}
				</div>
				{showMessageField ? (
					<div>
						<Textarea
							label='Сообщение'
							placeholder='Сообщение'
							{...register('message')}
							className={cn(errors.message && 'border-red-500')}
						/>
						{errors.message && (
							<span className='text-red-700 text-sm mt-1 pl-2'>{errors.message.message}</span>
						)}
					</div>
				) : null}
			</div>
			<ViewportLazy
				rootMargin='300px'
				placeholder={<div className={cn(variant === 'modal' ? 'min-h-0.5 h-0.5' : '')} />}
			>
				<div className={cn(variant === 'modal' ? 'min-h-0.5 h-0.5 overflow-hidden' : '')}>
					<DynamicSmartCaptcha
						className='-mt-4 md:-mt-5'
						key={captchaKey}
						visible={captchaVisible}
						onChallengeHidden={() => setCaptchaVisible(false)}
						onTokenChange={onCaptchaTokenChange}
					/>
				</div>
			</ViewportLazy>
			<label className='flex place-items-center gap-2 text-sm text-main'>
				<input
					type='checkbox'
					className={cn(
						'h-4 w-4 rounded border-light-beige text-beige focus:ring-beige',
						errors.accept && 'outline outline-red-500'
					)}
					{...register('accept')}
				/>
				<span>
					Соглашаюсь с{' '}
					<Link
						target='_blank'
						rel='noopener noreferrer'
						href='/privacy-policy/'
						className='underline underline-offset-2 text-brown hover:text-beige transition-colors'
					>
						обработкой персональных данных
					</Link>{' '}
					и{' '}
					<Link
						target='_blank'
						rel='noopener noreferrer'
						href='/user-agreement/'
						className='underline underline-offset-2 text-brown hover:text-beige transition-colors'
					>
						условиями пользовательского соглашения
					</Link>
				</span>
			</label>
			{errors.accept && (
				<span className='text-red-700 text-sm pl-2 -mt-1'>{errors.accept.message}</span>
			)}
			<Button
				type='submit'
				disabled={isSubmitting || isPending}
				className='mt-2 md:mt-2.5 md:w-55'
			>
				{isSubmitting || isPending
					? 'Отправка...'
					: variant === 'modal'
						? 'Отправить'
						: 'Оставить заявку'}
			</Button>
			<p className='mt-3 text-xs font-light text-main leading-normal'>
				Сайт защищен Yandex SmartCaptcha, к нему применяются{' '}
				<Link
					href='https://yandex.ru/legal/smartcaptcha_notice/ru/?utm_source=smart-captcha&utm_medium=shield&utm_campaign=security'
					target='_blank'
					rel='noopener noreferrer'
					className='underline underline-offset-2 text-brown hover:text-beige transition-colors'
				>
					Политика конфиденциальности Яндекс
				</Link>
				.
			</p>
		</form>
	);

	if (variant === 'modal') {
		return (
			<div className={cn('w-full', className)}>
				{heading}
				<p className='text-base mb-10'>Наш специалист свяжется с Вами в ближайшее время.</p>
				{form}
			</div>
		);
	}

	return (
		<section className={cn('py-20 md:py-25 xl:py-37.5 bg-light-beige', className)}>
			<HeaderThemeObserver theme='light' />
			<div className='container'>
				<div className='flex flex-col md:gap-10 xl:flex-row xl:gap-5'>
					{heading}
					{form}
				</div>
			</div>
		</section>
	);
}
