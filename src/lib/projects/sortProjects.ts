import { ProjectSort } from '@/types/filters.types';
import { Project } from '@/types/project.types';

export function sortProjects(projects: Project[], sort: ProjectSort): Project[] {
	if (sort === 'default') return projects;

	const items = [...projects];

	if (sort === 'title_asc') {
		items.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
	} else if (sort === 'title_desc') {
		items.sort((a, b) => b.title.localeCompare(a.title, 'ru'));
	} else if (sort === 'likes_desc') {
		items.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
	} else if (sort === 'area_desc') {
		items.sort((a, b) => (b.specs?.area ?? 0) - (a.specs?.area ?? 0));
	} else if (sort === 'area_asc') {
		items.sort((a, b) => (a.specs?.area ?? 0) - (b.specs?.area ?? 0));
	}

	return items;
}
