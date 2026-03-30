import { Lexer, Parser, TextRenderer, marked } from 'marked';
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

const textRenderer = new TextRenderer();
const inlineParser = new Parser();

function normalizeText(value: string) {
	return value.replace(/\s+/g, ' ').trim();
}

function inlineMarkdownToText(value: string) {
	return normalizeText(inlineParser.parseInline(Lexer.lexInline(value), textRenderer));
}

function isHeading2(token: Token): token is Tokens.Heading {
	return token.type === 'heading' && typeof (token as Tokens.Heading).depth === 'number';
}

function isList(token: Token): token is Tokens.List {
	return token.type === 'list' && typeof (token as Tokens.List).ordered === 'boolean';
}

function parseAnswerBlocks(answerMarkdown: string): FaqAnswerBlock[] {
	const tokens = marked.lexer(answerMarkdown);
	const blocks: FaqAnswerBlock[] = [];

	for (const token of tokens) {
		if (token.type === 'space') continue;

		if (token.type === 'paragraph') {
			const paragraph = inlineMarkdownToText(token.text);
			if (paragraph) blocks.push({ type: 'paragraph', text: paragraph });
			continue;
		}

		if (token.type === 'text') {
			const paragraph = inlineMarkdownToText(token.text);
			if (paragraph) blocks.push({ type: 'paragraph', text: paragraph });
			continue;
		}

		if (isList(token) && !token.ordered) {
			const items = token.items
				.map((item: Tokens.ListItem) => inlineMarkdownToText(item.text))
				.filter(Boolean);

			if (items.length > 0) blocks.push({ type: 'list', items });
		}
	}

	return blocks;
}

function answerBlocksToText(blocks: FaqAnswerBlock[]) {
	return blocks
		.map(block => {
			if (block.type === 'paragraph') return block.text;
			return block.items.join('\n');
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
				const itemSource = listItem.raw.replace(/^\s*\d+\.\s+/, '').trim();
				const match = /^\*\*(.+?)\*\*(?:\s+|$)([\s\S]*)$/.exec(itemSource);

				const questionMarkdown = (match?.[1] ?? itemSource).trim();
				const answerMarkdown = (match?.[2] ?? '').trim();
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
