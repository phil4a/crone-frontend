import type { CookieConsentPreferences } from '@/types/cookies.types';

const KEY = 'cookie-consent:v1';
export const COOKIE_CONSENT_COOKIE_NAME = 'crone_cookie_consent';
const VERSION = '1.0.0';
const TTL_DAYS = 365;

function now(): number {
	return Date.now();
}

function daysToMs(days: number): number {
	return days * 24 * 60 * 60 * 1000;
}

function serializeConsentCookieValue(prefs: CookieConsentPreferences): string {
	const params = new URLSearchParams();
	params.set('v', prefs.version);
	params.set('a', prefs.analytics ? '1' : '0');
	params.set('m', prefs.marketing ? '1' : '0');
	params.set('ts', String(prefs.timestamp));
	params.set('exp', String(prefs.expiresAt));
	return params.toString();
}

export function parseConsentCookieValue(value: string | undefined): CookieConsentPreferences | null {
	if (!value) return null;
	try {
		const params = new URLSearchParams(value);
		const version = params.get('v') || VERSION;
		const analytics = params.get('a') === '1';
		const marketing = params.get('m') === '1';
		const timestamp = Number(params.get('ts') || NaN);
		const expiresAt = Number(params.get('exp') || NaN);

		if (!Number.isFinite(expiresAt)) return null;
		if (expiresAt < now()) return null;

		return {
			necessary: true,
			analytics,
			marketing,
			version,
			timestamp: Number.isFinite(timestamp) ? timestamp : now(),
			expiresAt
		};
	} catch {
		return null;
	}
}

function getCookieValue(name: string): string | undefined {
	if (typeof document === 'undefined') return undefined;
	const cookies = document.cookie ? document.cookie.split('; ') : [];
	for (const item of cookies) {
		const idx = item.indexOf('=');
		if (idx === -1) continue;
		const key = item.slice(0, idx);
		if (key !== name) continue;
		return item.slice(idx + 1);
	}
	return undefined;
}

function setConsentCookie(prefs: CookieConsentPreferences): void {
	if (typeof document === 'undefined') return;
	const maxAge = Math.max(0, Math.floor((prefs.expiresAt - now()) / 1000));
	const value = serializeConsentCookieValue(prefs);
	const parts = [
		`${COOKIE_CONSENT_COOKIE_NAME}=${value}`,
		`Path=/`,
		`Max-Age=${maxAge}`,
		`SameSite=Lax`
	];
	if (typeof location !== 'undefined' && location.protocol === 'https:') {
		parts.push('Secure');
	}
	document.cookie = parts.join('; ');
}

export function loadConsent(): CookieConsentPreferences | null {
	if (typeof window === 'undefined') return null;
	try {
		const cookieValue = getCookieValue(COOKIE_CONSENT_COOKIE_NAME);
		const fromCookie = parseConsentCookieValue(cookieValue);
		if (fromCookie) return fromCookie;

		const raw = window.localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as CookieConsentPreferences;
		if (!parsed || typeof parsed !== 'object') return null;
		if (!parsed.version || !parsed.expiresAt) return null;
		if (parsed.expiresAt < now()) return null;
		return parsed;
	} catch {
		return null;
	}
}

function saveConsent(prefs: CookieConsentPreferences): void {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(KEY, JSON.stringify(prefs));
	} catch {
		/* noop */
	}
	try {
		setConsentCookie(prefs);
	} catch {
		/* noop */
	}
}

export function acceptAll(): CookieConsentPreferences {
	const prefs: CookieConsentPreferences = {
		necessary: true,
		analytics: true,
		marketing: true,
		version: VERSION,
		timestamp: now(),
		expiresAt: now() + daysToMs(TTL_DAYS)
	};
	saveConsent(prefs);
	return prefs;
}

export function rejectAll(): CookieConsentPreferences {
	const prefs: CookieConsentPreferences = {
		necessary: true,
		analytics: false,
		marketing: false,
		version: VERSION,
		timestamp: now(),
		expiresAt: now() + daysToMs(TTL_DAYS)
	};
	saveConsent(prefs);
	return prefs;
}

export function savePreferences(
	prefs: Omit<CookieConsentPreferences, 'version' | 'timestamp' | 'expiresAt' | 'necessary'>
): CookieConsentPreferences {
	const next: CookieConsentPreferences = {
		necessary: true,
		analytics: prefs.analytics,
		marketing: prefs.marketing,
		version: VERSION,
		timestamp: now(),
		expiresAt: now() + daysToMs(TTL_DAYS)
	};
	saveConsent(next);
	return next;
}
