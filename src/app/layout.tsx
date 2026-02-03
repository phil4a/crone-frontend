import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import './globals.css';

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
	title:
		'Крона Групп — строительство домов и бань из клееного бруса в Новосибирске. Деревянный дом по индивидуальному проекту под ключ.',
	description:
		'Загородные дома из клееного бруса в Новосибирске. Проектирование и строительство под ключ от «Крона Групп». Закажите на сайте или по телефону.📞+7 (913) 925-92-99.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru" className={manrope.variable}>
			<body className="antialiased bg-beige">
				<Header />
				{children}
			</body>
		</html>
	);
}
