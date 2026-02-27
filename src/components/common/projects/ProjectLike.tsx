'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useProjectLikes } from '@/hooks/projects/useProjectLikes';

import { GetProjectLikesQuery, useLikeProjectMutation } from '@/graphql/generated';
import { cn } from '@/lib/utils';

interface ProjectLikeProps {
	projectId: string | number; // Support Global ID (string) or DB ID (number)
	initialLikes?: number;
	className?: string;
	textClassName?: string;
}

export function ProjectLike({
	projectId,
	initialLikes = 0,
	className,
	textClassName
}: ProjectLikeProps) {
	const storageKey = `project_like_${projectId}`;

	const [isLiked, setIsLiked] = useState(() => {
		if (typeof window === 'undefined') return false;
		return localStorage.getItem(storageKey) === 'true';
	});

	// Mutation hook
	const { mutateAsync: likeProject, isPending } = useLikeProjectMutation();
	const { likes: latestLikes, queryKey } = useProjectLikes(projectId);
	const queryClient = useQueryClient();
	const displayLikes = typeof latestLikes === 'number' ? latestLikes : initialLikes;

	const handleLike = async (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent link navigation
		e.stopPropagation();

		if (isPending) return;

		const prevLikes = displayLikes;
		const nextIsLiked = !isLiked;
		const nextLikes = nextIsLiked ? prevLikes + 1 : Math.max(0, prevLikes - 1);

		queryClient.setQueryData<GetProjectLikesQuery>(queryKey, previous => ({
			...previous,
			post: {
				...previous?.post,
				projectLikes: nextLikes
			}
		}));

		setIsLiked(nextIsLiked);

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
				queryClient.setQueryData<GetProjectLikesQuery>(queryKey, previous => ({
					...previous,
					post: {
						...previous?.post,
						projectLikes: serverLikes
					}
				}));
			}
		} catch (error) {
			console.error('Like toggle failed:', error);

			queryClient.setQueryData<GetProjectLikesQuery>(queryKey, previous => ({
				...previous,
				post: {
					...previous?.post,
					projectLikes: prevLikes
				}
			}));

			setIsLiked(!nextIsLiked);

			if (!nextIsLiked) {
				localStorage.setItem(storageKey, 'true');
			} else {
				localStorage.removeItem(storageKey);
			}
		}
	};

	return (
		<button
			onClick={handleLike}
			disabled={isPending}
			className={cn(
				'flex items-center gap-1.25 py-1.25 px-2.5 rounded-lg transition-all duration-300 cursor-pointer hover:bg-white',
				isLiked ? 'text-red-500 bg-white' : 'text-[#CCCCCC] bg-light-beige',
				isPending && 'opacity-70 cursor-not-allowed',
				className
			)}
			aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
		>
			<HeartIcon filled={isLiked} />
			<span className={cn('text-sm font-normal transition-colors text-main', textClassName)}>
				{displayLikes}
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
