import Image from 'next/image';

import { Title } from '@/components/ui/Title';

import { SITE_CONFIG } from '@/config/site.config';

export function AltayAbout() {
	return (
		<section className='py-16 md:py-20 lg:py-25 bg-white'>
			<div className='container'>
				<div className='grid grid-cols-1 items-center gap-10 xl:grid-cols-2 xl:gap-16'>
					<div className='relative order-2 aspect-4/3 overflow-hidden rounded-lg xl:order-1'>
						{/* TODO: заменить плейсхолдер на фото команды/объекта на Алтае */}
						<Image
							src='/images/about/work.jpg'
							alt='Строительство домов из клееного бруса «Крона Групп»'
							fill
							sizes='(max-width: 1280px) 100vw, 50vw'
							className='object-cover'
						/>
					</div>

					<div className='order-1 xl:order-2'>
						<Title
							as='h2'
							variant='h2'
							className='mb-6'
						>
							О компании «Крона Групп»
						</Title>
						<div className='mb-8 space-y-4 text-base text-main/80 md:text-lg'>
							<p>
								С 2009 года мы проектируем и строим дома, бани и коммерческие объекты из клееного
								бруса. За это время реализовали более 200 крупных проектов по всей России и СНГ.
							</p>
							<p>
								Работаем полным циклом: собственное производство клееного бруса, архитектурное
								проектирование и монтаж под ключ. Это гарантирует контроль качества на каждом этапе
								и предсказуемый результат — в том числе в удалённых локациях Алтая.
							</p>
						</div>

						<ul className='grid grid-cols-2 gap-5'>
							{SITE_CONFIG.advantages.map(item => (
								<li
									key={item.label}
									className='rounded-lg bg-light-beige p-5 md:p-6'
								>
									<div className='text-2xl font-bold text-brown md:text-3xl'>{item.number}</div>
									<div className='mt-1 text-sm text-main/70 md:text-base'>{item.label}</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
