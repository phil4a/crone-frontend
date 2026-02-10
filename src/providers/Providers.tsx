'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

const client = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={client}>
			<NuqsAdapter>{children}</NuqsAdapter>
			<Toaster
				position='top-center'
				richColors
				toastOptions={{
					style: {
						fontSize: '16px',
						fontFamily: 'var(--font-manrope)'
					},
					className: 'text-base font-light'
				}}
			/>
		</QueryClientProvider>
	);
}
