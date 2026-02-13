import { useGetTagsQuery } from '@/graphql/generated';

export const TAG_SEO_TITLES: Record<string, string> = {
	spa: 'Бани из клееного бруса',
	'kommercheskaya-nedvizhimost': 'Коммерческие объекты из клееного бруса'
};

export function useProjectTags() {
	const { data } = useGetTagsQuery();
	const tags = data?.tags?.nodes || [];

	const getPageTitle = (tag: string | null) => {
		if (!tag) return 'Дома из клееного бруса';

		const currentTag = tags.find(t => t.slug === tag);
		if (!currentTag) return 'Дома из клееного бруса';

		if (TAG_SEO_TITLES[currentTag.slug!]) {
			return TAG_SEO_TITLES[currentTag.slug!];
		}

		return `${currentTag.name} из клееного бруса`;
	};

	return {
		tags,
		getPageTitle
	};
}
