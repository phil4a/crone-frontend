import { useQuery } from '@tanstack/react-query';

import { projectService } from '@/services/project.service';

export function useProjects(limit: number = 6) {
	return useQuery({
		queryKey: ['projects', limit],
		queryFn: () => projectService.getProjectsPreview(limit)
	});
}
