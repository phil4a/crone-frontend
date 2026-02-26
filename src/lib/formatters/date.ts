export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(date);
};
