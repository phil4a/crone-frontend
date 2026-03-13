import type { Metadata } from 'next';

import { FeedbackForm } from '@/components/common/FeedbackForm';
import { ServicesHero } from '@/components/features/services/ServicesHero';
import { ServicesIncluded } from '@/components/features/services/ServicesIncluded';
import { ServicesPriceFactors } from '@/components/features/services/ServicesPriceFactors';
import { ServicesProjects } from '@/components/features/services/ServicesProjects';
import { ServicesWhyUs } from '@/components/features/services/ServicesWhyUs';

export const metadata: Metadata = {
	title: 'Услуги | Крона Групп',
	description:
		'Строительная компания Крона Групп осуществляет услуги по проектированию и строительству домов из клееного бруса в Новосибирске. Звоните: +7 (913) 925-92-99'
};

export default function ServicesPage() {
	return (
		<main>
			<ServicesHero />
			<ServicesWhyUs />
			<ServicesIncluded />
			<ServicesPriceFactors />
			<ServicesProjects />
			<FeedbackForm
				title='Закажите проект у нас!'
				text='Заполните форму заявки, и мы вышлем вам презентацию'
			/>
		</main>
	);
}
