import { NextRequest, NextResponse } from 'next/server';

import { getContactForm7FeedbackEndpoint } from '@/config/api.config';

import {
	type Cf7FeedbackResponse,
	type ContactFormSubmitErrorResponse,
	type ContactFormSubmitRequest,
	type ContactFormSubmitResponse,
	type SmartCaptchaValidateResponse
} from '@/types/feedback.types';

const USER_AGENT =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

function getCf7UnitTagMap(): Record<number, string> {
	const raw = process.env.CONTACT_FORM_7_UNIT_TAGS?.trim();
	if (!raw) {
		return {};
	}

	try {
		const parsed = JSON.parse(raw) as Record<string, unknown>;
		const result: Record<number, string> = {};
		for (const [key, value] of Object.entries(parsed)) {
			const id = Number(key);
			if (!Number.isFinite(id) || id <= 0) {
				continue;
			}
			if (typeof value === 'string' && value.trim()) {
				result[id] = value.trim();
			}
		}
		return result;
	} catch {
		return {};
	}
}

function getCf7UnitTag(formId: number): string {
	const env = process.env as Record<string, string | undefined>;
	const directKey = `CONTACT_FORM_7_UNIT_TAG_${formId}`;
	const direct = env[directKey]?.trim();
	if (direct) {
		return direct;
	}

	const mapped = getCf7UnitTagMap()[formId];
	if (mapped) {
		return mapped;
	}

	throw new Error('CF7_UNIT_TAG_REQUIRED');
}

function getCf7HiddenFields(formId: number): Record<string, string> {
	const unitTag = getCf7UnitTag(formId);
	const version = process.env.CONTACT_FORM_7_VERSION?.trim() || '5.9.8';
	const locale = process.env.CONTACT_FORM_7_LOCALE?.trim() || 'ru_RU';
	const containerPost = process.env.CONTACT_FORM_7_CONTAINER_POST?.trim() || '0';

	return {
		_wpcf7: String(formId),
		_wpcf7_version: version,
		_wpcf7_locale: locale,
		_wpcf7_unit_tag: unitTag,
		_wpcf7_container_post: containerPost,
		_wpcf7_posted_data_hash: '',
		_wpcf7_recaptcha_response: ''
	};
}

function getClientIp(request: NextRequest): string | null {
	const forwarded = request.headers.get('x-forwarded-for');
	if (forwarded) {
		const first = forwarded.split(',')[0]?.trim();
		if (first) {
			return first;
		}
	}
	const realIp = request.headers.get('x-real-ip');
	return realIp?.trim() || null;
}

function buildCf7Payload(data: ContactFormSubmitRequest, formId: number): FormData {
	const formData = new FormData();
	const hiddenFields = getCf7HiddenFields(formId);
	for (const [key, value] of Object.entries(hiddenFields)) {
		formData.set(key, value);
	}

	const name = data.name?.trim() ?? '';
	const phone = data.phone?.trim() ?? '';
	const email = data.email?.trim() ?? '';
	const message = data.message?.trim() ?? '';

	const mappings: Array<[string, string]> = [
		['your-name', name],
		['your-phone', phone],
		['your-email', email],
		['your-text', message]
	];

	for (const [key, value] of mappings) {
		formData.set(key, value);
	}

	return formData;
}

export async function POST(request: NextRequest) {
	let body: Partial<ContactFormSubmitRequest> | null = null;

	try {
		body = (await request.json()) as Partial<ContactFormSubmitRequest>;
	} catch {
		return NextResponse.json<ContactFormSubmitErrorResponse>(
			{ ok: false, message: 'Некорректное тело запроса' },
			{ status: 400 }
		);
	}

	const name = body?.name?.trim();
	const phone = body?.phone?.trim();
	const captchaToken = body?.captchaToken?.trim();

	if (!name || !phone) {
		return NextResponse.json<ContactFormSubmitErrorResponse>(
			{ ok: false, message: 'Заполните имя и телефон' },
			{ status: 400 }
		);
	}

	if (!captchaToken) {
		return NextResponse.json<ContactFormSubmitErrorResponse>(
			{ ok: false, message: 'Подтвердите, что вы не робот' },
			{ status: 400 }
		);
	}

	const secret = process.env.YANDEX_SMARTCAPTCHA_SERVER_KEY;
	if (!secret) {
		return NextResponse.json<ContactFormSubmitErrorResponse>(
			{ ok: false, message: 'Не настроен ключ SmartCaptcha на сервере' },
			{ status: 500 }
		);
	}

	const ip = getClientIp(request);
	const validateBody = new URLSearchParams();
	validateBody.set('secret', secret);
	validateBody.set('token', captchaToken);
	if (ip) {
		validateBody.set('ip', ip);
	}

	const captchaResponse = await fetch('https://smartcaptcha.cloud.yandex.ru/validate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		body: validateBody.toString(),
		cache: 'no-store'
	});

	let captchaJson: SmartCaptchaValidateResponse | null = null;
	try {
		captchaJson = (await captchaResponse.json()) as SmartCaptchaValidateResponse;
	} catch {
		captchaJson = null;
	}

	if (!captchaResponse.ok || !captchaJson || captchaJson.status !== 'ok') {
		return NextResponse.json<ContactFormSubmitErrorResponse>(
			{ ok: false, message: 'Не удалось пройти проверку капчи' },
			{ status: 400 }
		);
	}

	const rawFormId = body?.formId;
	const parsedFormId =
		typeof rawFormId === 'number'
			? rawFormId
			: typeof rawFormId === 'string'
				? Number(rawFormId)
				: null;

	if (!Number.isFinite(parsedFormId) || !parsedFormId || parsedFormId <= 0) {
		return NextResponse.json<ContactFormSubmitErrorResponse>(
			{ ok: false, message: 'Не задан ID формы' },
			{ status: 400 }
		);
	}
	const formId = parsedFormId as number;

	const cf7Endpoint = getContactForm7FeedbackEndpoint(formId);
	const wpOrigin = new URL(cf7Endpoint).origin;
	const cookieHeader = 'beget=begetok';
	let formData: FormData;
	try {
		formData = buildCf7Payload(
			{
				name,
				phone,
				email: body?.email,
				message: body?.message,
				captchaToken
			},
			formId
		);
	} catch (error) {
		const message =
			error instanceof Error && error.message === 'CF7_UNIT_TAG_REQUIRED'
				? `Не задан unit tag для формы ${formId}`
				: 'Не удалось подготовить данные для отправки формы';

		return NextResponse.json<ContactFormSubmitErrorResponse>(
			{ ok: false, message },
			{ status: 500 }
		);
	}

	const cf7Response = await fetch(cf7Endpoint, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Cookie: cookieHeader,
			Origin: wpOrigin,
			Referer: `${wpOrigin}/contacts/`,
			'User-Agent': USER_AGENT
		},
		body: formData,
		cache: 'no-store'
	});

	let cf7Json: Cf7FeedbackResponse | null = null;
	try {
		cf7Json = (await cf7Response.json()) as Cf7FeedbackResponse;
	} catch {
		cf7Json = null;
	}

	if (!cf7Response.ok || !cf7Json) {
		return NextResponse.json<ContactFormSubmitErrorResponse>(
			{ ok: false, message: 'Не удалось отправить форму' },
			{ status: 502 }
		);
	}

	if (cf7Json.status !== 'mail_sent') {
		return NextResponse.json<ContactFormSubmitErrorResponse>(
			{ ok: false, message: cf7Json.message || 'Форма заполнена некорректно', cf7: cf7Json },
			{ status: 400 }
		);
	}

	return NextResponse.json<ContactFormSubmitResponse>({ ok: true, cf7: cf7Json });
}
