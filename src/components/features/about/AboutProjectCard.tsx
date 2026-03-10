'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface AboutProjectCardProps {
	title: string;
	images: string[];
	specs: {
		area: string;
		floors: string;
		bedrooms?: string;
	};
	link: string;
}

export function AboutProjectCard({ title, images, specs, link }: AboutProjectCardProps) {
	const swiperRef = useRef<SwiperType>(null);

	return (
		<div className='flex flex-col group'>
			<div className='relative rounded-2xl overflow-hidden mb-6 aspect-[4/3] md:aspect-[16/10]'>
				<Swiper
					modules={[Navigation, Pagination]}
					pagination={{
						clickable: true,
						dynamicBullets: true
					}}
					navigation={{
						enabled: true
					}}
					loop={true}
					className='w-full h-full'
					onSwiper={(swiper) => (swiperRef.current = swiper)}
				>
					{images.map((img, index) => (
						<SwiperSlide key={index}>
							<div className='relative w-full h-full'>
								<Image
									src={img}
									alt={`${title} - вид ${index + 1}`}
									fill
									className='object-cover'
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<Link
					href={link}
					className='text-2xl font-bold text-main hover:text-brown transition-colors'
				>
					{title}
				</Link>

				<div className='flex items-center gap-6 md:gap-10'>
					{/* Area */}
					<div className='flex items-center gap-3'>
						<div className='w-5 h-5 flex items-center justify-center'>
							<svg
								width='18'
								height='19'
								viewBox='0 0 18 19'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M1 17.1885L6.33333 11.8551M1 17.1885L6.33334 17.1885M1 17.1885L1 11.8551M11.6667 6.52181L17 1.18848M17 1.18848H11.6667M17 1.18848V6.52181M1 1.18848L6.33333 6.52181M1 1.18848L1 6.52181M1 1.18848L6.33333 1.18848M11.6667 11.8551L17 17.1885M17 17.1885V11.8551M17 17.1885H11.6667'
									stroke='#E1B286'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</div>
						<span className='text-lg font-medium text-dark-gray'>{specs.area}</span>
					</div>

					{/* Floors */}
					<div className='flex items-center gap-3'>
						<div className='w-5 h-5 flex items-center justify-center'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 20 20'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M17 20H3C1.34315 20 0 18.6569 0 17V3C0 1.34315 1.34315 0 3 0L6 0C7.65685 0 9 1.34315 9 3V5H12C13.6569 5 15 6.34315 15 8V10.6885H17C18.6569 10.6885 20 12.0316 20 13.6885V17C20 18.6569 18.6569 20 17 20ZM3 2C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V13.6885C18 13.1362 17.5523 12.6885 17 12.6885H14C13.4477 12.6885 13 12.2408 13 11.6885V8C13 7.44772 12.5523 7 12 7H8C7.44772 7 7 6.55228 7 6V3C7 2.44772 6.55228 2 6 2H3Z'
									fill='#E1B286'
								/>
							</svg>
						</div>
						<span className='text-lg font-medium text-dark-gray'>{specs.floors}</span>
					</div>

					{/* Bedrooms (if present) */}
					{specs.bedrooms && (
						<div className='flex items-center gap-3'>
							<div className='w-6 h-6 flex items-center justify-center'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M4 9H20'
										stroke='#E1B286'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M19.875 5H4.125C3.50368 5 3 5.44772 3 6V20C3 20.5523 3.50368 21 4.125 21H19.875C20.4963 21 21 20.5523 21 20V6C21 5.44772 20.4963 5 19.875 5Z'
										stroke='#E1B286'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
							<span className='text-lg font-medium text-dark-gray'>{specs.bedrooms}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
