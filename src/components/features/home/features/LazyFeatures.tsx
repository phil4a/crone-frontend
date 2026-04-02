import dynamic from 'next/dynamic';

const DynamicFeatures = dynamic(() => import('./Features').then(mod => mod.Features));

export function LazyFeatures() {
	return <DynamicFeatures />;
}
