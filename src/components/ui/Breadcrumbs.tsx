import Link from 'next/link';

import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
	return (
		<nav
			aria-label='Breadcrumb'
			className={cn('text-sm text-gray-400 mb-8 uppercase', className)}
		>
			<ol className='flex flex-wrap items-center gap-2'>
				<li>
					<Link
						href='/'
						className='hover:text-dark-gray transition-colors'
					>
						Главная
					</Link>
				</li>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					return (
						<li
							key={index}
							className='flex items-center gap-2'
						>
							<span>→</span>
							{isLast || !item.href ? (
								<span className='text-dark-gray font-medium'>{item.label}</span>
							) : (
								<Link
									href={item.href}
									className='hover:text-dark-gray transition-colors'
								>
									{item.label}
								</Link>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
