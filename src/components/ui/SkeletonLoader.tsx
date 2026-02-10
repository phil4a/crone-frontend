import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

interface Props {
	count?: number;
	style?: CSSProperties;
	className?: string;
}

export function SkeletonLoader({ count = 1, style, className = '' }: Props) {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className={cn('bg-light-beige rounded-lg h-10 animate-pulse', className)}
					style={style}
				/>
			))}
		</>
	);
}
