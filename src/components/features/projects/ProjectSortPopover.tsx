import { useState } from 'react';

import { useProjectSortOptions } from '@/hooks/projects/useProjectSortOptions';

import { cn } from '@/lib/utils';
import { ProjectSort } from '@/types/filters.types';

interface ProjectSortPopoverProps {
	sort: ProjectSort;
	onChange: (value: ProjectSort | null) => void;
}

export function ProjectSortPopover({ sort, onChange }: ProjectSortPopoverProps) {
	const { options, getLabel } = useProjectSortOptions();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='relative text-sm text-dark-gray'>
			{isOpen && (
				<button
					type='button'
					className='fixed inset-0 z-10 cursor-default'
					onClick={() => setIsOpen(false)}
				/>
			)}
			<span>Сортировка: </span>
			<button
				type='button'
				onClick={() => setIsOpen(prev => !prev)}
				className='inline-flex items-center ml-1 px-3 py-1 rounded-lg text-brown cursor-pointer text-sm'
			>
				<span>{getLabel(sort)}</span>
				<svg
					className='ml-2 h-3 w-3 text-brown'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M1 1L5 5L9 1'
						stroke='currentColor'
						strokeWidth='1.2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
			{isOpen && (
				<div className='absolute right-0 mt-2 w-64 rounded-lg border border-light-beige bg-white shadow-lg z-20'>
					{options.map(option => (
						<button
							key={option.value}
							type='button'
							onClick={() => {
								onChange(option.value === 'default' ? null : option.value);
								setIsOpen(false);
							}}
							className={cn(
								'w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-light-beige/60',
								sort === option.value && 'bg-light-beige text-brown font-semibold'
							)}
						>
							<span>{option.label}</span>
							{sort === option.value && <span className='ml-2'>✓</span>}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
