import { resolveWordpressGraphqlEndpoint } from '@/api/wordpress-endpoint';

function graphqlError(message: string, status: number) {
	return new Response(JSON.stringify({ errors: [{ message }] }), {
		status,
		headers: { 'Content-Type': 'application/json' }
	});
}

export async function POST(request: Request) {
	const { endpoint } = resolveWordpressGraphqlEndpoint();

	if (!endpoint) {
		console.error('[graphql-proxy] endpoint_missing');
		return graphqlError('GraphQL endpoint is not configured', 500);
	}

	const body = await request.text();

	let res: Response;

	try {
		res = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body
		});
	} catch (err) {
		console.error('[graphql-proxy] upstream_unreachable', endpoint, err);
		return graphqlError('GraphQL upstream is unreachable', 502);
	}

	return new Response(await res.text(), {
		status: res.status,
		headers: { 'Content-Type': 'application/json' }
	});
}
