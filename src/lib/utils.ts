import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Origin WordPress (где лежат /wp-content/uploads). Берётся из NEXT_PUBLIC_API_URL.
const WP_ORIGIN = (() => {
	try {
		return process.env.NEXT_PUBLIC_API_URL
			? new URL(process.env.NEXT_PUBLIC_API_URL).origin
			: 'https://api.crone-group.ru';
	} catch {
		return 'https://api.crone-group.ru';
	}
})();

export function getProxiedUrl(url: string) {
	const trimmed = url.trim();
	if (!trimmed) return url;

	if (trimmed.startsWith('/wp-content/')) {
		return `${WP_ORIGIN}${trimmed}`;
	}
	if (trimmed.startsWith('//crone-group.ru/wp-content/')) {
		return `${WP_ORIGIN}${trimmed.slice('//crone-group.ru'.length)}`;
	}
	return trimmed;
}
