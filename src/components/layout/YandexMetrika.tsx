'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useMemo, useRef } from 'react';

declare global {
	interface Window {
		ym?: (...args: unknown[]) => void;
	}
}

const PROJECT_VIEWS_SLUGS_KEY = 'crone_project_viewed_slugs';
const PROJECT_3_PAGES_GOAL_SENT_KEY = 'crone_project_3_pages_goal_sent';
const PROJECT_3_PAGES_GOAL_PENDING_KEY = 'crone_project_3_pages_goal_pending';

function getYandexMetrikaId(): number | null {
	const raw = process.env.NEXT_PUBLIC_YM_ID;
	if (!raw) return null;

	const parsed = Number.parseInt(raw, 10);
	if (!Number.isFinite(parsed)) return null;

	return parsed;
}

export const YandexMetrika = () => {
	const metrikaId = useMemo(() => getYandexMetrikaId(), []);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const lastTrackedUrlRef = useRef<string | null>(null);

	const enabled = process.env.NODE_ENV === 'production' && Boolean(metrikaId);

	const currentUrl = useMemo(() => {
		const query = searchParams?.toString();
		return query ? `${pathname}?${query}` : pathname;
	}, [pathname, searchParams]);

	useEffect(() => {
		if (!enabled || !metrikaId) return;
		if (typeof window === 'undefined') return;

		const tryFireGoal = () => {
			if (sessionStorage.getItem(PROJECT_3_PAGES_GOAL_SENT_KEY) === '1') return;
			if (sessionStorage.getItem(PROJECT_3_PAGES_GOAL_PENDING_KEY) !== '1') return;
			if (typeof window.ym !== 'function') return;

			window.ym(metrikaId, 'reachGoal', 'project_3_pages');
			sessionStorage.setItem(PROJECT_3_PAGES_GOAL_SENT_KEY, '1');
			sessionStorage.removeItem(PROJECT_3_PAGES_GOAL_PENDING_KEY);
		};

		try {
			tryFireGoal();

			if (!pathname.startsWith('/project/')) return;
			if (sessionStorage.getItem(PROJECT_3_PAGES_GOAL_SENT_KEY) === '1') return;

			const slug = pathname.split('/')[2] ?? '';
			if (!slug) return;

			const raw = sessionStorage.getItem(PROJECT_VIEWS_SLUGS_KEY);
			const parsed = raw ? (JSON.parse(raw) as unknown) : [];
			const existing = Array.isArray(parsed)
				? parsed.filter((value): value is string => typeof value === 'string')
				: [];

			if (!existing.includes(slug)) {
				existing.push(slug);
				sessionStorage.setItem(PROJECT_VIEWS_SLUGS_KEY, JSON.stringify(existing));
			}

			if (existing.length >= 3) {
				sessionStorage.setItem(PROJECT_3_PAGES_GOAL_PENDING_KEY, '1');
				tryFireGoal();
			}
		} catch {
			return;
		}
	}, [enabled, metrikaId, pathname]);

	useEffect(() => {
		if (!enabled || !metrikaId) return;
		if (typeof window === 'undefined') return;
		if (typeof window.ym !== 'function') return;

		if (lastTrackedUrlRef.current === null) {
			lastTrackedUrlRef.current = currentUrl;
			return;
		}
		if (lastTrackedUrlRef.current === currentUrl) return;

		lastTrackedUrlRef.current = currentUrl;
		window.ym(metrikaId, 'hit', currentUrl);
	}, [currentUrl, enabled, metrikaId]);

	if (!enabled || !metrikaId) return null;

	return (
		<>
			<Script
				id='yandex-metrika'
				strategy='afterInteractive'
			>{`
				(function(m,e,t,r,i,k,a){
					m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					m[i].l=1*new Date();
					for (var j = 0; j < document.scripts.length; j++) {
						if (document.scripts[j].src === r) { return; }
					}
					k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
				})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

				ym(${metrikaId}, "init", {
					webvisor:true,
					clickmap:true,
					referrer: document.referrer,
					url: location.href,
					trackLinks:true,
					accurateTrackBounce:true
				});
			`}</Script>
			<noscript>
				<div>
					<Image
						src={`https://mc.yandex.ru/watch/${metrikaId}`}
						width={1}
						height={1}
						unoptimized
						style={{ position: 'absolute', left: '-9999px' }}
						alt=''
					/>
				</div>
			</noscript>
		</>
	);
};
