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
