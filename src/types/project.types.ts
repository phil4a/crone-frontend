export interface ProjectImage {
	id: number;
	url: string;
	width?: number;
	height?: number;
	alt?: string;
}

export interface ProjectSpecs {
	area: number; // Parsed from string '344'
	rooms: number;
	floor: number; // Parsed from string '2'
	bedrooms: number; // Parsed from string '4'
	bathrooms: number | null; // Empty string -> null
	year: number;
	city: string;
	type: string;
	status: string;
}

export interface ProjectFeatures {
	terrace: boolean;
	garage: boolean;
	sauna: boolean;
	pool: boolean;
	fireplace: boolean;
}

export interface ProjectGalleries {
	plans: ProjectImage[];
	process: ProjectImage[];
	result: ProjectImage[];
}

export interface ProjectGalleryProps {
	title: string;
	projectAlt: string;
	items: ProjectImage[];
}

export interface ProjectVideos {
	main: string | null;
	gallery: ProjectImage[];
}

export interface Project {
	id: number;
	globalId?: string;
	slug: string;
	title: string;
	shortDescription: string;
	description: string; // HTML content
	coverImage: ProjectImage | null;
	specs: ProjectSpecs;
	features: ProjectFeatures;
	galleries: ProjectGalleries;
	videos: ProjectVideos;
	seo: {
		title: string;
		description: string;
		ogImage?: string;
	};
	likes: number;
	tags: string[]; // List of tag slugs
}
