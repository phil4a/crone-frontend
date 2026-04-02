import { FeedbackForm } from '@/components/common/FeedbackForm';
import { Advantages } from '@/components/features/home/Advantages';
import { Hero } from '@/components/features/home/Hero';
import { Projects } from '@/components/features/home/Projects';
import { Steps } from '@/components/features/home/Steps';
import { LazyCreating } from '@/components/features/home/creating/LazyCreating';
import { LazyFeatures } from '@/components/features/home/features/LazyFeatures';
import { LazyGeography } from '@/components/features/home/geography/LazyGeography';
import { ViewportLazy } from '@/components/layout/ViewportLazy';

export default function HomePage() {
	return (
		<main className='flex min-h-screen flex-col'>
			<Hero />
			<Advantages />
			<LazyFeatures />
			<ViewportLazy rootMargin='700px'>
				<LazyCreating />
			</ViewportLazy>
			<Projects />
			<ViewportLazy rootMargin='800px'>
				<LazyGeography />
			</ViewportLazy>
			<Steps />
			<FeedbackForm formId={225} />
		</main>
	);
}
