import { marked } from 'marked';
import type { Token, Tokens } from 'marked';

import { FaqAnswerBlock, FaqCategory, FaqItem } from '@/types/faq.types';

function slugify(value: string) {
	const slug = value
		.toLowerCase()
		.replace(/ё/g, 'е')
		.replace(/[^a-z0-9\u0430-\u044f]+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');

	return slug || 'section';
}

function normalizeText(value: string) {
	return value.replace(/\s+/g, ' ').trim();
}

function isSafeHref(href: string) {
	const value = href.trim().toLowerCase();
	if (!value) return false;
	if (value.startsWith('/')) return true;
	if (value.startsWith('#')) return true;
	if (value.startsWith('http://')) return true;
	if (value.startsWith('https://')) return true;
	if (value.startsWith('mailto:')) return true;
	if (value.startsWith('tel:')) return true;
	return false;
}

function escapeHtmlText(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function decodeHtmlEntities(value: string) {
	return value
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}

function sanitizeFaqInlineHtml(html: string) {
	const withoutDisallowedTags = html.replace(/<(?!\/?(?:strong|em|del|code|br|a)\b)[^>]*>/gi, '');

	const normalizedTags = withoutDisallowedTags.replace(
		/<(strong|em|del|code)\b[^>]*>/gi,
		(_match, tagName: string) => `<${tagName.toLowerCase()}>`
	);

	const withSafeLinks = normalizedTags.replace(/<a\b[^>]*>/gi, match => {
		const hrefMatch =
			/\bhref\s*=\s*"([^"]*)"/i.exec(match) ||
			/\bhref\s*=\s*'([^']*)'/i.exec(match) ||
			/\bhref\s*=\s*([^\s>]+)/i.exec(match);

		const href = hrefMatch?.[1]?.trim() ?? '';
		if (!isSafeHref(href)) return '';

		const safeHref = escapeHtmlText(href);
		const isExternal = /^https?:\/\//i.test(href);
		const extra = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';

		return `<a href="${safeHref}"${extra}>`;
	});

	return withSafeLinks;
}

function htmlToText(html: string) {
	const withNewLines = html.replace(/<br\s*\/?>/gi, '\n');
	const withoutTags = withNewLines.replace(/<\/?[^>]+>/g, '');
	return decodeHtmlEntities(withoutTags);
}

function inlineMarkdownToHtml(value: string) {
	// Включаем breaks: true для поддержки переносов строк внутри абзацев
	const rawHtml = marked.parseInline(value, { async: false, gfm: true, breaks: true });
	return sanitizeFaqInlineHtml(String(rawHtml).trim());
}

function inlineMarkdownToText(value: string) {
	return normalizeText(htmlToText(inlineMarkdownToHtml(value)));
}

function isHeading2(token: Token): token is Tokens.Heading {
	return token.type === 'heading' && typeof (token as Tokens.Heading).depth === 'number';
}

function isList(token: Token): token is Tokens.List {
	return token.type === 'list' && typeof (token as Tokens.List).ordered === 'boolean';
}

function parseAnswerBlocks(answerMarkdown: string): FaqAnswerBlock[] {
	// Использование breaks: true, чтобы переносы строк в Markdown превращались в <br>
	const tokens = marked.lexer(answerMarkdown, { breaks: true, gfm: true });
	const blocks: FaqAnswerBlock[] = [];

	for (const token of tokens) {
		if (token.type === 'space') continue;

		if (token.type === 'paragraph') {
			const text = inlineMarkdownToText(token.text);
			// Включаем поддержку breaks при генерации html для абзацев
			const html = sanitizeFaqInlineHtml(
				String(marked.parseInline(token.text, { async: false, gfm: true, breaks: true })).trim()
			);
			if (text) blocks.push({ type: 'paragraph', text, html });
			continue;
		}

		if (token.type === 'text') {
			const text = inlineMarkdownToText(token.text);
			const html = sanitizeFaqInlineHtml(
				String(marked.parseInline(token.text, { async: false, gfm: true, breaks: true })).trim()
			);
			if (text) blocks.push({ type: 'paragraph', text, html });
			continue;
		}

		if (isList(token) && !token.ordered) {
			const items = token.items
				.map((item: Tokens.ListItem) => {
					const text = inlineMarkdownToText(item.text);
					if (!text) return null;
					const html = sanitizeFaqInlineHtml(
						String(marked.parseInline(item.text, { async: false, gfm: true, breaks: true })).trim()
					);
					return { text, html };
				})
				.filter((value): value is { text: string; html: string } => Boolean(value));

			if (items.length > 0) blocks.push({ type: 'list', items });
		}
	}

	return blocks;
}

function answerBlocksToText(blocks: FaqAnswerBlock[]) {
	return blocks
		.map(block => {
			if (block.type === 'paragraph') return block.text;
			return block.items.map(item => item.text).join('\n');
		})
		.join('\n')
		.trim();
}

function makeUniqueId(base: string, map: Map<string, number>) {
	const next = (map.get(base) ?? 0) + 1;
	map.set(base, next);
	return next === 1 ? base : `${base}-${next}`;
}

function isOrderedList(token: Token): token is Tokens.List {
	return isList(token) && token.ordered === true;
}

export function parseFaqMarkdown(markdown: string): FaqCategory[] {
	const tokens = marked.lexer(markdown);

	const categories: FaqCategory[] = [];
	const categoryIdCounts = new Map<string, number>();
	const questionIdCounts = new Map<string, number>();

	let currentCategory: FaqCategory | null = null;

	for (const token of tokens) {
		if (isHeading2(token) && token.depth === 2) {
			const title = inlineMarkdownToText(token.text);
			if (title) {
				const baseId = slugify(title);
				const id = makeUniqueId(baseId, categoryIdCounts);
				currentCategory = { id, title: title.trim(), items: [] };
				categories.push(currentCategory);
			}
			continue;
		}

		if (!currentCategory) continue;
		const category = currentCategory;

		if (isOrderedList(token)) {
			for (const listItem of token.items) {
				const itemSource = listItem.raw.replace(/^\s*\d+\.\s+/, '');
				const match = /^\s*\*\*(.+?)\*\*(?:[ \t]*\r?\n|[ \t]+)?([\s\S]*)$/.exec(itemSource);

				const questionMarkdown = (match?.[1] ?? itemSource).trim();

				// Here we un-indent the answer markdown so marked can parse lists and paragraphs correctly
				// The lines inside a list item usually have a 3-space or 4-space indent
				const rawAnswerMarkdown = match?.[2] ?? '';

				// Find the minimum indent of non-empty lines in the answer
				const answerLines = rawAnswerMarkdown.split('\n');
				let minIndent = Infinity;
				for (const line of answerLines) {
					if (line.trim().length === 0) continue;
					const indentMatch = line.match(/^(\s+)/);
					if (indentMatch) {
						minIndent = Math.min(minIndent, indentMatch[1].length);
					} else {
						minIndent = 0;
						break;
					}
				}

				// Strip the minimum indent from all lines
				const answerMarkdown = answerLines
					.map(line => {
						if (line.trim().length === 0) return '';
						return minIndent > 0 && minIndent !== Infinity ? line.substring(minIndent) : line;
					})
					// IMPORTANT: Remove leading empty lines before joining
					.filter((line, index, arr) => {
						// Keep all non-empty lines
						if (line.trim().length > 0) return true;
						// Only keep empty lines if there's already been a non-empty line before it
						const hasTextBefore = arr.slice(0, index).some(l => l.trim().length > 0);
						return hasTextBefore;
					})
					.join('\n')
					.trim();

				const question = inlineMarkdownToText(questionMarkdown);
				if (!question) continue;

				const blocks = parseAnswerBlocks(answerMarkdown);
				const answerText = answerBlocksToText(blocks);

				const baseId = slugify(question);
				const id = makeUniqueId(baseId, questionIdCounts);

				const item: FaqItem = {
					id,
					question,
					answerText,
					blocks
				};

				category.items.push(item);
			}
		}
	}

	return categories.filter(c => c.items.length > 0);
}

export function buildFaqJsonLd(categories: FaqCategory[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: categories.flatMap(category =>
			category.items.map(item => ({
				'@type': 'Question',
				name: item.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: item.answerText
				}
			}))
		)
	};
}
