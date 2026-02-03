import { Button } from '@/components/ui/Button';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';

export function Hero() {
	return (
		<section className="relative h-[100svh] min-h-[600px] w-full bg-[url('/images/home/fs-mobile.jpg')] bg-cover bg-bottom bg-no-repeat md:bg-[url('/images/home/fs-tablet.jpg')] xl:bg-[url('/images/home/fs-pc.jpg')] xl:bg-left-top">
			<HeaderThemeObserver theme="transparent" />
			<div className="container flex h-full flex-col justify-end pb-10 xl:justify-center xl:pb-0 xl:pt-[96px]">
				<div className="mb-5 max-w-[575px] rounded-xl bg-white/15 p-5 backdrop-blur-[4px] md:mb-10 xl:mb-0 xl:bg-transparent xl:p-0 xl:backdrop-blur-none">
					<h1 className="mb-5 text-[22px] font-black uppercase leading-[160%] text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)] md:text-4xl xl:mb-[30px] xl:text-[52px] xl:leading-[140%]">
						Эксклюзивные дома из клееного бруса
					</h1>

					<Button className="w-full text-base xl:w-auto">Оставить заявку</Button>
				</div>
			</div>
		</section>
	);
}
