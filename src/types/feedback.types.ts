export interface FeedbackFormValues {
	name: string;
	phone: string;
	email?: string;
	message?: string;
}

export interface ContactFormSubmitRequest extends FeedbackFormValues {
	captchaToken: string;
	formId?: number;
}

export interface SmartCaptchaValidateResponse {
	status: 'ok' | 'failed';
	message?: string;
}

export interface Cf7InvalidField {
	field: string;
	message: string;
}

export interface Cf7FeedbackResponse {
	contact_form_id: number;
	status: string;
	message: string;
	invalid_fields?: Cf7InvalidField[];
}

export interface ContactFormSubmitResponse {
	ok: true;
	cf7: Cf7FeedbackResponse;
}

export interface ContactFormSubmitErrorResponse {
	ok: false;
	message: string;
	cf7?: Cf7FeedbackResponse;
}
