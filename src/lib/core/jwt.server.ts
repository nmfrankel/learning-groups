import { PRIVATE_JWT_SECRET } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { generateChecksum } from './encryption.server';

type Claims = JwtPayload | undefined;

function obfuscate_data(...params: string[]) {
	const identifiers = params.join('');
	const hash = generateChecksum(identifiers);
	return hash;
}

export function generate(payload: JwtPayload, event: RequestEvent) {
	const client_IP = event.getClientAddress();
	const user_agent = event.request.headers.get('User-Agent') ?? '';
	payload.auth = obfuscate_data(client_IP, user_agent);

	const token = jwt.sign(payload, PRIVATE_JWT_SECRET, { expiresIn: '1d' });
	return token;
}

export function validate(token: string, event: RequestEvent) {
	const claims = jwt.verify(token, PRIVATE_JWT_SECRET, (_, decoded) => decoded) as Claims;

	if (claims === undefined) return null;

	const client_IP = event.getClientAddress();
	const user_agent = event.request.headers.get('User-Agent') ?? '';

	if (claims.auth !== obfuscate_data(client_IP, user_agent)) return null;
	delete claims.iat;
	delete claims.exp;
	delete claims.auth;

	return claims;
}

export function refresh(token: string, event: RequestEvent) {
	const payload = validate(token, event);

	if (!payload) return null;

	const refreshed_token = generate(payload, event);
	return refreshed_token;
}
