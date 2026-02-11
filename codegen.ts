import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'https://crone-group.ru/graphql',
	documents: 'src/graphql/**/*.graphql',
	generates: {
		'src/graphql/generated.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
			config: {
				fetcher: {
					func: '@/api/graphql#fetcher',
					isReactHook: false
				},
				exposeQueryKeys: true,
				addInfiniteQuery: true,
				reactQueryVersion: 5
			}
		}
	}
};

export default config;
