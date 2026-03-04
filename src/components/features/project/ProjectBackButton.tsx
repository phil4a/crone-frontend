'use client';

import { Button } from '@/components/ui/Button';
import { PAGE } from '@/config/pages.config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function ProjectBackButton() {
	const router = useRouter();

	const handleBack = (e: React.MouseEvent) => {
		if (typeof window !== 'undefined') {
			try {
				const referrer = document.referrer;
				if (!referrer) return;

				const referrerUrl = new URL(referrer);
				const currentOrigin = window.location.origin;

				// Normalize pathnames by removing trailing slashes
				const referrerPath = referrerUrl.pathname.replace(/\/$/, '');
				const projectsPath = PAGE.OBJECTS.replace(/\/$/, '');

				// Check if referrer is the projects page (same origin and path)
				if (referrerUrl.origin === currentOrigin && referrerPath === projectsPath) {
					e.preventDefault(); // Prevent default Link navigation
					
					if (window.history.length > 1) {
						router.back();
					} else {
						// If opened in new tab, push the full referrer URL to preserve query params
						router.push(referrerUrl.pathname + referrerUrl.search + referrerUrl.hash);

					}
				}
			} catch (error) {
				// Invalid referrer or error, let Link handle navigation to PAGE.OBJECTS
			}
		}
	};

	return (
		<section className='py-10 md:py-12 bg-white'>
			<div className='container'>
				<Button
					as={Link}
					href={PAGE.OBJECTS}
					variant='outline'
					className='gap-2'
					onClick={handleBack}
				>
					<span className='flex items-center'>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M19 12L5 12'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M11 18L5 12L11 6'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</span>
					К проектам
				</Button>
			</div>
		</section>
	);
}
