import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export async function GET({ url }) {
	const skip = Number(url.searchParams.get('skip')) || 0;
	const take = Number(url.searchParams.get('take')) || 10;
	const groupID = url.searchParams.get('groupID') ?? undefined;

	const members = await prisma.user.findMany({
		where: groupID
			? {
					id: Number(groupID),
					isDonor: false
				}
			: {
					isDonor: false
				},
		select: {
			id: true,
			name: true,
			phone: true,
			isAdmin: true,
			chaburahID: true,
			password: false,
			chaburah: true,
			progress: true,
			files: true,
			notes: true
		},
		skip,
		take
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
