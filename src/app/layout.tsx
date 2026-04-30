import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { cookies } from 'next/headers';

import { CookieConsent } from '@/components/layout/CookieConsent';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { YandexMetrika } from '@/components/layout/YandexMetrika';
import { FeedbackModal } from '@/components/common/FeedbackModal';

import { Providers } from '@/providers/Providers';

import './globals.css';
import { COOKIE_CONSENT_COOKIE_NAME, parseConsentCookieValue } from '@/lib/cookies/consent';

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
	title:
		'Крона Групп — строительство домов и бань из клееного бруса в Новосибирске. Деревянный дом по индивидуальному проекту под ключ.',
	description:
		'Загородные дома из клееного бруса в Новосибирске. Проектирование и строительство под ключ от «Крона Групп». Закажите на сайте или по телефону.📞+7 (913) 925-92-99.'
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
