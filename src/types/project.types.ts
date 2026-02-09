export interface ProjectImage {
	id: number;
	url: string;
	width?: number;
	height?: number;
	alt?: string;
}

export interface ProjectSpecs {
	area: number; // Parsed from string '344'
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

export interface Project {
	id: number;
	slug: string;
	title: string;
	shortDescription: string;
	description: string; // HTML content
	coverImage: ProjectImage | null;
	specs: ProjectSpecs;
	features: ProjectFeatures;
	galleries: ProjectGalleries;
	seo: {
		title: string;
		description: string;
		ogImage?: string;
	};
}
