export interface ArticleImage {
	url: string;
	width?: number;
	height?: number;
	alt?: string;
}

export interface Article {
	id: number;
	globalId: string;
	title: string;
	slug: string;
	content: string;
	shortDescription: string;
	coverImage: ArticleImage | null;
	date: string;
	category: {
		name: string;
		slug: string;
	} | null;
	seo: {
		title: string;
		description: string;
	};
}
