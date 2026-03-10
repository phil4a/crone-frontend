'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Title } from '@/components/ui/Title';

const schema = z.object({
  name: z.string().min(2, { message: 'Имя должно быть не менее 2 символов' }),
  tel: z.string().min(10, { message: 'Введите корректный номер телефона' }),
  email: z.string().email({ message: 'Введите корректный email' }).optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

export function AboutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    console.log('Form data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Заявка отправлена!');
    reset();
  };

  return (
    <section id='form' className='py-20 md:py-30 lg:py-40 bg-white'>
      <div className='container'>
        <div className='max-w-4xl mx-auto text-center mb-10 md:mb-16'>
          <Title as='h2' variant='h2' className='mb-4 md:mb-6'>
            Закажите проект у нас!
          </Title>
          <p className='text-base md:text-lg text-dark-gray'>
            Заполните форму заявки, и мы вышлем вам презентацию
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
          <div className='relative'>
            <Input
              {...register('name')}
              placeholder='Имя*'
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <span className='absolute -bottom-5 left-0 text-xs text-red-500'>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className='relative'>
            <Input
              {...register('tel')}
              placeholder='Телефон*'
              type='tel'
              className={errors.tel ? 'border-red-500' : ''}
            />
            {errors.tel && (
              <span className='absolute -bottom-5 left-0 text-xs text-red-500'>
                {errors.tel.message}
              </span>
            )}
          </div>
          <div className='relative'>
            <Input
              {...register('email')}
              placeholder='E-mail'
              type='email'
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <span className='absolute -bottom-5 left-0 text-xs text-red-500'>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className='md:col-span-3 flex justify-center mt-6 md:mt-8'>
            <Button type='submit' size='lg' disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Получить презентацию'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
