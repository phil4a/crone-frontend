import { type NextRequest, NextResponse } from 'next/server';

import vkRedirects from './redirects/vk-articles.json';

// Карта «старый slug → новый slug» из админки плагина VK Auto Publisher
const redirects = vkRedirects as Record<string, string>;

const PREFIX = '/articles/';

export function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;
	if (!pathname.startsWith(PREFIX)) return NextResponse.next();

	let slug: string;
	try {
		slug = decodeURIComponent(pathname.slice(PREFIX.length)).replace(/\/$/, '').toLowerCase();
	} catch {
		return NextResponse.next();
	}

	const target = redirects[slug];
	if (!target) return NextResponse.next();

	const url = req.nextUrl.clone(); // query (?category=blog) сохраняется
	url.pathname = PREFIX + target;
	return NextResponse.redirect(url, 301);
}

export const config = {
	matcher: '/articles/:slug*'
};
