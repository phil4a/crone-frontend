import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { FaqTabs } from '@/components/features/help/FaqTabs';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Title } from '@/components/ui/Title';

import { buildFaqJsonLd, parseFaqMarkdown } from '@/lib/faq';

export const revalidate = 86400;
export const dynamic = 'force-static';

export const metadata: Metadata = {
	title: 'Помощь и FAQ | Крона Групп',
	description: 'Ответы на частые вопросы о проектировании и строительстве домов из клееного бруса.'
};

async function loadFaqMarkdown() {
	const filePath = path.join(process.cwd(), '..', 'faq.md');
	return readFile(filePath, 'utf8');
}

export default async function HelpPage() {
	let markdown = '';
	try {
		markdown = await loadFaqMarkdown();
	} catch {
		markdown = '';
	}

	const categories = parseFaqMarkdown(markdown);
	const jsonLd = buildFaqJsonLd(categories);

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
								<FaqTabs categories={categories} />
								<script
									type='application/ld+json'
									dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
								/>
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
