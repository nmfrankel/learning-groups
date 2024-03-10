import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export async function GET() {
	const members = await prisma.user.findMany({
		where: {
			isDonor: false
		},
		select: {
			id: true,
			name: true,
			phone: true,
			isAdmin: true,
			password: false,
			chaburah: true,
			progress: true
		}
	});

	return json(members);
}

export async function POST({ request }) {
	const { name, phone, chaburahID } = await request.json();

	const member = await prisma.user.create({
		data: {
			name: name,
			phone: phone,
			isDonor: false,
			chaburahID: chaburahID !== undefined ? Number(chaburahID) : undefined
		}
	});

	return json(member);
}

export async function fallback({ request }) {
	return json({
		message: `This endpoint does not support the request method used [${request.method}].`
	});
}
