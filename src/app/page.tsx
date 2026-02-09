import { Advantages } from '@/components/features/home/Advantages';
import { Features } from '@/components/features/home/Features';
import { Hero } from '@/components/features/home/Hero';
import { Projects } from '@/components/features/home/Projects';
import { Steps } from '@/components/features/home/Steps';
import { Creating } from '@/components/features/home/Creating';
import { Geography } from '@/components/features/home/Geography';
import { FeedbackForm } from '@/components/common/FeedbackForm';

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col">
			<Hero />
			<Advantages />
			<Features />
			<Creating />
			<Projects />
			<Geography />
			<Steps />
			<FeedbackForm />
		</main>
	);
}
