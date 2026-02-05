import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

const badgeVariants = cva(
	'inline-flex items-center rounded-lg border px-3 py-1 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-main text-white',
				beige: 'border-transparent bg-light-beige text-brown',
				outline: 'text-foreground',
				done: 'border-transparent bg-light-beige font-normal text-[#008000]',
				inProgress: 'border-transparent bg-light-beige font-normal text-brown',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export interface BadgeProps
	extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
