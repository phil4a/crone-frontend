export const formatValue = (value: number | null | undefined, suffix?: string) => {
	if (!value || value <= 0) return null;
	return suffix ? `${value} ${suffix}` : String(value);
};
