import type { Metadata } from 'next';

import { FeedbackForm } from '@/components/common/FeedbackForm';
import { AltayAbout } from '@/components/features/altay/AltayAbout';
import { AltayAdvantages } from '@/components/features/altay/AltayAdvantages';
import { AltayHero } from '@/components/features/altay/AltayHero';
import { AltayProcess } from '@/components/features/altay/AltayProcess';
import { AltayWhatWeBuild } from '@/components/features/altay/AltayWhatWeBuild';
import { AltayWorks } from '@/components/features/altay/AltayWorks';

import { PAGE } from '@/config/pages.config';
import { SITE_URL } from '@/config/site.config';

export const metadata: Metadata = {
	title: 'Строительство на Алтае из клееного бруса под ключ | Крона Групп',
	description:
		'Строим дома, бани, базы отдыха и коммерческие объекты из клееного бруса на Алтае. Проектирование, собственное производство и монтаж под ключ. Гарантия 5 лет. ☎ +7 (913) 925-92-99',
	alternates: {
		canonical: `${SITE_URL}${PAGE.SERVICES_ALTAY}`
	}
};

// ID CF7-формы «Алтай» задаётся серверной env ALTAY_FORM_ID (рядом с её unit-tag в
// CONTACT_FORM_7_UNIT_TAGS). В клиентский бандл не попадает — страница серверная.
// Пока форма не создана в WordPress, используется общая форма 225.
const altayFormId = (() => {
	const parsed = Number(process.env.ALTAY_FORM_ID);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : 225;
})();

export default function AltayPage() {
	return (
		<main>
			<AltayHero />
			<AltayAdvantages />
			<AltayWhatWeBuild />
			<AltayProcess />
			<AltayWorks />

			<div
				id='altay-podbor'
				className='scroll-mt-24'
			>
				<FeedbackForm
					formId={altayFormId}
					showMessageField={false}
					title='Подберём проект для строительства на Алтае'
					text='Оставьте имя и телефон — мы свяжемся с вами, уточним задачу и предложим подходящие решения.'
				/>
			</div>

			<AltayAbout />
		</main>
	);
}
