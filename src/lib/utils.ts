import { browser } from '$app/environment';
import { PUBLIC_BASE_URL } from '$env/static/public';

/**
 * Enforce error safe API request.
 *
 * @param method - The HTTP method for the request.
 * @param resource - The resource path for the request.
 * @param data - Optional data to send with the request.
 * @returns A promise that resolves to a tuple containing the error message (if any) and the response data.
 */
export async function api(
	method: string,
	resource: string,
	data?: Record<string, unknown>
): Promise<[string | null, any]> {
	const base = browser ? `${window.location.origin}/api` : `${PUBLIC_BASE_URL}/api`;

	try {
		const res = await fetch(`${base}/${resource}`, {
			method,
			headers: {
				'content-type': 'application/json'
			},
			body: data && JSON.stringify(data)
		});

		if (!res.ok) {
			return [`${res.statusText} (${res.status})`, undefined];
		}

		return [null, await res.json()];
	} catch (error: any) {
		return [error?.message, undefined];
	}
}
