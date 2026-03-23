'use client';

import {
	type SmartCaptchaProps,
	InvisibleSmartCaptcha as YandexInvisibleSmartCaptcha
} from '@yandex/smart-captcha';

import { cn } from '@/lib/utils';

interface SmartCaptchaWrapperProps {
	className?: string;
	onTokenChange: (token: string | null) => void;
	visible: boolean;
	onChallengeHidden?: SmartCaptchaProps['onChallengeHidden'];
	language?: NonNullable<SmartCaptchaProps['language']>;
	test?: SmartCaptchaProps['test'];
	webview?: SmartCaptchaProps['webview'];
	host?: SmartCaptchaProps['host'];
	theme?: SmartCaptchaProps['theme'];
}

export function SmartCaptcha({
	className,
	onTokenChange,
	visible,
	onChallengeHidden,
	language = 'ru',
	test,
	webview,
	host,
	theme
}: SmartCaptchaWrapperProps) {
	const siteKey = process.env.NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_SITE_KEY;

	if (!siteKey) {
		return null;
	}

	return (
		<div className={cn(className)}>
			<YandexInvisibleSmartCaptcha
				sitekey={siteKey}
				visible={visible}
				language={language}
				test={test}
				webview={webview}
				host={host}
				theme={theme}
				onSuccess={token => onTokenChange(token || null)}
				onTokenExpired={() => onTokenChange(null)}
				onChallengeHidden={onChallengeHidden}
			/>
		</div>
	);
}
