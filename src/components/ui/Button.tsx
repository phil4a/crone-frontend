import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-extrabold uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
	{
		variants: {
			variant: {
				default: 'bg-beige text-white hover:bg-[#d8a270] active:bg-[#d39b67]',
				secondary:
					'bg-light-beige text-brown text-base font-normal normal-case active:bg-[#d39b67]',
				outline:
					'border border-brown bg-transparent text-brown hover:bg-light-beige active:bg-light-beige',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-auto px-[30px] py-4',
				sm: 'h-11 rounded-md px-4',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
				full: 'w-full'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	as?: React.ElementType;
	href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, as: Component = 'button', ...props }, ref) => {
		return (
			<Component
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
