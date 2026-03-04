import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProxiedUrl(url: string) {
	if (url.startsWith('https://crone-group.ru/wp-content/')) {
		return url.replace('https://crone-group.ru', '');
	}
	return url;
}
