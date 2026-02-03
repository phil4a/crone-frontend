import { Advantages } from '@/components/features/home/Advantages';
import { Hero } from '@/components/features/home/Hero';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col">
			<Hero />
			<Advantages />
		</main>
	);
}
