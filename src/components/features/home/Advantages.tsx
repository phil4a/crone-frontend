'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';

export function Advantages() {
	return (
		<section className="relative bg-white py-20 md:py-[100px] lg:py-[150px]">
			<HeaderThemeObserver theme="light" />
			<div className="container">
				{/* Heading */}
				<div className="mb-8 md:mb-10">
					<div className="inline-block bg-light-beige text-brown rounded-lg px-3 py-1 mb-2.5 md:mb-3 text-sm leading-[1.4]">
						О компании
					</div>
					<h2 className="text-main font-bold text-[28px] md:text-[40px] leading-[1.4]">
						Преимущества работы с нами
					</h2>
				</div>

				{/* Content */}
				<div className="flex flex-col md:flex-row gap-[30px] md:gap-10 lg:gap-5">
					{/* Left Column */}
					<div className="flex-1 md:basis-1/2 lg:pr-[25px]">
						<p className="text-main font-semibold text-base leading-[1.4] mb-[30px] md:mb-10 lg:mb-[30px]">
							Мечтаете о собственном доме, который будет уютным уголком для вашей семьи и местом,
							где каждый день начинается с вдохновения? Мы, команда компании «КРОНА», готовы помочь
							вам воплотить эту мечту в жизнь.
						</p>

						{/* Bullets: Numbers */}
						<div className="flex flex-col md:flex-row border-y border-[#61413762] mb-5">
							<div className="flex-1 p-4 md:py-[14px] md:px-4 md:pb-[18px] border-b border-[#61413762] md:border-b-0">
								<p className="text-[32px] font-bold text-brown leading-none mb-1">15 лет</p>
								<p className="text-main leading-[1.4]">в строительстве</p>
							</div>
							{/* Add more number items here if needed */}
						</div>

						{/* Bullets: Icons */}
						<div className="flex flex-col md:flex-row gap-5 px-[10px]">
							<div className="flex-1 flex gap-3 py-[10px]">
								<div className="shrink-0 w-[68px] h-[68px] bg-beige rounded flex items-center justify-center text-white">
									{/* Icon */}
									<svg
										width="28"
										height="28"
										viewBox="0 0 28 28"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<g clipPath="url(#clip0_advantages_1)">
											<path
												d="M13.999 8.46875V15.3823H20.9126"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M13.9982 26.4443C20.1074 26.4443 25.0599 21.4918 25.0599 15.3825C25.0599 9.27331 20.1074 4.3208 13.9982 4.3208C7.88901 4.3208 2.93652 9.27331 2.93652 15.3825C2.93652 21.4918 7.88901 26.4443 13.9982 26.4443Z"
												stroke="currentColor"
												strokeWidth="2"
												strokeMiterlimit="10"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
										<defs>
											<clipPath id="clip0_advantages_1">
												<rect width="28" height="28" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</div>
								<div className="text-main leading-[1.4] flex items-center">
									индивидуальный подход к планированию времени для работы с заказчиком
								</div>
							</div>
						</div>
					</div>

					{/* Right Column */}
					<div className="flex-1 md:basis-1/2">
						<div className="space-y-5 text-main leading-relaxed">
							<p>
								«КРОНА» — это союз опытных архитекторов, дизайнеров, конструкторов и строителей,
								которые работают в единой команде для создания вашего идеального дома.
							</p>
							{/* Additional text can go here */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
