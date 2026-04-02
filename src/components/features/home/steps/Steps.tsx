'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade } from 'swiper/modules';
import { cn } from '@/lib/utils';
import { STEPS_DATA } from '@/config/steps.data';
import { Title } from '@/components/ui/Title';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';

import 'swiper/css';
import 'swiper/css/effect-fade';

export function Steps() {
	const [swiper, setSwiper] = useState<SwiperType | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const handleStepClick = (index: number) => {
		if (swiper) {
			swiper.slideTo(index);
		}
	};

	return (
		<section className="pb-10 md:pb-25 lg:pb-37.5 bg-white relative steps">
			<HeaderThemeObserver theme="light" />
			<div className="container">
				<div className="mb-8 md:mb-10">
					<Title as="h2" variant="h2">
						Этапы реализации проекта
					</Title>
				</div>

				<div className="flex flex-col md:flex-row gap-5">
					<div className="hidden lg:block flex-1 w-full md:w-1/2">
						<Swiper
							onSwiper={setSwiper}
							onSlideChange={(s) => setActiveIndex(s.activeIndex)}
							effect="fade"
							modules={[EffectFade, Autoplay]}
							className="rounded-lg overflow-hidden h-full"
							allowTouchMove={false}
							autoplay={{
								delay: 3000,
								disableOnInteraction: false,
							}}
							speed={500}>
							{STEPS_DATA.map((step) => (
								<SwiperSlide key={step.id}>
									<div className="relative w-full h-full min-h-100 md:min-h-full rounded-lg overflow-hidden">
										<Image
											src={step.image}
											alt={step.title}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					{/* Pagination List */}
					<div className="flex-1 w-full md:w-1/2 flex flex-col">
						<ul className="flex flex-col">
							{STEPS_DATA.map((step, index) => (
								<li
									key={step.id}
									className={cn(
										'flex flex-col cursor-pointer group',
										activeIndex === index && 'active',
									)}
									onClick={() => handleStepClick(index)}>
									<div
										className={cn(
											'flex items-center min-h-17.5 px-4 py-2 gap-4 transition-colors duration-300 w-full border-light-beige border-b  lg:rounded-xl',
											activeIndex === index ? 'bg-light-beige' : 'group-hover:bg-transparent',
										)}>
										<div
											className={cn(
												'text-base font-normal px-2 py-1 transition-colors duration-300 rounded-lg whitespace-nowrap',
												activeIndex === index
													? 'bg-beige text-white'
													: 'text-brown group-hover:bg-beige bg-light-beige group-hover:text-white',
											)}>
											{step.number}
										</div>
										<h5 className="text-lg font-medium text-main">{step.title}</h5>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
