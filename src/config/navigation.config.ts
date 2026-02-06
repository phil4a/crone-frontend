import { PAGE } from './pages.config';

export interface IMenuItem {
	label: string;
	href: string;
	// icon?: React.ComponentType;
	// submenu?: IMenuItem[];
}

export const MAIN_MENU: IMenuItem[] = [
	{
		label: 'Услуги',
		href: PAGE.SERVICES,
	},
	{
		label: 'Объекты',
		href: PAGE.OBJECTS,
	},
	{
		label: 'О компании',
		href: PAGE.ABOUT,
	},
	{
		label: 'Контакты',
		href: PAGE.CONTACTS,
	},
	{
		label: 'Статьи',
		href: PAGE.ARTICLES,
	},
];

export const FOOTER_MENU: IMenuItem[] = [
	{ label: 'О компании', href: PAGE.ABOUT },
	{ label: 'Контакты', href: PAGE.CONTACTS },
	{ label: 'Услуги', href: PAGE.SERVICES },
];

export const OBJECTS_MENU: IMenuItem[] = [
	{ label: 'Тип объектов из клееного бруса 1', href: '#' },
	{ label: 'Тип объектов из клееного бруса 2', href: '#' },
	{ label: 'Тип объектов из клееного бруса 3', href: '#' },
	{ label: 'Тип объектов из клееного бруса 4', href: '#' },
];
