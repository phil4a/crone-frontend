import { Button } from '@/components/ui/Button';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { HeroBackground } from './HeroBackground';

export function Hero() {
	return (
		<section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
			<HeaderThemeObserver theme="transparent" />

			{/* Background Videos */}
			<div className="absolute inset-0 -z-10">
				<HeroBackground />
			</div>
			<div className="absolute top-0 left-0 z-0 w-full h-full bg-gradient-to-r from-[#00000017] to-[#00000015]" />
			<div className="container flex h-full flex-col justify-end pb-10 xl:justify-center xl:pb-0 xl:pt-[96px]">
				<div className="mb-5 max-w-[565px] rounded-xl bg-white/15 p-5 backdrop-blur-[4px] md:mb-10 xl:mb-0 xl:bg-transparent xl:p-0 xl:backdrop-blur-none">
					<p className="mb-5 text-[22px] font-black uppercase leading-[160%] text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)] md:text-4xl xl:mb-[30px] xl:text-[52px] xl:leading-[140%]">
						Эксклюзивные дома из клееного бруса
					</p>
					<p className="relative text-xl text-white mb-10">
						Индивидуальный дизайн и высочайшее качество под ключ в любых масштабах
					</p>
					<Button className="w-full text-base xl:w-auto relative">Оставить заявку</Button>
				</div>
			</div>
		</section>
	);
}
