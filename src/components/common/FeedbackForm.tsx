'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Title } from '@/components/ui/Title';

import { HeaderThemeObserver } from '../layout/HeaderThemeObserver';

import { cn } from '@/lib/utils';

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
	message: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export function FeedbackForm({ className }: { className?: string }) {
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
			message: ''
		}
	});

	const onSubmit = async (data: FormValues) => {
		// TODO: Implement API call
		console.log(data);
		await new Promise(resolve => setTimeout(resolve, 1000));
		reset();
		toast.success('Спасибо! Мы свяжемся с вами в ближайшее время.');
	};

	const { onChange: onPhoneChange, ...phoneProps } = register('phone');

	return (
		<section className={cn('py-20 md:py-25 xl:py-37.5 bg-light-beige', className)}>
			<HeaderThemeObserver theme='light' />
			<div className='container'>
				<div className='flex flex-col md:gap-10 xl:flex-row xl:gap-5'>
					<div className='xl:w-1/2 mb-7 md:mb-0'>
						<Title
							as='h2'
							variant='h2'
							className='mb-6 md:mb-7.5'
						>
							Остались вопросы?
						</Title>
						<p className='text-base md:text-lg text-brown max-w-125'>
							Заполните форму заявки, и наш специалист свяжется с вами в ближайшее время
						</p>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex-1 flex flex-col gap-4 md:gap-5'
					>
						<div>
							<Input
								label='Имя*'
								placeholder='Имя*'
								{...register('name')}
								className={cn(errors.name && 'border-red-500')}
							/>
							{errors.name && (
								<span className='text-red-500 text-sm mt-1 pl-2'>{errors.name.message}</span>
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
								className={cn(errors.phone && 'border-red-500')}
							/>
							{errors.phone && (
								<span className='text-red-500 text-sm mt-1 pl-2'>{errors.phone.message}</span>
							)}
						</div>

						<div>
							<Input
								label='Электронная почта'
								placeholder='Электронная почта'
								type='email'
								{...register('email')}
								className={cn(errors.email && 'border-red-500')}
							/>
							{errors.email && (
								<span className='text-red-500 text-sm mt-1 pl-2'>{errors.email.message}</span>
							)}
						</div>

						<div>
							<Textarea
								label='Сообщение'
								placeholder='Сообщение'
								{...register('message')}
								className={cn(errors.message && 'border-red-500')}
							/>
							{errors.message && (
								<span className='text-red-500 text-sm mt-1 pl-2'>{errors.message.message}</span>
							)}
						</div>

						<Button
							type='submit'
							disabled={isSubmitting}
							className='mt-2 md:mt-2.5 md:w-55'
						>
							{isSubmitting ? 'Отправка...' : 'Оставить заявку'}
						</Button>
					</form>
				</div>
			</div>
		</section>
	);
}
