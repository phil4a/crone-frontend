/**
 * Склоняет слово в зависимости от числа
 * @param number Число
 * @param titles Массив слов [1 год, 2 года, 5 лет]
 */
export function declension(number: number, titles: [string, string, string]): string {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[
		number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
	];
}

/**
 * Склоняет слово "год" в зависимости от числа
 * @param years Количество лет
 */
export function pluralizeYears(years: number): string {
	return `${years} ${declension(years, ['год', 'года', 'лет'])}`;
}

export function pluralizeProjects(totalItems: number): string {
	return `${totalItems} ${declension(totalItems, ['проект', 'проекта', 'проектов'])}`;
}

export function pluralizeFloors(floors: number): string {
	return `${floors} ${declension(floors, ['этаж', 'этажа', 'этажей'])}`;
}

export function floorsLabel(floors: number): string {
	return declension(floors, ['этаж', 'этажа', 'этажей']);
}
