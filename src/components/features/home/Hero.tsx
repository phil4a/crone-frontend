import { Button } from '@/components/ui/Button';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { HeroBackground } from './HeroBackground';
import { Title } from '@/components/ui/Title';

export function Hero() {
	return (
		<section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
			<HeaderThemeObserver theme="transparent" />

			{/* Background Videos */}
			<div className="absolute inset-0 -z-10">
				<HeroBackground />
			</div>

			<div className="container flex h-full flex-col justify-end pb-10 xl:justify-center xl:pb-0 xl:pt-[96px]">
				<div className="mb-5 max-w-[575px] rounded-xl bg-white/15 p-5 backdrop-blur-[4px] md:mb-10 xl:mb-0 xl:bg-transparent xl:p-0 xl:backdrop-blur-none">
					<Title
						as="h1"
						variant="h1"
						color="white"
						className="mb-5 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)] xl:mb-[30px]">
						Эксклюзивные дома из клееного бруса
					</Title>
					<p className="relative text-xl text-white mb-10">
						Индивидуальный дизайн и высочайшее качество под ключ в любых масштабах
					</p>
					<Button className="w-full text-base xl:w-auto">Оставить заявку</Button>
				</div>
			</div>
		</section>
	);
}
