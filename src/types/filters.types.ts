export type ProjectSort =
	| 'default'
	| 'title_asc'
	| 'title_desc'
	| 'likes_desc'
	| 'area_desc'
	| 'area_asc';

export interface ProjectFiltersData {
	tag: string | null;
	area: { min: number; max: number } | null;
	floor: number[] | null;
	bedrooms: { min: number; max: number } | null;
	status: string[] | null;
}
