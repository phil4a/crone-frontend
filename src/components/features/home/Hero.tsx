import { FeedbackModalTrigger } from '@/components/common/FeedbackModal';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Title } from '@/components/ui/Title';

import { HeroBackground } from './HeroBackground';

export function Hero() {
	return (
		<section className='relative h-svh min-h-150 w-full overflow-hidden'>
			<HeaderThemeObserver theme='transparent' />

			{/* Background Videos */}
			<div className='absolute inset-0 -z-10'>
				<HeroBackground />
			</div>

			<div className='container flex h-full flex-col justify-end pb-10 xl:justify-center xl:pb-0 xl:pt-24'>
				<div className='mb-5 max-w-143.75 rounded-xl bg-white/15 p-5 backdrop-blur-xs md:mb-10 xl:mb-0 xl:bg-transparent xl:p-0 xl:backdrop-blur-none'>
					<Title
						as='h1'
						variant='h1'
						color='white'
						className='mb-5 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)] xl:mb-7.5'
					>
						Эксклюзивные дома из клееного бруса
					</Title>
					<p className='relative text-xl text-white mb-10'>
						Индивидуальный дизайн и высочайшее качество под ключ в любых масштабах
					</p>
					<FeedbackModalTrigger className='w-full text-base xl:w-auto'>
						Оставить заявку
					</FeedbackModalTrigger>
				</div>
			</div>
		</section>
	);
}
