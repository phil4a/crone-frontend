'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { projectService } from '@/services/project.service';

interface ProjectLikeProps {
	projectId: number;
	initialLikes?: number;
	className?: string;
}

export function ProjectLike({ projectId, initialLikes = 0, className }: ProjectLikeProps) {
	const [likes, setLikes] = useState(initialLikes);
	const [isLiked, setIsLiked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Key for localStorage
	const storageKey = `project_like_${projectId}`;

	// Initialize state from localStorage on client side
	useEffect(() => {
		setMounted(true);
		const liked = localStorage.getItem(storageKey) === 'true';
		setIsLiked(liked);

		// If liked locally but initialLikes is 0 (maybe API didn't return it),
		// we keep 0 or optimistically assume at least 1?
		// Better to trust API for count, and local for status.
		// If API returned 0 but we liked it, maybe someone reset likes on server?
		// We'll stick to API count + local status visually.
	}, [storageKey]);

	const handleLike = async (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent link navigation if inside a card link
		e.stopPropagation();

		if (isLoading) return;

		setIsLoading(true);
		const type = isLiked ? 'unlike' : 'like';

		// Optimistic update
		const prevLikes = likes;
		const prevIsLiked = isLiked;

		setLikes(prev => (type === 'like' ? prev + 1 : Math.max(0, prev - 1)));
		setIsLiked(!isLiked);

		try {
			const result = await projectService.toggleLike(projectId, type);

			if (result) {
				setLikes(result.likes);
				// Update localStorage
				if (type === 'like') {
					localStorage.setItem(storageKey, 'true');
				} else {
					localStorage.removeItem(storageKey);
				}
			} else {
				// Revert on failure
				setLikes(prevLikes);
				setIsLiked(prevIsLiked);
			}
		} catch (error) {
			setLikes(prevLikes);
			setIsLiked(prevIsLiked);
		} finally {
			setIsLoading(false);
		}
	};

	// Don't render interactive parts until mounted to avoid hydration mismatch
	if (!mounted) {
		return (
			<div
				className={cn(
					'flex items-center text-[#CCCCCC] bg-light-beige gap-1.25 py-1.25 px-2.5 rounded-lg transition-colors duration-300',
					className
				)}
			>
				<HeartIcon />
				<span className='text-sm font-normal text-main'>{initialLikes}</span>
			</div>
		);
	}

	return (
		<button
			onClick={handleLike}
			disabled={isLoading}
			className={cn(
				'flex items-center gap-1.25 py-1.25 px-2.5 rounded-lg transition-all duration-300 cursor-pointer hover:bg-white',
				isLiked ? 'text-red-500 bg-white' : 'text-[#CCCCCC] bg-light-beige',
				isLoading && 'opacity-70 cursor-not-allowed',
				className
			)}
			aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
		>
			<HeartIcon filled={isLiked} />
			<span className={cn('text-sm font-normal transition-colors text-main')}>{likes}</span>
		</button>
	);
}

function HeartIcon({ filled }: { filled?: boolean }) {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='transition-transform duration-300 active:scale-90'
		>
			<path
				d='M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z'
				fill={filled ? 'currentColor' : 'currentColor'}
				stroke={filled ? 'none' : 'none'} // The original design had fill="currentColor" (gray)
			/>
		</svg>
	);
}
