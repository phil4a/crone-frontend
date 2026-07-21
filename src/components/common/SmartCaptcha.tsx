'use client';

import {
	type SmartCaptchaProps,
	InvisibleSmartCaptcha as YandexInvisibleSmartCaptcha
} from '@yandex/smart-captcha';

import { usePublicConfig } from '@/hooks/usePublicConfig';

import { cn } from '@/lib/utils';

interface SmartCaptchaWrapperProps {
	className?: string;
	onTokenChange: (token: string | null) => void;
	visible: boolean;
	onChallengeHidden?: SmartCaptchaProps['onChallengeHidden'];
	hideShield?: boolean;
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
	hideShield = true,
	language = 'ru',
	test,
	webview,
	host,
	theme
}: SmartCaptchaWrapperProps) {
	const { data: publicConfig } = usePublicConfig();
	const siteKey = publicConfig?.smartCaptchaSiteKey;

	if (!siteKey) {
		return null;
	}

	return (
		<div className={cn(className)}>
			<YandexInvisibleSmartCaptcha
				sitekey={siteKey}
				visible={visible}
				hideShield={hideShield}
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
