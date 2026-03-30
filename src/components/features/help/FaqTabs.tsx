'use client';

import { useId, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { FaqCategory } from '@/types/faq.types';

interface FaqTabsProps {
	categories: FaqCategory[];
	className?: string;
}

export function FaqTabs({ categories, className }: FaqTabsProps) {
	const baseId = useId();
	const [activeId, setActiveId] = useState<string>(() => categories[0]?.id ?? '');

	const activeIndex = useMemo(() => {
		const index = categories.findIndex(c => c.id === activeId);
		return index >= 0 ? index : 0;
	}, [activeId, categories]);

	const resolvedActiveId = categories[activeIndex]?.id ?? '';

	if (categories.length === 0) return null;

	return (
		<section
			className={cn('w-full', className)}
			itemScope
			itemType='https://schema.org/FAQPage'
		>
			<div
				role='tablist'
				aria-label='Категории вопросов'
				className='flex flex-wrap gap-2 rounded-2xl bg-light-beige p-2'
			>
				{categories.map(category => {
					const isActive = category.id === resolvedActiveId;
					const tabId = `${baseId}-tab-${category.id}`;
					const panelId = `${baseId}-panel-${category.id}`;

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

			<div className='mt-6'>
				{categories.map(category => {
					const isActive = category.id === resolvedActiveId;
					const tabId = `${baseId}-tab-${category.id}`;
					const panelId = `${baseId}-panel-${category.id}`;

					return (
						<div
							key={category.id}
							id={panelId}
							role='tabpanel'
							aria-labelledby={tabId}
							hidden={!isActive}
							className='space-y-3'
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
												<h3 className='font-bold leading-snug'>
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
														return <p key={index}>{block.text}</p>;
													}

													return (
														<ul
															key={index}
															className='list-disc pl-5 space-y-2'
														>
															{block.items.map((value, itemIndex) => (
																<li key={itemIndex}>{value}</li>
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
		</section>
	);
}
