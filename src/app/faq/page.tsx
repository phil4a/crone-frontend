import type { Metadata } from 'next';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

import { FaqTabs } from '@/components/features/help/FaqTabs';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Title } from '@/components/ui/Title';

import { buildFaqJsonLd, parseFaqMarkdown } from '@/lib/faq';

export const revalidate = 86400;
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Помощь и FAQ | Крона Групп',
	description: 'Ответы на частые вопросы о проектировании и строительстве домов из клееного бруса.'
};

const FAQ_MARKDOWN_CANDIDATES = [
	path.join(process.cwd(), 'src', 'data', 'faq.md'),
	path.join(process.cwd(), 'crone-frontend', 'src', 'data', 'faq.md')
];

async function loadFaqMarkdown() {
	for (const filePath of FAQ_MARKDOWN_CANDIDATES) {
		try {
			await access(filePath);
			return readFile(filePath, 'utf8');
		} catch {
			continue;
		}
	}

	throw new Error('FAQ markdown file not found');
}

async function getFaqData() {
	try {
		const markdown = await loadFaqMarkdown();
		const categories = parseFaqMarkdown(markdown);
		return {
			categories,
			jsonLd: categories.length > 0 ? buildFaqJsonLd(categories) : null
		};
	} catch (error) {
		console.error(error);
		return { categories: [], jsonLd: null };
	}
}

export default async function HelpPage({
	searchParams
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const resolvedSearchParams = await searchParams;
	const { categories, jsonLd } = await getFaqData();
	const tabParam = resolvedSearchParams.tab;
	const requestedTab = typeof tabParam === 'string' ? tabParam : undefined;
	const initialActiveId =
		requestedTab && categories.some(category => category.id === requestedTab)
			? requestedTab
			: (categories[0]?.id ?? '');

	return (
		<main>
			<section className='pt-32 md:pt-40 lg:pt-50 pb-16 md:pb-20 lg:pb-25 bg-white'>
				<HeaderThemeObserver theme='light' />

				<div className='container'>
					<Breadcrumbs items={[{ label: 'Помощь' }]} />

					<Title
						as='h1'
						variant='h2'
						className='mb-6 md:mb-10'
					>
						Помощь
					</Title>

					<div className='bg-light-gray rounded-2xl p-6 md:p-7.5'>
						{categories.length > 0 ? (
							<>
								<FaqTabs
									categories={categories}
									initialActiveId={initialActiveId}
								/>
								{jsonLd ? (
									<script
										type='application/ld+json'
										dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
									/>
								) : null}
							</>
						) : (
							<p className='text-main leading-relaxed'>Раздел FAQ пока не опубликован.</p>
						)}
					</div>
				</div>
			</section>
		</main>
	);
}
