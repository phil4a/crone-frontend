import dynamic from 'next/dynamic';

const DynamicGeography = dynamic(() => import('./Geography').then(mod => mod.Geography));

export function LazyGeography() {
	return <DynamicGeography />;
}
