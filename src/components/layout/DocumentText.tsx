import { Title } from '../ui/Title';

import { HeaderThemeObserver } from './HeaderThemeObserver';
import type { GetPageByUriQuery } from '@/graphql/generated';

export function DocumentText({ page }: { page?: GetPageByUriQuery['page'] }) {
	const contentHtml = page?.content?.trim() || '';

	return (
		<main>
			<section className='pt-32 md:pt-40 lg:pt-50 pb-16 md:pb-20 lg:pb-25 bg-white'>
				<HeaderThemeObserver theme='light' />
				<div className='container'>
					<div>
						<Title
							as='h1'
							variant='h2'
							className='mb-6 md:mb-10'
						>
							{page?.title || 'Пользовательское соглашение'}
						</Title>

						<div className='bg-light-gray rounded-2xl p-6 md:p-7.5'>
							{contentHtml && (
								<div
									className='text-main text-base [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2:first-child]:mt-0 [&_p]:mt-4 [&_p:first-child]:mt-0 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_table]:mt-6 [&_table]:w-full [&_table]:border-separate [&_table]:border-spacing-0 [&_th]:border [&_th]:border-light-beige [&_th]:bg-white [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-light-beige [&_td]:p-3'
									dangerouslySetInnerHTML={{ __html: contentHtml }}
								/>
							)}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
