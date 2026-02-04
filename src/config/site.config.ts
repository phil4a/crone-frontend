import { pluralizeYears } from '@/lib/formatters/pluralize';

const FOUNDING_YEAR = 2009;

export const SITE_CONFIG = {
	name: 'Крона Групп',
	foundingYear: FOUNDING_YEAR,
	description:
		'Загородные дома из клееного бруса в Новосибирске. Проектирование и строительство под ключ от «Крона Групп».',
	metadata: {
		title:
			'Крона Групп — строительство домов и бань из клееного бруса в Новосибирске. Деревянный дом по индивидуальному проекту под ключ.',
		description:
			'Загородные дома из клееного бруса в Новосибирске. Проектирование и строительство под ключ от «Крона Групп». Закажите на сайте или по телефону.📞+7 (913) 925-92-99.',
	},
	advantages: [
		{
			number: pluralizeYears(new Date().getFullYear() - FOUNDING_YEAR),
			label: 'проектируем и строим',
		},
		{
			number: '200+',
			label: 'крупных проектов',
		},
		{
			number: '24/7',
			label: 'доступны для заказчиков',
		},
		{
			number: '5 лет',
			label: 'гарантия на работы по проекту',
		},
	],
	contacts: {
		phone: {
			label: '+7 (913) 925-92-99',
			href: 'tel:+79139259299',
		},
		email: {
			label: 'info@crone-group.ru',
			href: 'mailto:info@crone-group.ru',
		},
		socials: {
			telegram: '#',
			whatsapp: '#',
		},
	},
};
