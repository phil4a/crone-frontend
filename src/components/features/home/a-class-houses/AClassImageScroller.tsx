'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const HINT_TIMEOUT = 4000;
// Смещение, начиная с которого считаем, что пользователь листает сам
const SWIPE_THRESHOLD = 4;

export function AClassImageScroller({ children }: { children: ReactNode }) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const restLeftRef = useRef(0);
	const [isScrollable, setIsScrollable] = useState(false);
	const [isOnScreen, setIsOnScreen] = useState(false);
	const [hintVisible, setHintVisible] = useState(true);

	// Стартуем от центра картинки, а не от левого края
	useLayoutEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		const overflow = el.scrollWidth - el.clientWidth;
		if (overflow > 0) {
			restLeftRef.current = overflow / 2;
			el.scrollLeft = overflow / 2;
		}
	}, []);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		const observer = new ResizeObserver(() => {
			setIsScrollable(el.scrollWidth - el.clientWidth > 1);
			// Ресайз сам сдвигает scrollLeft — это не свайп пользователя
			restLeftRef.current = el.scrollLeft;
		});
		observer.observe(el);

		return () => observer.disconnect();
	}, []);

	// Секция монтируется под ViewportLazy за 400px до вьюпорта, поэтому отсчёт
	// автоскрытия подсказки начинаем только когда её реально видно на экране
	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					setIsOnScreen(true);
					observer.disconnect();
				}
			},
			{ threshold: 0 }
		);
		observer.observe(el);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!hintVisible || !isOnScreen || !isScrollable) return;

		const timer = setTimeout(() => setHintVisible(false), HINT_TIMEOUT);
		return () => clearTimeout(timer);
	}, [hintVisible, isOnScreen, isScrollable]);

	return (
		<div className='relative w-full [--aclass-h:clamp(320px,75svh,600px)]'>
			<div
				ref={scrollRef}
				data-hotspot-scroll
				onScroll={e => {
					// Начальное центрирование тоже стреляет scroll — реагируем только на свайп
					if (Math.abs(e.currentTarget.scrollLeft - restLeftRef.current) > SWIPE_THRESHOLD) {
						setHintVisible(false);
					}
				}}
				tabIndex={isScrollable ? 0 : -1}
				role={isScrollable ? 'region' : undefined}
				aria-label={
					isScrollable ? 'Дома А-класса — прокрутите изображение по горизонтали' : undefined
				}
				className={cn(
					// touch-action не трогаем: при auto браузер сам решает по направлению жеста —
					// горизонтальный свайп листает картинку, вертикальный скроллит страницу
					'w-full overflow-x-auto overflow-y-hidden overscroll-x-contain outline-none',
					'lg:overflow-visible',
					'[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
				)}
			>
				<div className='relative h-[var(--aclass-h)] w-[calc(var(--aclass-h)*1800/869)] lg:h-auto lg:w-full lg:aspect-1800/869'>
					{children}
				</div>
			</div>

			<div
				aria-hidden
				className={cn(
					'pointer-events-none absolute bottom-4 left-1/2 z-1 -translate-x-1/2 lg:hidden',
					'flex items-center gap-1.5 rounded-full bg-black/45 px-4 py-2 text-sm text-white backdrop-blur-sm',
					'transition-opacity duration-500',
					isScrollable && hintVisible ? 'opacity-100' : 'opacity-0'
				)}
			>
				<ChevronLeft
					size={16}
					className='motion-safe:animate-pulse'
				/>
				Листайте
				<ChevronRight
					size={16}
					className='motion-safe:animate-pulse'
				/>
			</div>
		</div>
	);
}
