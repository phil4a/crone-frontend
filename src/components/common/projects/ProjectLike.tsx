'use client';

import { useEffect, useState } from 'react';

// import { projectService } from '@/services/project.service';
// Assuming useLikeProjectMutation will be generated
import { useLikeProjectMutation } from '@/graphql/generated';
import { cn } from '@/lib/utils';

interface ProjectLikeProps {
	projectId: string | number; // Support Global ID (string) or DB ID (number)
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

	// Mutation hook
	const { mutateAsync: likeProject, isPending } = useLikeProjectMutation();

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

	const handleLike = async (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent link navigation
		e.stopPropagation();

		if (isPending) return;

		// 1. Calculate optimistic state
		const prevState = state;
		const nextIsLiked = !state.isLiked;
		const nextLikes = nextIsLiked ? state.likes + 1 : Math.max(0, state.likes - 1);

		// 2. Apply optimistic update immediately
		setState({
			likes: nextLikes,
			isLiked: nextIsLiked
		});

		// Update localStorage immediately for responsiveness
		if (nextIsLiked) {
			localStorage.setItem(storageKey, 'true');
		} else {
			localStorage.removeItem(storageKey);
		}

		try {
			// 3. Perform API call
			const type = nextIsLiked ? 'like' : 'unlike';

			const result = await likeProject({
				input: {
					postId: String(projectId),
					type: type
				}
			});

			const serverLikes = result.likeProject?.likes;

			if (typeof serverLikes === 'number') {
				// 4. Sync with exact server value (optional but safer)
				setState({
					likes: serverLikes,
					isLiked: nextIsLiked
				});
			}
		} catch (error) {
			console.error('Like toggle failed:', error);

			// 5. Revert on error
			setState(prevState);

			if (prevState.isLiked) {
				localStorage.setItem(storageKey, 'true');
			} else {
				localStorage.removeItem(storageKey);
			}
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
			disabled={isPending}
			className={cn(
				'flex items-center gap-1.25 py-1.25 px-2.5 rounded-lg transition-all duration-300 cursor-pointer hover:bg-white',
				state.isLiked ? 'text-red-500 bg-white' : 'text-[#CCCCCC] bg-light-beige',
				isPending && 'opacity-70 cursor-not-allowed',
				className
			)}
			aria-label={state.isLiked ? 'Убрать лайк' : 'Поставить лайк'}
		>
			<HeartIcon filled={state.isLiked} />
			<span className={cn('text-sm font-normal transition-colors text-main')}>{state.likes}</span>
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
