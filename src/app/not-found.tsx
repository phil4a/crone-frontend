import { unstable_cache } from 'next/cache';
import Link from 'next/link';

import { ProjectCard } from '@/components/common/projects/ProjectCard';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/pages.config';

import { client } from '@/api/graphql';

import {
	GetProjectsDocument,
	type GetProjectsQuery,
	type GetProjectsQueryVariables
} from '@/graphql/generated';
import { transformGraphQLProject } from '@/lib/transformers';

export const revalidate = 600;

const getLatestProjects = unstable_cache(
	async () => {
		try {
			const data = await client.request<GetProjectsQuery, GetProjectsQueryVariables>(
				GetProjectsDocument,
				{
					first: 6,
					offset: 0
				}
			);

			const nodes = data?.posts?.nodes ?? [];
			return nodes.map(transformGraphQLProject);
		} catch {
			return [];
		}
	},
	['crone-latest-projects-not-found'],
	{ revalidate: 600 }
);

export default async function NotFound() {
	const projects = await getLatestProjects();

	return (
		<main className='bg-white'>
			<HeaderThemeObserver theme='light' />

			<section className='pt-32 md:pt-40 lg:pt-50 pb-12 md:pb-16'>
				<div className='container flex flex-col items-center'>
					<Title
						as='h1'
						variant='h1'
						className='mb-4 text-center'
					>
						Такой страницы нет
					</Title>
					<p className='text-base md:text-lg text-main mb-8 max-w-3xl text-center'>
						Похоже, этот раздел ещё на стадии проекта — чертёж есть, а дома пока нет.
					</p>

					<div className='inline'>
						<Button
							as={Link}
							href={PAGE.HOME}
							size='sm'
							variant='default'
							className='w-full sm:w-auto'
						>
							На главную
						</Button>
					</div>
				</div>
			</section>

			{projects.length ? (
				<section className='pb-20 md:pb-25'>
					<div className='container'>
						<Title
							as='h2'
							variant='h3'
							className='mb-8'
						>
							Последние объекты
						</Title>
						<ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
							{projects.map(project => (
								<ProjectCard
									key={project.id}
									project={project}
								/>
							))}
						</ul>
					</div>
				</section>
			) : null}
		</main>
	);
}
