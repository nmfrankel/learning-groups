import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export async function GET({ params }) {
	const { memberID } = params;

	const member = await prisma.user.findFirst({
		where: {
			id: Number(memberID)
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

	return json(member);
}

export async function PATCH({ params, request }) {
	const { memberID } = params;
	const { name, phone, chaburahID } = await request.json();

	const member = await prisma.user.update({
		where: {
			id: Number(memberID)
		},
		data: {
			name: name ?? undefined,
			phone: phone ?? undefined,
			chaburahID: chaburahID !== undefined ? chaburahID : undefined
		}
	});

	return json(member);
}

export async function DELETE({ params }) {
	const { memberID } = params;

	const member = await prisma.user.findMany({
		where: {
			id: Number(memberID)
		}
	});

	return json(member);
}

export async function fallback({ request }) {
	return json({
		message: `This endpoint does not support the request method used [${request.method}].`
	});
}
