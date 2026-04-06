import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, placeholder, label, ...props }, ref) => {
		const labelText = label || placeholder;

		return (
			<div className="relative w-full">
				<input
					type={type}
					className={cn(
						'peer flex w-full rounded-lg bg-white px-5 py-3.25 text-base',
						'text-brown placeholder:text-transparent focus:placeholder:text-transparent',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige focus-visible:ring-offset-2',
						'disabled:cursor-not-allowed disabled:opacity-50',
						'pt-6 pb-2',
						className,
					)}
					placeholder={labelText}
					ref={ref}
					{...props}
				/>
				{labelText && (
					<label
						className={cn(
							'absolute left-5 top-1/2 -translate-y-1/2 text-brown/50 text-base pointer-events-none transition-all duration-200',
							'peer-focus:top-3 peer-focus:text-[10px] peer-focus:leading-none peer-focus:text-brown/50',
							'peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:leading-none',
						)}
						htmlFor={props.id}>
						{labelText}
					</label>
				)}
			</div>
		);
	},
);
Input.displayName = 'Input';

export { Input };
