export async function POST(request: Request) {
	const body = await request.text();

	const res = await fetch(process.env.WORDPRESS_API_URL_INTERNAL!, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body
	});

	return new Response(await res.text(), {
		status: res.status,
		headers: { 'Content-Type': 'application/json' }
	});
}
