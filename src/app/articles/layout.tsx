import { type PropsWithChildren, Suspense } from 'react';

import { ArticlesSidebar } from '@/components/features/articles/ArticlesSidebar';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<main className='pt-38 pb-27 container  min-h-screen'>
			<HeaderThemeObserver theme='light' />

			<div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
				{/* Sidebar */}
				<div className='lg:block lg:col-span-1'>
					<Suspense
						fallback={
							<div className='sticky top-26 w-full pt-3'>
								<h3 className='text-xl font-bold mb-4 lg:mb-6 uppercase'>Категории:</h3>
								<div className='flex lg:flex-col gap-x-8 gap-y-3 lg:gap-4 flex-wrap'>
									<SkeletonLoader
										count={5}
										className='h-6 w-full max-w-37.5'
									/>
								</div>
							</div>
						}
					>
						<ArticlesSidebar className='sticky top-26' />
					</Suspense>
				</div>

				{/* Content */}
				<div className='lg:col-span-4'>{children}</div>
			</div>
		</main>
	);
}
