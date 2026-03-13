import { type VariantProps, cva } from 'class-variance-authority';
import { ElementType, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const titleVariants = cva('font-bold transition-colors', {
	variants: {
		variant: {
			h1: 'text-[22px] font-black uppercase leading-[160%] md:text-4xl xl:text-[52px] xl:leading-[140%]',
			h2: 'text-[28px] leading-[1.4] md:text-[40px]',
			h3: 'text-2xl font-bold leading-tight md:text-3xl',
			h4: 'text-xl font-bold leading-tight md:text-2xl',
			h5: 'text-lg font-bold leading-tight md:text-xl'
		},
		color: {
			default: 'text-main',
			white: 'text-white',
			brown: 'text-brown'
		}
	},
	defaultVariants: {
		variant: 'h2',
		color: 'default'
	}
});

export interface TitleProps
	extends Omit<HTMLAttributes<HTMLElement>, 'color'>, VariantProps<typeof titleVariants> {
	as?: ElementType;
}

function Title({ className, variant, color, as: Component = 'h2', ...props }: TitleProps) {
	return (
		<Component
			className={cn(titleVariants({ variant, color }), className)}
			{...props}
		/>
	);
}

export { Title, titleVariants };
