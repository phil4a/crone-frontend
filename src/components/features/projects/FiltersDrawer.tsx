'use client';

import { useState } from 'react';

import { ProjectSidebar, ProjectSidebarProps } from '@/components/features/projects/ProjectSidebar';
import { FiltersIcon } from '@/components/ui/Icons';

import { cn } from '@/lib/utils';

type FiltersDrawerProps = Omit<ProjectSidebarProps, 'className'>;

export function FiltersDrawer({ filters, onApply, stats }: FiltersDrawerProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleApply: ProjectSidebarProps['onApply'] = nextFilters => {
		onApply(nextFilters);
		setIsOpen(false);
	};

	return (
		<>
			<button
				type='button'
				className='flex items-center gap-2 mb-5 xl:hidden'
				onClick={() => setIsOpen(prev => !prev)}
			>
				<FiltersIcon className='text-brown' />
				<h5 className='text-lg font-semibold'>Фильтры</h5>
			</button>

			<div
				className={cn(
					'fixed inset-0 z-40 xl:hidden pointer-events-none transition-all duration-300',
					isOpen && 'pointer-events-auto  backdrop-blur-xs'
				)}
			>
				<div
					className={cn(
						'absolute inset-0 bg-black/30 transition-opacity',
						isOpen ? 'opacity-100' : 'opacity-0'
					)}
					onClick={() => setIsOpen(false)}
				/>

				<div
					className={cn(
						'absolute inset-y-0 left-0 w-[min(100vw,375px)] bg-white shadow-xl transition-transform duration-300',
						isOpen ? 'translate-x-0' : '-translate-x-full'
					)}
				>
					<div className='flex items-center justify-between px-5 py-4 border-b border-light-beige'>
						<div className='flex items-center gap-2'>
							<FiltersIcon className='text-brown' />
							<span className='text-lg font-semibold text-main'>Фильтры</span>
						</div>
						<button
							type='button'
							className='h-8 w-8 flex items-center justify-center rounded-full text-dark-gray hover:text-brown'
							onClick={() => setIsOpen(false)}
						>
							<svg
								className='h-4 w-4'
								viewBox='0 0 14 14'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M3 3L11 11M11 3L3 11'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>

					<div className='p-5 overflow-y-auto h-[calc(100%-56px)]'>
						<ProjectSidebar
							filters={filters}
							onApply={handleApply}
							stats={stats}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
