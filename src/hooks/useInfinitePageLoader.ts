'use client';

import { useEffect, useMemo, useRef } from 'react';

type MaybePromise<T> = T | Promise<T>;

interface UseInfinitePageLoaderOptions {
	itemsPerPage: number;
	page: number;
	loadedPages: number;
	hasNextPage: boolean | undefined;
	isLoading: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => MaybePromise<unknown>;
	onPageChange: (nextPage: number) => MaybePromise<unknown>;
	resetKey?: unknown;
}

export function useInfinitePageLoader<TElement extends HTMLElement>({
	itemsPerPage,
	page,
	loadedPages,
	hasNextPage,
	isLoading,
	isFetchingNextPage,
	fetchNextPage,
	onPageChange,
	resetKey
}: UseInfinitePageLoaderOptions) {
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<TElement | null>(null);
	const restoredScrollRef = useRef(false);
	const initialPageRef = useRef(page);
	const prevResetKeyRef = useRef(resetKey);

	const canLoadMore = useMemo(() => {
		if (!hasNextPage) return false;
		if (isLoading) return false;
		if (isFetchingNextPage) return false;
		return true;
	}, [hasNextPage, isFetchingNextPage, isLoading]);

	const getScrollOffset = () => {
		if (typeof window === 'undefined' || typeof document === 'undefined') return 0;

		const header = document.querySelector('header');
		const headerHeight = header instanceof HTMLElement ? header.getBoundingClientRect().height : 0;
		return headerHeight + 16;
	};

	useEffect(() => {
		if (Object.is(prevResetKeyRef.current, resetKey)) return;

		prevResetKeyRef.current = resetKey;
		initialPageRef.current = page;
		restoredScrollRef.current = false;
	}, [page, resetKey]);

	useEffect(() => {
		if (!canLoadMore) return;
		if (loadedPages >= page) return;

		void fetchNextPage();
	}, [canLoadMore, fetchNextPage, loadedPages, page]);

	useEffect(() => {
		if (restoredScrollRef.current) return;
		if (initialPageRef.current <= 1) return;
		if (page <= 1) return;
		if (loadedPages < page) return;

		const targetIndex = (page - 1) * itemsPerPage;
		const element = containerRef.current?.children.item(targetIndex);
		if (!(element instanceof HTMLElement)) return;

		const offset = getScrollOffset();
		const top = element.getBoundingClientRect().top + window.scrollY - offset;
		window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
		restoredScrollRef.current = true;
	}, [itemsPerPage, loadedPages, page]);

	useEffect(() => {
		const target = sentinelRef.current;
		if (!target) return;
		if (!hasNextPage) return;

		const observer = new IntersectionObserver(
			entries => {
				const entry = entries[0];
				if (!entry?.isIntersecting) return;
				if (!canLoadMore) return;
				if (loadedPages < page) return;

				void (async () => {
					await fetchNextPage();
					await onPageChange(page + 1);
				})();
			},
			{ rootMargin: '300px' }
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, [canLoadMore, fetchNextPage, hasNextPage, loadedPages, onPageChange, page]);

	const handleLoadMore = async () => {
		if (!canLoadMore) return;

		await fetchNextPage();
		await onPageChange(page + 1);
	};

	return {
		sentinelRef,
		containerRef,
		handleLoadMore
	};
}
