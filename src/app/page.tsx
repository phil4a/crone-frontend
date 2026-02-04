import { Advantages } from '@/components/features/home/Advantages';
import { Features } from '@/components/features/home/Features';
import { Hero } from '@/components/features/home/Hero';
import { Projects } from '@/components/features/home/Projects';

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col">
			<Hero />
			<Advantages />
			<Features />
			<Projects />
		</main>
	);
}
