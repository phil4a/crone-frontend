import dynamic from 'next/dynamic';

import type { ProjectGalleryProps } from '@/types/project.types';

const DynamicProjectGallery = dynamic(() =>
	import('./ProjectGallery').then(mod => mod.ProjectGallery)
);

export function LazyProjectGallery(props: ProjectGalleryProps) {
	return (
		<DynamicProjectGallery
			title={props.title}
			projectAlt={props.projectAlt}
			items={props.items}
		/>
	);
}
