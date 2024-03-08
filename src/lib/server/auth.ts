import { validate, generate } from '$lib/core/jwt.server';
import type { Cookies, RequestEvent } from '@sveltejs/kit';

export function authorize_user(event: RequestEvent) {
	const token = event.cookies.get('user') ?? '';
	event.locals.user = validate(token, event) as User;
}

export function refresh_user(event: RequestEvent) {
	if (!event.locals.user) return;

	const new_token = generate(event.locals.user, event);
	event.cookies.set('user', new_token, {
		path: '/',
		maxAge: 60 * 60 * 24,
		httpOnly: true
	});
}

export function login_user(user: User, locals: App.Locals) {
	locals.user = user;
}

export function logout_user(cookies: Cookies, locals: App.Locals) {
	locals.user = null;
	cookies.delete('user', {
		path: '/'
	});
}

export function block_user(token: string) {
	console.error('Function `block_user` in `$lib/server/auth` has not been implimented');
}
