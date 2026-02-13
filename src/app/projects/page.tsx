import { Suspense } from 'react';

import { ProjectsContent } from '@/components/features/projects/ProjectsContent';
import { ProjectsSkeleton } from '@/components/features/projects/ProjectsSkeleton';

import { TAG_SEO_TITLES } from '@/hooks/projects/useProjectTags';

interface PageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectsPage(props: PageProps) {
	const searchParams = await props.searchParams;
	const tag = typeof searchParams.tag === 'string' ? searchParams.tag : undefined;

	const title = tag && TAG_SEO_TITLES[tag] ? TAG_SEO_TITLES[tag] : 'Дома из клееного бруса';

	return (
		<Suspense fallback={<ProjectsSkeleton title={title} />}>
			{/* <DebugWrapper> */}
			<ProjectsContent />
			{/* </DebugWrapper> */}
		</Suspense>
	);
}

// Helper to force Suspense fallback state for debugging/styling
// async function DebugWrapper({ children }: { children: React.ReactNode }) {
// 	// Delay for 1 hour to keep skeleton visible
// 	await new Promise(resolve => setTimeout(resolve, 3600000));
// 	return <>{children}</>;
// }
