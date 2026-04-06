import dynamic from 'next/dynamic';

import type { Project } from '@/types/project.types';

const DynamicProjectRelated = dynamic(() =>
	import('./ProjectRelated').then(mod => mod.ProjectRelated)
);

export function LazyProjectRelated({ relatedProjects }: { relatedProjects: Project[] }) {
	return <DynamicProjectRelated relatedProjects={relatedProjects} />;
}
