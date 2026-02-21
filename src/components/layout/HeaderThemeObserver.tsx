'use client';

import { RefObject } from 'react';

import { HeaderTheme } from '@/store/header';

import { useHeaderTheme } from '@/hooks/useHeaderTheme';

interface HeaderThemeObserverProps {
	theme: HeaderTheme;
}

export const HeaderThemeObserver = ({ theme }: HeaderThemeObserverProps) => {
	const ref = useHeaderTheme(theme) as RefObject<HTMLDivElement>;

	return (
		<div
			ref={ref}
			className='absolute inset-0 pointer-events-none -z-50 invisible'
			aria-hidden='true'
		/>
	);
};
