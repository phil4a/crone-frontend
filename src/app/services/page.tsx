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
		'Услуги строительства домов из клееного бруса: проектирование, фундамент, сборка, кровля, инженерные коммуникации и отделка.'
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
