import { useEffect, useState } from 'react';

import { SortIcon } from '@/components/ui/Icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

import { useProjectSortOptions } from '@/hooks/projects/useProjectSortOptions';

import { cn } from '@/lib/utils';
import { ProjectSort } from '@/types/filters.types';

type AreaSortDirection = 'asc' | 'desc';

function AreaSortIcon({ direction }: { direction: AreaSortDirection }) {
	if (direction === 'asc') {
		return (
			<span className='flex flex-col items-start gap-0.5 text-brown shrink-0'>
				<span className='h-0.5 w-1.5 rounded bg-brown' />
				<span className='h-0.5 w-2.5 rounded bg-brown' />
				<span className='h-0.5 w-3.5 rounded bg-brown' />
			</span>
		);
	}

	return (
		<span className='flex flex-col items-start gap-0.5 text-brown shrink-0'>
			<span className='h-0.5 w-3.5 rounded bg-brown' />
			<span className='h-0.5 w-2.5 rounded bg-brown' />
			<span className='h-0.5 w-1.5 rounded bg-brown' />
		</span>
	);
}

interface ProjectSortPopoverProps {
	sort: ProjectSort;
	onChange: (value: ProjectSort | null) => void;
}

export function ProjectSortPopover({ sort, onChange }: ProjectSortPopoverProps) {
	const { options, getLabel } = useProjectSortOptions();
	const [mounted, setMounted] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className='text-sm text-dark-gray'>
				<span className='hidden md:inline-flex'>Сортировка: </span>
				<button
					type='button'
					className='inline-flex items-center ml-1 pr-3 py-1 rounded-lg text-brown cursor-default text-sm'
				>
					<div className='flex items-center gap-2'>
						<div className='hidden md:flex items-center'>
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
								></path>
							</svg>
						</div>

						<SortIcon className='inline h-6 w-6 text-brown md:hidden' />
					</div>
				</button>
			</div>
		);
	}

	return (
		<div className='text-sm text-dark-gray'>
			<span className='hidden md:inline-flex'>Сортировка: </span>
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<button
						type='button'
						className='inline-flex items-center md:ml-1 md:pr-3 md:py-1 rounded-lg text-brown cursor-pointer text-sm'
					>
						<div className='flex items-center gap-2'>
							{/* Desktop: текст + иконка площади */}
							<div className='hidden md:inline-flex items-center'>
								<span>{getLabel(sort)}</span>
								{sort === 'area_asc' && (
									<span className='hidden md:inline'>
										<AreaSortIcon direction='asc' />
									</span>
								)}
								{sort === 'area_desc' && (
									<span className='hidden md:inline'>
										<AreaSortIcon direction='desc' />
									</span>
								)}
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
							</div>

							{/* Мобайл: только иконка сортировки */}
							<SortIcon className='inline h-6 w-6 text-brown md:hidden' />
						</div>
					</button>
				</PopoverTrigger>
				<PopoverContent
					sideOffset={4}
					align='end'
					className='w-50 p-0'
				>
					{options.map(option => (
						<button
							key={option.value}
							type='button'
							onClick={() => {
								onChange(option.value === 'default' ? null : option.value);
								setOpen(false);
							}}
							className={cn(
								'w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-light-beige/60',
								sort === option.value && 'bg-light-beige text-brown font-semibold'
							)}
						>
							<div className='flex items-center gap-2'>
								<span>{option.label}</span>
								{option.value === 'area_asc' && <AreaSortIcon direction='asc' />}
								{option.value === 'area_desc' && <AreaSortIcon direction='desc' />}
							</div>
							{sort === option.value && <span className='ml-1 shrink-0'>✓</span>}
						</button>
					))}
				</PopoverContent>
			</Popover>
		</div>
	);
}
