import type { Metadata } from 'next';

import { FeedbackForm } from '@/components/common/FeedbackForm';
import { AboutAchievements } from '@/components/features/about/AboutAchievements';
import { AboutHero } from '@/components/features/about/AboutHero';
import { AboutProjects } from '@/components/features/about/AboutProjects';
import { AboutTeam } from '@/components/features/about/AboutTeam';

export const metadata: Metadata = {
	title: 'О компании | Крона Групп',
	description:
		'Компания Крона Групп - строительство домов из клееного бруса под ключ. Опыт работы более 15 лет.'
};

export default function AboutPage() {
	return (
		<main>
			<AboutHero />
			<AboutAchievements />
			<AboutProjects />
			<AboutTeam />
			<FeedbackForm
				formId={225}
				title='Закажите проект у нас!'
				text='Заполните форму заявки, и мы вышлем вам презентацию наших проектов'
			/>
		</main>
	);
}
