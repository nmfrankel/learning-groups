import { browser } from '$app/environment';

export const api = (method: string, resource: string, data?: Record<string, unknown>) => {
	const base = browser ? `${window.location.origin}/api` : '/api';

	return fetch(`${base}/${resource}`, {
		method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});
};
