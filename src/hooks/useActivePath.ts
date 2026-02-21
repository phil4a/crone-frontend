import { usePathname } from 'next/navigation';

export function useActivePath() {
	const pathname = usePathname() || '/';

	const isActivePath = (href: string) => {
		if (!href) return false;

		if (href === '/') {
			return pathname === '/';
		}

		if (pathname === href) {
			return true;
		}

		return pathname.startsWith(`${href}/`);
	};

	return { pathname, isActivePath };
}

