'use client';

import { cn } from '@/lib/utils';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
	if (totalPages <= 1) return null;

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className={cn('flex flex-wrap justify-center items-center gap-2', className)}>
			{/* Previous Button */}
			<button
				onClick={() => onPageChange(Math.max(1, currentPage - 1))}
				disabled={currentPage === 1}
				className='px-2 py-2 rounded-lg text-sm disabled:opacity-10 cursor-pointer disabled:cursor-not-allowed hover:bg-gray-50 transition-colors'
			>
				&larr;
			</button>

			{/* Page Numbers */}
			{pages.map(page => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={cn(
						'w-9 h-9 flex items-center justify-center rounded-lg font-medium transition-colors cursor-pointer',
						currentPage === page
							? 'bg-light-beige text-brown cursor-auto'
							: ' hover:bg-light-beige/80'
					)}
				>
					{page}
				</button>
			))}

			{/* Next Button */}
			<button
				onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
				disabled={currentPage === totalPages}
				className='px-2 py-2 rounded-lg cursor-pointer text-sm disabled:opacity-10 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors'
			>
				&rarr;
			</button>
		</div>
	);
}
