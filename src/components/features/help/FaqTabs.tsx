'use client';

import { parseAsStringEnum, useQueryState } from 'nuqs';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { FaqCategory } from '@/types/faq.types';

interface FaqTabsProps {
	categories: FaqCategory[];
	initialActiveId?: string;
	className?: string;
}

export function FaqTabs({ categories, initialActiveId, className }: FaqTabsProps) {
	const categoryIds = useMemo(() => categories.map(category => category.id), [categories]);
	const defaultActiveId = categoryIds[0] ?? '';
	const defaultTabId =
		initialActiveId && categoryIds.includes(initialActiveId) ? initialActiveId : defaultActiveId;

	const activeIdParser = useMemo(
		() => parseAsStringEnum(categoryIds).withDefault(defaultTabId),
		[categoryIds, defaultTabId]
	);

	const [activeId, setActiveId] = useQueryState('tab', activeIdParser);

	const resolvedActiveId = useMemo(() => {
		if (categories.some(category => category.id === activeId)) return activeId;
		return defaultTabId;
	}, [activeId, categories, defaultTabId]);

	if (categories.length === 0) return null;

	return (
		<section
			className={cn('w-full', className)}
			itemScope
			itemType='https://schema.org/FAQPage'
		>
			<div className='lg:grid lg:grid-cols-[280px_1fr] lg:gap-10'>
				<div
					role='tablist'
					aria-label='Категории вопросов'
					className='flex flex-wrap gap-2 rounded-2xl bg-light-beige p-2 lg:hidden'
				>
					{categories.map(category => {
						const isActive = category.id === resolvedActiveId;
						const tabId = `faq-tab-${category.id}`;
						const panelId = `faq-panel-${category.id}`;

						return (
							<button
								key={category.id}
								id={tabId}
								type='button'
								role='tab'
								aria-selected={isActive}
								aria-controls={panelId}
								tabIndex={isActive ? 0 : -1}
								onClick={() => setActiveId(category.id)}
								className={cn(
									'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
									isActive
										? 'bg-white text-main shadow-sm'
										: 'text-dark-gray hover:text-main hover:bg-white/60'
								)}
							>
								{category.title}
							</button>
						);
					})}
				</div>

				<aside className='hidden lg:block'>
					<div className='sticky top-28 rounded-2xl bg-light-beige p-2'>
						<div
							role='tablist'
							aria-label='Категории вопросов'
							aria-orientation='vertical'
							className='flex flex-col gap-1'
						>
							{categories.map(category => {
								const isActive = category.id === resolvedActiveId;
								const tabId = `faq-tab-${category.id}`;
								const panelId = `faq-panel-${category.id}`;

								return (
									<button
										key={category.id}
										id={tabId}
										type='button'
										role='tab'
										aria-selected={isActive}
										aria-controls={panelId}
										tabIndex={isActive ? 0 : -1}
										onClick={() => setActiveId(category.id)}
										className={cn(
											'w-full text-left px-4 py-2 rounded-xl font-medium transition-colors',
											isActive
												? 'bg-white text-main shadow-sm'
												: 'text-dark-gray hover:text-main hover:bg-white/60'
										)}
									>
										{category.title}
									</button>
								);
							})}
						</div>
					</div>
				</aside>

				<div className='mt-6 lg:mt-0'>
					{categories.map(category => {
						const isActive = category.id === resolvedActiveId;
						const tabId = `faq-tab-${category.id}`;
						const panelId = `faq-panel-${category.id}`;

						return (
							<div
								key={category.id}
								id={panelId}
								role='tabpanel'
								aria-labelledby={tabId}
								hidden={!isActive}
								className='space-y-3 w-full'
							>
								{category.items.map(item => (
									<div
										key={item.id}
										itemScope
										itemProp='mainEntity'
										itemType='https://schema.org/Question'
									>
										<details className='group rounded-2xl bg-white border border-light-beige px-5 py-4'>
											<summary className='cursor-pointer list-none select-none'>
												<div className='flex items-start justify-between gap-4'>
													<h3 className='text-lg font-semibold leading-snug'>
														<span itemProp='name'>{item.question}</span>
													</h3>
													<span
														aria-hidden='true'
														className='mt-0.5 text-dark-gray transition-transform group-open:rotate-180'
													>
														↓
													</span>
												</div>
											</summary>

											<div
												itemScope
												itemProp='acceptedAnswer'
												itemType='https://schema.org/Answer'
												className='pt-3'
											>
												<div
													itemProp='text'
													className='text-main leading-relaxed space-y-3'
												>
													{item.blocks.map((block, index) => {
														if (block.type === 'paragraph') {
															return (
																<p
																	key={index}
																	dangerouslySetInnerHTML={{ __html: block.html }}
																/>
															);
														}

														return (
															<ul
																key={index}
																className='list-disc pl-5 space-y-2'
															>
																{block.items.map((itemValue, itemIndex) => (
																	<li
																		key={itemIndex}
																		dangerouslySetInnerHTML={{ __html: itemValue.html }}
																	/>
																))}
															</ul>
														);
													})}
												</div>
											</div>
										</details>
									</div>
								))}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
