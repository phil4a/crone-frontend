import dynamic from 'next/dynamic';

const DynamicCreating = dynamic(() => import('./Creating').then(mod => mod.Creating));

export function LazyCreating() {
	return <DynamicCreating />;
}
