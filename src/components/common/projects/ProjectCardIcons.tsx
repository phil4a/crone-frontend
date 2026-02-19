import { JSX, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ProjectCardIconType = 'area' | 'floor' | 'year' | 'city';

interface ProjectCardIconBaseProps {
	className?: string;
}

interface ProjectCardIconProps extends ProjectCardIconBaseProps {
	type: ProjectCardIconType;
	children: ReactNode;
}

function AreaSvg({ className }: ProjectCardIconBaseProps) {
	return (
		<svg
			className={cn('h-4.5 w-4.5 text-beige', className)}
			viewBox='0 0 18 19'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M1 17.1885L6.33333 11.8551M1 17.1885L6.33334 17.1885M1 17.1885L1 11.8551M11.6667 6.52181L17 1.18848M17 1.18848H11.6667M17 1.18848V6.52181M1 1.18848L6.33333 6.52181M1 1.18848L1 6.52181M1 1.18848L6.33333 1.18848M11.6667 11.8551L17 17.1885M17 17.1885V11.8551M17 17.1885H11.6667'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

function FloorSvg({ className }: ProjectCardIconBaseProps) {
	return (
		<svg
			className={cn('h-5 w-5 text-beige', className)}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M17 20H3C1.34315 20 0 18.6569 0 17V3C0 1.34315 1.34315 0 3 0L6 0C7.65685 0 9 1.34315 9 3V5H12C13.6569 5 15 6.34315 15 8V10.6885H17C18.6569 10.6885 20 12.0316 20 13.6885V17C20 18.6569 18.6569 20 17 20ZM3 2C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V13.6885C18 13.1362 17.5523 12.6885 17 12.6885H14C13.4477 12.6885 13 12.2408 13 11.6885V8C13 7.44772 12.5523 7 12 7H8C7.44772 7 7 6.55228 7 6V3C7 2.44772 6.55228 2 6 2H3Z'
				fill='currentColor'
			></path>
		</svg>
	);
}

function YearSvg({ className }: ProjectCardIconBaseProps) {
	return (
		<svg
			className={cn('h-6 w-6 text-beige', className)}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M4 9H20'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			></path>
			<path
				d='M19.875 5H4.125C3.50368 5 3 5.44772 3 6V20C3 20.5523 3.50368 21 4.125 21H19.875C20.4963 21 21 20.5523 21 20V6C21 5.44772 20.4963 5 19.875 5Z'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			></path>
			<path
				d='M17 3V5'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			></path>
			<path
				d='M7 3V5'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			></path>
		</svg>
	);
}

function CitySvg({ className }: ProjectCardIconBaseProps) {
	return (
		<svg
			className={cn('h-6 w-5.5 text-beige', className)}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			></path>
			<path
				d='M12 21C12 21 19 16.1538 19 9.92308C19 8.08696 18.2625 6.32605 16.9497 5.02772C15.637 3.72939 13.8565 3 12 3C10.1435 3 8.36301 3.72939 7.05025 5.02772C5.7375 6.32605 5 8.08696 5 9.92308C5 16.1538 12 21 12 21Z'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			></path>
		</svg>
	);
}

const ICON_COMPONENTS: Record<
	ProjectCardIconType,
	(props: ProjectCardIconBaseProps) => JSX.Element
> = {
	area: AreaSvg,
	floor: FloorSvg,
	year: YearSvg,
	city: CitySvg
};

export const ProjectCardIcon = ({ type, children, className }: ProjectCardIconProps) => {
	const Icon = ICON_COMPONENTS[type];

	return (
		<div className={cn('flex items-center gap-1.5', className)}>
			<Icon />
			<span className='text-dark-gray'>{children}</span>
		</div>
	);
};
