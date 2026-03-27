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

function normalizeLines(markdown: string) {
	return markdown.replace(/\r\n/g, '\n').split('\n');
}

function nextNonEmptyLine(lines: string[], startIndex: number) {
	for (let i = startIndex; i < lines.length; i++) {
		const value = lines[i]?.trim();
		if (value) return value;
	}
	return null;
}

function isNumberedQuestionLine(line: string) {
	return /^\s*\d+\.\s+/.test(line);
}

function isCategoryHeaderLine(line: string) {
	return /^\s*##\s+/.test(line);
}

function isSubheadingLine(lines: string[], index: number) {
	const current = lines[index]?.trim();
	if (!current) return false;
	if (current.startsWith('#')) return false;
	if (current.endsWith('?')) return false;
	if (isNumberedQuestionLine(current)) return false;
	if (/^[-*]\s+/.test(current)) return false;

	const next = nextNonEmptyLine(lines, index + 1);
	if (!next) return false;

	return isNumberedQuestionLine(next);
}

function trimAnswerLine(line: string) {
	return line.replace(/^\s{1,4}/, '');
}

function parseAnswerBlocks(answerMarkdown: string): FaqAnswerBlock[] {
	const lines = normalizeLines(answerMarkdown);
	const blocks: FaqAnswerBlock[] = [];

	let paragraphLines: string[] = [];
	let listItems: string[] = [];

	const flushParagraph = () => {
		const text = paragraphLines
			.join(' ')
			.replace(/\s+/g, ' ')
			.trim();
		if (text) blocks.push({ type: 'paragraph', text });
		paragraphLines = [];
	};

	const flushList = () => {
		const items = listItems.map(i => i.trim()).filter(Boolean);
		if (items.length > 0) blocks.push({ type: 'list', items });
		listItems = [];
	};

	for (const rawLine of lines) {
		const line = rawLine.trim();

		if (!line) {
			flushParagraph();
			flushList();
			continue;
		}

		const listMatch = /^[-*]\s+(.*)$/.exec(line);
		if (listMatch) {
			flushParagraph();
			listItems.push(listMatch[1] ?? '');
			continue;
		}

		flushList();
		paragraphLines.push(line);
	}

	flushParagraph();
	flushList();

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

export function parseFaqMarkdown(markdown: string): FaqCategory[] {
	const lines = normalizeLines(markdown);

	const categories: FaqCategory[] = [];
	const categoryIdCounts = new Map<string, number>();
	const questionIdCounts = new Map<string, number>();

	let currentCategory: FaqCategory | null = null;
	let currentQuestion: string | null = null;
	let currentAnswerLines: string[] = [];

	const makeUniqueId = (base: string, map: Map<string, number>) => {
		const next = (map.get(base) ?? 0) + 1;
		map.set(base, next);
		return next === 1 ? base : `${base}-${next}`;
	};

	const startCategory = (title: string) => {
		const baseId = slugify(title);
		const id = makeUniqueId(baseId, categoryIdCounts);
		currentCategory = { id, title: title.trim(), items: [] };
		categories.push(currentCategory);
	};

	const flushItem = () => {
		if (!currentCategory || !currentQuestion) return;

		const rawAnswer = currentAnswerLines.map(trimAnswerLine).join('\n').trim();
		const blocks = parseAnswerBlocks(rawAnswer);
		const answerText = answerBlocksToText(blocks);

		const baseId = slugify(currentQuestion);
		const id = makeUniqueId(baseId, questionIdCounts);

		const item: FaqItem = {
			id,
			question: currentQuestion.trim(),
			answerText,
			blocks
		};

		currentCategory.items.push(item);
		currentQuestion = null;
		currentAnswerLines = [];
	};

	for (let index = 0; index < lines.length; index++) {
		const line = lines[index] ?? '';

		if (isCategoryHeaderLine(line)) {
			flushItem();
			const title = line.replace(/^\s*##\s+/, '').trim();
			if (title) startCategory(title);
			continue;
		}

		if (!currentQuestion && isSubheadingLine(lines, index)) {
			flushItem();
			startCategory(line.trim());
			continue;
		}

		const questionMatch = /^\s*\d+\.\s+(.*)$/.exec(line);
		if (questionMatch) {
			flushItem();
			currentQuestion = (questionMatch[1] ?? '').trim();
			currentAnswerLines = [];
			continue;
		}

		if (currentQuestion) {
			currentAnswerLines.push(line);
		}
	}

	flushItem();

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
