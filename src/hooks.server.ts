import { authorize_user, login_user, logout_user, refresh_user } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	authorize_user(event);

	const routeID = event.route.id;
	const role = event.locals.user?.role;

	// const user = {id: 1, name: 'Nosson', role: 'ADMIN'} as User
	// login_user(user, event.locals)
	// logout_user(event.cookies, event.locals)

	// protected routes
	if (!role && routeID !== '/') {
		// throw redirect(303, "/")
	} else if (role !== 'ADMIN' && routeID === '/dashboard') {
		// throw redirect(303, "/")
	}

	const res = resolve(event);

	refresh_user(event);

	return res;
};
