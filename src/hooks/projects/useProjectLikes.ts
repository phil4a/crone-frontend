import { PostIdType, useGetProjectLikesQuery } from '@/graphql/generated';

export function useProjectLikes(projectId: string | number) {
	const idString = String(projectId);
	const idType =
		typeof projectId === 'number' || /^\d+$/.test(idString) ? PostIdType.DatabaseId : PostIdType.Id;

	const variables = {
		id: idString,
		idType
	};

	const { data, isLoading, error } = useGetProjectLikesQuery(variables, {
		enabled: Boolean(projectId)
	});

	return {
		likes: data?.post?.projectLikes ?? null,
		variables,
		queryKey: useGetProjectLikesQuery.getKey(variables),
		isLoading,
		error
	};
}
