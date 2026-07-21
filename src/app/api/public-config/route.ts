import { NextResponse } from 'next/server';

import { type PublicConfig } from '@/types/config.types';

// Значения читаются в рантайме, а не вшиваются в бандл на этапе next build,
// поэтому один и тот же образ работает в любом окружении.
export const dynamic = 'force-dynamic';

export function GET() {
	const smartCaptchaSiteKey =
		process.env.YANDEX_SMARTCAPTCHA_SITE_KEY?.trim() ||
		process.env.NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_SITE_KEY?.trim() ||
		null;

	return NextResponse.json<PublicConfig>(
		{ smartCaptchaSiteKey },
		{ headers: { 'Cache-Control': 'no-store' } }
	);
}
