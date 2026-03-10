import type { Metadata } from 'next';

import { ProjectCardDetailed } from '@/components/common/projects/ProjectCardDetailed';
import { AboutAchievements } from '@/components/features/about/AboutAchievements';
import { AboutForm } from '@/components/features/about/AboutForm';
import { AboutHero } from '@/components/features/about/AboutHero';
import { AboutProjects } from '@/components/features/about/AboutProjects';
import { AboutTeam } from '@/components/features/about/AboutTeam';

import { client } from '@/api/graphql';

import {
	GetProjectsDocument,
	GetProjectsQuery,
	GetProjectsQueryVariables
} from '@/graphql/generated';

export const metadata: Metadata = {
	title: 'О компании | Крона Групп',
	description:
		'Компания Крона Групп - строительство домов из клееного бруса под ключ. Опыт работы более 15 лет.'
};

const projectData = await client.request<GetProjectsQuery, GetProjectsQueryVariables>(
	GetProjectsDocument,
	{
		first: 3
	}
);

export default function AboutPage() {
	return (
		<main>
			<AboutHero />
			<AboutAchievements />
			<AboutProjects />
			<AboutTeam />
			<AboutForm />
		</main>
	);
}
