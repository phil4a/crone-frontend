'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react';

import { loadConsent } from '@/lib/cookies/consent';

declare global {
	interface Window {
		ym?: (...args: unknown[]) => void;
	}
}

function subscribeConsent(onStoreChange: () => void): () => void {
	if (typeof window === 'undefined') {
		return () => {};
	}

	const handler = () => {
		onStoreChange();
	};

	window.addEventListener('storage', handler);
	window.addEventListener('crone-cookie-consent', handler);

	return () => {
		window.removeEventListener('storage', handler);
		window.removeEventListener('crone-cookie-consent', handler);
	};
}

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

	const analyticsConsent = useSyncExternalStore(
		subscribeConsent,
		() => (loadConsent()?.analytics ? '1' : ''),
		() => ''
	);

	const enabled =
		process.env.NODE_ENV === 'production' && Boolean(metrikaId) && analyticsConsent === '1';

	const currentUrl = useMemo(() => {
		const query = searchParams?.toString();
		return query ? `${pathname}?${query}` : pathname;
	}, [pathname, searchParams]);

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
