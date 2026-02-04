export interface ProjectItem {
	id: string;
	title: string;
	specs: string;
	image: string;
	href: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
	{
		id: '1',
		title: 'Дом на Лесном шоссе',
		specs: '2 этажа, 228 м²',
		image: 'https://crone-group.ru/wp-content/smush-webp/2024/11/dsc_5356-1024x699.jpg.webp',
		href: '/projects/1',
	},
	{
		id: '2',
		title: 'Усадьба в Алексеевке',
		specs: '2 этажа, 320 м²',
		image: 'https://crone-group.ru/wp-content/smush-webp/2024/11/dsc_5356-1024x699.jpg.webp',
		href: '/projects/2',
	},
	{
		id: '3',
		title: 'Шале на Ясном берегу',
		specs: '1 этаж, 190 м²',
		image: 'https://crone-group.ru/wp-content/smush-webp/2024/11/dsc_5356-1024x699.jpg.webp',
		href: '/projects/3',
	},
	{
		id: '4',
		title: 'Дом в Романово',
		specs: '1 этаж, 230 м²',
		image: 'https://crone-group.ru/wp-content/smush-webp/2024/11/dsc_5356-1024x699.jpg.webp',
		href: '/projects/4',
	},
	{
		id: '5',
		title: 'Дом в Сосновой роще',
		specs: '2 этажа, 270 м²',
		image: 'https://crone-group.ru/wp-content/smush-webp/2024/11/dsc_5356-1024x699.jpg.webp',
		href: '/projects/5',
	},
	{
		id: '6',
		title: 'Усадьба в Ногинске',
		specs: '2 этажа, 390 м²',
		image: 'https://crone-group.ru/wp-content/smush-webp/2024/11/dsc_5356-1024x699.jpg.webp',
		href: '/projects/6',
	},
];
