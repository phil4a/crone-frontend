export interface FeatureItem {
	title: string;
	text: string;
	image: string;
	link?: {
		href: string;
		label: string;
	};
}

export const FEATURES_DATA: FeatureItem[] = [
	{
		title: 'Индивидуально',
		text: 'Индивидуальный подход. Работаем по ТЗ заказчика, предлагаем новые решения. Реконструкция',
		image: '/images/features/c1.jpg',
	},
	{
		title: 'Современно',
		text: 'Проектирование и строительство домов в современных архитектурных стилях',
		image: '/images/features/c2.jpg',
	},
	{
		title: 'Качественно',
		text: 'Высокое качество материалов и комплектующих, использование передовых материалов и технологий',
		image: '/images/features/c3.jpg',
	},
	{
		title: 'Ответственно',
		text: 'ГЕНЕРАЛЬНЫЙ ПОДРЯДЧИК. Предоставляем полный комплекс услуг «под ключ»',
		image: '/images/features/c4.jpg',
	},
	{
		title: 'Надежно',
		text: '5 лет гарантии на наши работы. Обеспечиваем техническое обслуживание домов',
		image: '/images/features/c5.jpg',
	},
	{
		title: 'Профессионально',
		text: 'Строгое соблюдение сроков и условий контракта. Максимальная оперативность',
		image: '/images/features/c6.jpg',
	},
	{
		title: 'Квалифицированно',
		text: 'Помощь в выборе земельного участка. Посадка дома с учетом всех строительных норм и правил',
		image: '/images/features/c7.jpg',
	},
	{
		title: 'Комплексно',
		text: 'Опыт реализации масштабных застроек',
		image: '/images/features/c8.jpg',
		link: {
			href: '/projects',
			label: 'Посмотреть проекты',
		},
	},
];
