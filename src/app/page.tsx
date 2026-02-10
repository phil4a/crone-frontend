import { FeedbackForm } from '@/components/common/FeedbackForm';
import { Advantages } from '@/components/features/home/Advantages';
import { Creating } from '@/components/features/home/Creating';
import { Features } from '@/components/features/home/Features';
import { Geography } from '@/components/features/home/Geography';
import { Hero } from '@/components/features/home/Hero';
import { Projects } from '@/components/features/home/Projects';
import { Steps } from '@/components/features/home/Steps';

import { projectService } from '@/services/project.service';

export default async function HomePage() {
	const data = await projectService.getProjectsPreview(6);

	return (
		<main className='flex min-h-screen flex-col'>
			<Hero />
			<Advantages />
			<Features />
			<Creating />
			<Projects projects={data} />
			<Geography />
			<Steps />
			<FeedbackForm />
		</main>
	);
}
