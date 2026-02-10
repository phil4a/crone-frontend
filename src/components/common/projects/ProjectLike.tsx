'use client';

import { useEffect, useOptimistic, useState, useTransition } from 'react';

import { cn } from '@/lib/utils';
import { projectService } from '@/services/project.service';

interface ProjectLikeProps {
	projectId: number;
	initialLikes?: number;
	className?: string;
}

interface LikeState {
	likes: number;
	isLiked: boolean;
}

export function ProjectLike({ projectId, initialLikes = 0, className }: ProjectLikeProps) {
	// Base state (synced with server/localStorage)
	const [state, setState] = useState<LikeState>({
		likes: initialLikes,
		isLiked: false
	});

	const [mounted, setMounted] = useState(false);
	const [isPending, startTransition] = useTransition();

	// Optimistic state handles the immediate UI feedback
	const [optimisticState, setOptimisticState] = useOptimistic(
		state,
		(currentState, newIsLiked: boolean) => ({
			likes: newIsLiked ? currentState.likes + 1 : Math.max(0, currentState.likes - 1),
			isLiked: newIsLiked
		})
	);

	// Key for localStorage
	const storageKey = `project_like_${projectId}`;

	// Initialize state from localStorage on client side
	useEffect(() => {
		setMounted(true);
		const liked = localStorage.getItem(storageKey) === 'true';

		if (liked) {
			setState(prev => ({
				...prev,
				isLiked: true
			}));
		}
	}, [storageKey]);

	const handleLike = (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent link navigation
		e.stopPropagation();

		if (isPending) return;

		const nextIsLiked = !state.isLiked;

		startTransition(async () => {
			// 1. Trigger optimistic update immediately
			setOptimisticState(nextIsLiked);

			try {
				// 2. Perform API call
				const type = nextIsLiked ? 'like' : 'unlike';
				const result = await projectService.toggleLike(projectId, type);

				if (result) {
					// 3. Update real state on success
					setState({
						likes: result.likes,
						isLiked: nextIsLiked
					});

					// 4. Update localStorage
					if (nextIsLiked) {
						localStorage.setItem(storageKey, 'true');
					} else {
						localStorage.removeItem(storageKey);
					}
				}
				// If result is null (error), we don't call setState.
				// React will discard the optimistic state automatically when transition ends,
				// reverting the UI to the previous `state`.
			} catch (error) {
				console.error('Like toggle failed:', error);
				// Automatic revert happens here too
			}
		});
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
			disabled={isPending}
			className={cn(
				'flex items-center gap-1.25 py-1.25 px-2.5 rounded-lg transition-all duration-300 cursor-pointer hover:bg-white',
				optimisticState.isLiked ? 'text-red-500 bg-white' : 'text-[#CCCCCC] bg-light-beige',
				isPending && 'opacity-70 cursor-not-allowed',
				className
			)}
			aria-label={optimisticState.isLiked ? 'Убрать лайк' : 'Поставить лайк'}
		>
			<HeartIcon filled={optimisticState.isLiked} />
			<span className={cn('text-sm font-normal transition-colors text-main')}>
				{optimisticState.likes}
			</span>
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
				stroke={filled ? 'none' : 'none'}
			/>
		</svg>
	);
}
