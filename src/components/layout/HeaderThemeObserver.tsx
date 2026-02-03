'use client';

import { useHeaderTheme } from '@/hooks/useHeaderTheme';
import { HeaderTheme } from '@/store/header';

interface HeaderThemeObserverProps {
	theme: HeaderTheme;
}

export const HeaderThemeObserver = ({ theme }: HeaderThemeObserverProps) => {
	const ref = useHeaderTheme(theme) as React.RefObject<HTMLDivElement>;

	return (
		<div
			ref={ref}
			className="absolute inset-0 pointer-events-none -z-50 invisible"
			aria-hidden="true"
		/>
	);
};
