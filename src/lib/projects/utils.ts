import { GetRelatedProjectsQuery } from '@/graphql/generated';
import { transformGraphQLProject } from '@/lib/transformers';
import { Project } from '@/types/project.types';

type RelatedProjectNode = NonNullable<NonNullable<GetRelatedProjectsQuery['posts']>['nodes']>[0];

/**
 * Shuffles an array of project nodes and returns a specified number of transformed projects.
 * @param nodes Array of project nodes from GraphQL query
 * @param count Number of projects to return (default: 3)
 */
export function getRandomProjects(
	nodes: RelatedProjectNode[] | null | undefined,
	count = 3
): Project[] {
	if (!nodes || nodes.length === 0) return [];

	// Create a shallow copy and shuffle
	// Using a more robust shuffle (Fisher-Yates) for better randomness, though Math.random sort is fine for small arrays
	const shuffled = [...nodes];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	// Slice and transform
	return shuffled.slice(0, count).map(transformGraphQLProject);
}
