export interface ProjectFiltersData {
	tag: string | null;
	area: { min: number; max: number } | null;
	floor: number | null;
	bedrooms: { min: number; max: number } | null;
	status: string | null;
}
