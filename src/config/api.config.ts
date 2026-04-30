export const API_PATHS = {
	POSTS: '/posts'
};

export const WP_ROOT_API_URL =
	process.env.NEXT_PUBLIC_API_URL?.replace('/wp/v2', '') || 'https://api.crone-group.ru/wp-json';

export const CONTACT_FORM7_FORM_ID = (() => {
	const raw = process.env.CONTACT_FORM_7_ID;
	if (!raw) {
		return null;
	}
	const parsed = Number(raw);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
})();

export function getContactForm7FeedbackEndpoint(formId: number) {
	return `${WP_ROOT_API_URL}/contact-form-7/v1/contact-forms/${formId}/feedback`;
}
