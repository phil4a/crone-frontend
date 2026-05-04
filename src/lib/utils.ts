import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getProxiedUrl(url: string) {
	const trimmed = url.trim();
	if (!trimmed) return url;

	if (trimmed.startsWith('/wp-content/')) {
		return `https://crone-group.ru${trimmed}`;
	}
	if (trimmed.startsWith('//crone-group.ru/wp-content/')) {
		return `https:${trimmed}`;
	}
	return trimmed;
}
