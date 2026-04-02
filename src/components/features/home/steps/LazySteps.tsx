import dynamic from 'next/dynamic';

const DynamicSteps = dynamic(() => import('./Steps').then(mod => mod.Steps));

export function LazySteps() {
	return <DynamicSteps />;
}
