import type { PropsWithChildren } from 'react';

import { ArticlesSidebar } from '@/components/features/articles/ArticlesSidebar';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<main className='pt-38 pb-27 container bg-light-gray min-h-screen'>
			<HeaderThemeObserver theme='light' />

			<div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
				{/* Sidebar */}
				<div className='lg:block lg:col-span-1'>
					<ArticlesSidebar className='sticky top-26' />
				</div>

				{/* Content */}
				<div className='lg:col-span-4'>{children}</div>
			</div>
		</main>
	);
}
