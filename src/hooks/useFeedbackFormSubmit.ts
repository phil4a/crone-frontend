import { useMutation } from '@tanstack/react-query';

import type {
	ContactFormSubmitErrorResponse,
	ContactFormSubmitRequest,
	ContactFormSubmitResponse
} from '@/types/feedback.types';

async function submitFeedbackForm(payload: ContactFormSubmitRequest): Promise<ContactFormSubmitResponse> {
	const response = await fetch('/api/contact', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	let json: ContactFormSubmitResponse | ContactFormSubmitErrorResponse | null = null;
	try {
		json = (await response.json()) as ContactFormSubmitResponse | ContactFormSubmitErrorResponse;
	} catch {
		json = null;
	}

	if (!response.ok) {
		const message = json && 'message' in json ? json.message : 'Не удалось отправить форму';
		throw new Error(message);
	}

	if (!json || !('ok' in json) || json.ok !== true) {
		throw new Error('Не удалось отправить форму');
	}

	return json;
}

export function useFeedbackFormSubmit() {
	return useMutation({
		mutationFn: submitFeedbackForm
	});
}
