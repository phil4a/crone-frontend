'use client';

import { useRef, useState } from 'react';
import { type Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { FEATURES_DATA } from '@/config/features.data';

import { useFeedbackModalStore } from '@/store/feedbackModal';

import { FeaturesSlide } from './features/FeaturesSlide';
import { cn } from '@/lib/utils';

export function Features() {
	const swiperRef = useRef<SwiperType>(null);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);
	const openFeedbackModal = useFeedbackModalStore(state => state.open);

	return (
		<section className='features pb-20 md:pb-25 lg:pb-37.5 bg-white relative overflow-hidden'>
			<HeaderThemeObserver theme='light' />
			<div className='container'>
				{/* Top Line */}
				<div className='flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-2.5 mb-7.5 md:mb-10'>
					<div className='flex flex-col items-start'>
						<Badge
							variant='beige'
							className='mb-3 font-normal'
						>
							Наш подход
						</Badge>
						<Title
							as='h2'
							variant='h2'
						>
							Работаем для вас
						</Title>
					</div>

					{/* Slider Controls */}
					<div className='flex gap-2.5'>
						<button
							onClick={() => swiperRef.current?.slidePrev()}
							disabled={isBeginning}
							className={cn(
								'w-18 h-11 md:w-21 md:h-12.5 flex items-center justify-center border border-brown rounded-lg transition-colors',
								isBeginning
									? 'opacity-50 cursor-not-allowed'
									: 'cursor-pointer hover:bg-brown/10 active:bg-brown/20'
							)}
							aria-label='Previous slide'
						>
							<svg
								width='24'
								height='25'
								viewBox='0 0 24 25'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M19 12.5L5 12.5'
									stroke='#614137'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M11 18.5L5 12.5L11 6.5'
									stroke='#614137'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
						<button
							onClick={() => swiperRef.current?.slideNext()}
							disabled={isEnd}
							className={cn(
								'w-18 h-11 md:w-21 md:h-12.5 flex items-center justify-center border border-brown rounded-lg transition-colors',
								isEnd
									? 'opacity-50 cursor-not-allowed'
									: 'cursor-pointer hover:bg-brown/10 active:bg-brown/20'
							)}
							aria-label='Next slide'
						>
							<svg
								width='24'
								height='25'
								viewBox='0 0 24 25'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M5 12.5H19'
									stroke='#614137'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M13 6.5L19 12.5L13 18.5'
									stroke='#614137'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Slider */}
				<div className='mb-7.5 md:mb-15'>
					<Swiper
						modules={[Navigation, Autoplay]}
						onBeforeInit={(swiper: SwiperType) => {
							swiperRef.current = swiper;
						}}
						onSlideChange={(swiper: SwiperType) => {
							setIsBeginning(swiper.isBeginning);
							setIsEnd(swiper.isEnd);
						}}
						onInit={(swiper: SwiperType) => {
							setIsBeginning(swiper.isBeginning);
							setIsEnd(swiper.isEnd);
						}}
						// spaceBetween={20}
						// slidesPerView={1.1}
						// autoplay={{
						// 	delay: 3000,
						// 	disableOnInteraction: false,
						// }}
						speed={1800}
						breakpoints={{
							320: {
								slidesPerView: 1.1,
								spaceBetween: 20
								// autoHeight: true,
							},
							480: {
								slidesPerView: 1.5,
								spaceBetween: 20
							},
							768: {
								slidesPerView: 1.75,
								spaceBetween: 20
							},
							992: {
								slidesPerView: 3,
								spaceBetween: 20
							},
							1314: {
								slidesPerView: 4,
								spaceBetween: 20
							}
						}}
						className='overflow-visible! xl:overflow-hidden!'
					>
						{FEATURES_DATA.map((item, index) => (
							<SwiperSlide key={index}>
								<FeaturesSlide item={item} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				{/* CTA */}
				<div className='bg-light-beige rounded-lg p-10 md:p-15 lg:px-20 lg:py-15 flex flex-col md:flex-row items-center justify-between gap-7.5 md:gap-10'>
					<div className='text-center md:text-left'>
						<h3 className='text-2xl md:text-3xl font-semibold text-main mb-3'>
							Оставьте заявку и получите консультацию
						</h3>
						<p className='text-main/80 text-base md:text-lg'>
							Наш специалист свяжется с вами в ближайшее время
						</p>
					</div>
					<Button
						variant={'default'}
						onClick={() => openFeedbackModal()}
						className='md:w-115 w-full max-w-115'
					>
						Оставить заявку
					</Button>
				</div>
			</div>
		</section>
	);
}
