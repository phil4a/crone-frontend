import { useQuery } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';
import { useMemo } from 'react';

import { projectsSearchParams } from '@/config/search-params.config';

import { projectService } from '@/services/project.service';
import { Project } from '@/types/project.types';

export function useProjectsFiltering() {
	const [filters, setFilters] = useQueryStates(projectsSearchParams);

	// Fetch all projects (limit 100 for client-side filtering)
	const { data: projects, isLoading: isProjectsLoading } = useQuery({
		queryKey: ['projects', 'all'],
		queryFn: () => projectService.getProjectsByCategory('project', 100)
	});

	// Fetch tags for filter
	const { data: tags, isLoading: isTagsLoading } = useQuery({
		queryKey: ['tags'],
		queryFn: () => projectService.getProjectTags()
	});

	const filteredProjects = useMemo(() => {
		if (!projects) return [];

		return projects
			.filter(project => {
				// Filter by Tags (Project Type)
				if (filters.tags.length > 0) {
					// Check if project has AT LEAST ONE of the selected tags
					const hasMatchingTag = filters.tags.some(tagSlug => project.tags.includes(tagSlug));
					if (!hasMatchingTag) return false;
				}

				// Filter by Area
				if (filters.minArea && project.specs.area < filters.minArea) return false;
				if (filters.maxArea && project.specs.area > filters.maxArea) return false;

				// Filter by Floors
				if (filters.floors.length > 0 && !filters.floors.includes(project.specs.floor))
					return false;

				// Filter by Bedrooms
				if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(project.specs.bedrooms))
					return false;

				// Filter by Status
				if (filters.status && project.specs.status !== filters.status) return false;

				return true;
			})
			.sort((a, b) => {
				switch (filters.sort) {
					case 'oldest':
						return a.id - b.id; // Simple ID sort for "oldest"
					case 'area_asc':
						return a.specs.area - b.specs.area;
					case 'area_desc':
						return b.specs.area - a.specs.area;
					case 'newest':
					default:
						return b.id - a.id;
				}
			});
	}, [projects, filters]);

	// Pagination
	const PAGE_SIZE = 6;
	const totalCount = filteredProjects.length;
	const totalPages = Math.ceil(totalCount / PAGE_SIZE);
	const currentPage = Math.min(Math.max(1, filters.page), totalPages || 1);

	const paginatedProjects = useMemo(() => {
		const start = (currentPage - 1) * PAGE_SIZE;
		const end = start + PAGE_SIZE;
		return filteredProjects.slice(start, end);
	}, [filteredProjects, currentPage]);

	return {
		projects: paginatedProjects,
		isLoading: isProjectsLoading || isTagsLoading,
		filters,
		setFilters,
		tags,
		pagination: {
			currentPage,
			totalPages,
			totalCount,
			setPage: (page: number) => setFilters({ page })
		}
	};
}
