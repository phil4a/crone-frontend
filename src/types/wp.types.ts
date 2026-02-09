export interface WPRendered {
	rendered: string;
	protected?: boolean;
}

export interface WPGuid {
	rendered: string;
}

export interface WPMeta {
	_acf_changed: boolean;
	footnotes: string;
	[key: string]: any;
}

export interface WPACFProject {
	'project-video': string;
	status: string; // 'Завершен' | 'В процессе' etc.
	'short-description': string;
	area: string; // '344'
	rooms: string;
	floor: string; // '2'
	type: string; // 'Частный дом'
	bedrooms: string; // '4'
	bathrooms: string;
	terrace: boolean;
	garage: boolean;
	sauna: boolean;
	pool: boolean;
	fireplace: boolean;
	year: number;
	city: string;
	'plans-gallery': number[] | false; // WordPress ACF sometimes returns false for empty fields
	'process-gallery': number[] | false;
	'result-gallery': number[] | false;
	'video-gallery': string;
}

export interface WPMediaDetails {
	width: number;
	height: number;
	file: string;
	sizes: {
		[key: string]: {
			file: string;
			width: number;
			height: number;
			mime_type: string;
			source_url: string;
		};
	};
}

export interface WPEmbeddedMedia {
	id: number;
	date: string;
	slug: string;
	type: 'attachment';
	title: WPRendered;
	caption: WPRendered;
	alt_text: string;
	media_type: 'image' | 'file';
	mime_type: string;
	media_details: WPMediaDetails;
	source_url: string;
}

export interface WPEmbeddedAuthor {
	id: number;
	name: string;
	url: string;
	description: string;
	link: string;
	slug: string;
	avatar_urls: {
		[key: string]: string;
	};
}

export interface WPEmbedded {
	author?: WPEmbeddedAuthor[];
	'wp:featuredmedia'?: WPEmbeddedMedia[];
	'wp:attachment'?: WPEmbeddedMedia[];
	'wp:term'?: any[]; // Simplified for now
}

export interface WPProject {
	id: number;
	date: string;
	date_gmt: string;
	guid: WPGuid;
	modified: string;
	modified_gmt: string;
	slug: string;
	status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
	type: 'post' | 'page' | 'project'; // Assuming 'project' custom post type or just 'post' used as project
	link: string;
	title: WPRendered;
	content?: WPRendered; // Made optional
	excerpt?: WPRendered; // Made optional
	author?: number; // Made optional
	featured_media: number;
	comment_status?: string;
	ping_status?: string;
	sticky?: boolean;
	template?: string;
	format?: string;
	meta?: WPMeta;
	categories?: number[];
	tags?: number[];
	class_list?: string[];
	acf: WPACFProject;
	_embedded?: WPEmbedded;
	yoast_head?: string;
	yoast_head_json?: any; // Detailed Yoast JSON structure can be complex
}

export interface WPCategory {
	id: number;
	count: number;
	description: string;
	link: string;
	name: string;
	slug: string;
	taxonomy: 'category';
	parent: number;
	meta: any[];
}
