import { FeedbackForm } from '@/components/common/FeedbackForm';
import { Advantages } from '@/components/features/home/Advantages';
import { Hero } from '@/components/features/home/Hero';
import { Projects } from '@/components/features/home/Projects';
import { Steps } from '@/components/features/home/Steps';
import { LazyCreating } from '@/components/features/home/creating/LazyCreating';
import { LazyFeatures } from '@/components/features/home/features/LazyFeatures';
import { Geography } from '@/components/features/home/geography/Geography';
import { ViewportLazy } from '@/components/layout/ViewportLazy';

export default function HomePage() {
	return (
		<main className='flex min-h-screen flex-col'>
			<Hero />
			<Advantages />
			<LazyFeatures />
			<ViewportLazy rootMargin='500px'>
				<LazyCreating />
			</ViewportLazy>
			<Projects />
			<Geography />
			<Steps />
			<FeedbackForm formId={225} />
		</main>
	);
}
