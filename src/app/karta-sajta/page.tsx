import type { Metadata } from 'next';
import Link from 'next/link';

import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/pages.config';

import { client } from '@/api/graphql';

import { GetSitemapDataDocument, GetSitemapDataQuery } from '@/graphql/generated';

export const revalidate = 86400; // 24 hours ISR

export const metadata: Metadata = {
	title: 'Карта сайта | Крона Групп',
	description: 'Карта сайта строительной компании Крона Групп.'
};

async function getSitemapData() {
	try {
		const data = await client.request<GetSitemapDataQuery>(GetSitemapDataDocument);
		return {
			projects: data.projects?.nodes || [],
			articles: data.articles?.nodes || []
		};
	} catch (error) {
		console.error('Error fetching sitemap data:', error);
		return { projects: [], articles: [] };
	}
}

export default async function SitemapPage() {
	const { projects, articles } = await getSitemapData();

	return (
		<main>
			<section className='pt-32 md:pt-40 lg:pt-50 pb-16 md:pb-20 lg:pb-25 bg-white'>
				<HeaderThemeObserver theme='light' />

				<div className='container'>
					<Breadcrumbs items={[{ label: 'Карта сайта' }]} />

					<Title
						as='h1'
						variant='h2'
						className='mb-6 md:mb-10'
					>
						Карта сайта
					</Title>

					<div className='bg-light-gray rounded-2xl p-6 md:p-7.5 max-w-7xl'>
						<ul className='space-y-4 md:space-y-6 text-main'>
							<li>
								<Link
									href={PAGE.HOME}
									className='text-lg md:text-xl font-bold hover:text-brown transition-colors'
								>
									Главная
								</Link>
							</li>
							<li>
								<Link
									href={PAGE.ABOUT}
									className='text-lg md:text-xl font-bold hover:text-brown transition-colors'
								>
									О компании
								</Link>
							</li>
							<li>
								<Link
									href={PAGE.SERVICES}
									className='text-lg md:text-xl font-bold hover:text-brown transition-colors'
								>
									Услуги
								</Link>
							</li>
							<li>
								<Link
									href={PAGE.CONTACTS}
									className='text-lg md:text-xl font-bold hover:text-brown transition-colors'
								>
									Контакты
								</Link>
							</li>
							<li>
								<Link
									href={PAGE.OBJECTS}
									className='text-lg md:text-xl font-bold hover:text-brown transition-colors'
								>
									Проекты
								</Link>
								{projects.length > 0 && (
									<ul className='mt-3 pl-5 md:pl-8 space-y-2 list-disc list-outside text-dark-gray marker:text-light-beige'>
										{projects.map(
											project =>
												project.slug &&
												project.title && (
													<li key={project.slug}>
														<Link
															href={`/project/${project.slug}`}
															className='hover:text-brown transition-colors'
														>
															{project.title}
														</Link>
													</li>
												)
										)}
									</ul>
								)}
							</li>
							<li>
								<Link
									href={PAGE.ARTICLES}
									className='text-lg md:text-xl font-bold hover:text-brown transition-colors'
								>
									Статьи
								</Link>
								{articles.length > 0 && (
									<ul className='mt-3 pl-5 md:pl-8 space-y-2 list-disc list-outside text-dark-gray marker:text-light-beige'>
										{articles.map(
											article =>
												article.slug &&
												article.title && (
													<li key={article.slug}>
														<Link
															href={`/articles/${article.slug}`}
															className='hover:text-brown transition-colors'
														>
															{article.title}
														</Link>
													</li>
												)
										)}
									</ul>
								)}
							</li>

							<li>
								<Link
									href={PAGE.FAQ}
									className='text-lg md:text-xl font-bold hover:text-brown transition-colors'
								>
									Помощь и FAQ
								</Link>
							</li>
							<li>
								<span className='text-lg md:text-xl font-bold'>Документы</span>
								<ul className='mt-3 pl-5 md:pl-8 space-y-2 list-disc list-outside text-dark-gray marker:text-light-beige'>
									<li>
										<Link
											href='/privacy-policy'
											className='hover:text-brown transition-colors'
										>
											Политика конфиденциальности
										</Link>
									</li>
									<li>
										<Link
											href='/user-agreement'
											className='hover:text-brown transition-colors'
										>
											Пользовательское соглашение
										</Link>
									</li>
									<li>
										<Link
											href='/cookies-policy'
											className='hover:text-brown transition-colors'
										>
											Политика использования файлов cookie
										</Link>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</main>
	);
}
