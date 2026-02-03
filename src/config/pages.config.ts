class Page {
	HOME = '/';
	SERVICES = '/services';
	ABOUT = '/about';

	OBJECTS = '/projects';
	OBJECT(path: string) {
		return `${this.OBJECTS}/${path}`;
	}
	ARTICLES = '/articles';
	ARTICLE(path: string) {
		return `${this.ARTICLES}/${path}`;
	}
	CONTACTS = '/contacts';
}
export const PAGE = new Page();

export interface PageInfo {
	href: string;
	title: string;
}

export const PAGE_INFO = {
	HOME: { href: PAGE.HOME, title: 'Главная' },
	ABOUT: { href: PAGE.ABOUT, title: 'О компании' },
	SERVICES: { href: PAGE.SERVICES, title: 'Услуги' },
	OBJECTS: { href: PAGE.OBJECTS, title: 'Объекты' },
	ARTICLES: { href: PAGE.ARTICLES, title: 'Полезное' },
	CONTACTS: { href: PAGE.CONTACTS, title: 'Контакты' },
} as const;
