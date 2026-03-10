import Image from 'next/image';

import { Title } from '@/components/ui/Title';

import { SITE_CONFIG } from '@/config/site.config';

export function AboutAchievements() {
	return (
		<section className='py-0 md:py-25'>
			<div className='container px-0 lg:px-10'>
				<div className='relative bg-light-beige pt-21 pb-35 px-5 md:p-10 lg:rounded-lg'>
					<Title
						as='h2'
						variant='h3'
						className='text-brown mb-8'
					>
						Достижения в цифрах
					</Title>

					<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
						{SITE_CONFIG.achievements.map((item, index) => (
							<li
								key={index}
								className='flex flex-col py-8.5 md:py-21 px-10 rounded-lg bg-[#f8f5f2] z-1'
							>
								<div className='text-2xl md:text-3xl font-bold text-brown leading-normal'>
									{item.number}
								</div>
								<div className=''>{item.text}</div>
							</li>
						))}
					</ul>

					<div className='absolute lg:top-0 -bottom-40 md:-bottom-30 right-0 lg:right-10 w-full lg:w-1/2 h-1/2 lg:h-full pointer-events-none select-none'>
						<Image
							src='/images/about/vectors.svg'
							alt=''
							fill
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
