'use client';

import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/components/ui/SkeletonLoader';

export const ProjectLikeClient = dynamic(
	() => import('./ProjectLike').then(module => module.ProjectLike),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='w-15.25 h-7.5 rounded-lg' />
	}
);
