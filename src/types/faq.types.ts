export interface FaqAnswerBlockParagraph {
	type: 'paragraph';
	text: string;
	html: string;
}

export interface FaqAnswerBlockList {
	type: 'list';
	items: Array<{
		text: string;
		html: string;
	}>;
}

export type FaqAnswerBlock = FaqAnswerBlockParagraph | FaqAnswerBlockList;

export interface FaqItem {
	id: string;
	question: string;
	answerText: string;
	blocks: FaqAnswerBlock[];
}

export interface FaqCategory {
	id: string;
	title: string;
	items: FaqItem[];
}
