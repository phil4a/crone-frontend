import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { cookies } from 'next/headers';

import { FeedbackModal } from '@/components/common/FeedbackModal';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { YandexMetrika } from '@/components/layout/YandexMetrika';

import { Providers } from '@/providers/Providers';

import { SITE_CONFIG, SITE_URL } from '@/config/site.config';

import './globals.css';
import { COOKIE_CONSENT_COOKIE_NAME, parseConsentCookieValue } from '@/lib/cookies/consent';

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700', '800']
});

const metadataBase = (() => {
	const raw = SITE_URL?.trim();
	if (!raw) return undefined;
	try {
		return new URL(raw);
	} catch {
		return undefined;
	}
})();

export const viewport: Viewport = {
	themeColor: '#e1b286'
};

export const metadata: Metadata = {
	metadataBase,
	title:
		'Крона Групп — строительство домов и бань из клееного бруса в Новосибирске. Деревянный дом по индивидуальному проекту под ключ.',
	description:
		'Загородные дома из клееного бруса в Новосибирске. Проектирование и строительство под ключ от «Крона Групп». Закажите на сайте или по телефону.📞+7 (913) 925-92-99.',
	openGraph: {
		title: SITE_CONFIG.metadata.title,
		description: SITE_CONFIG.metadata.description,
		siteName: SITE_CONFIG.name,
		locale: 'ru_RU',
		type: 'website'
	},
	twitter: {
		card: 'summary',
		title: SITE_CONFIG.metadata.title,
		description: SITE_CONFIG.metadata.description
	}
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();
	const initialConsent = parseConsentCookieValue(
		cookieStore.get(COOKIE_CONSENT_COOKIE_NAME)?.value
	);

	return (
		<html
			lang='ru'
			className={manrope.variable}
		>
			<body className='antialiased bg-beige'>
				<YandexMetrika />
				<Providers>
					<Header />
					{children}
					<Footer />
					<FeedbackModal />
					<CookieConsent initialConsent={initialConsent} />
				</Providers>
			</body>
		</html>
	);
}
