import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export async function POST({ params, request }) {
	const { groupID } = params;
	const { memberIDs } = (await request.json()) as { memberIDs: number[] };

	const members = await prisma.user.updateMany({
		where: {
			id: {
				in: memberIDs
			}
		},
		data: {
			chaburahID: Number(groupID)
		}
	});

	return json(members);
}

export async function DELETE({ params, request }) {
	const { groupID } = params;
	const { memberIDs } = (await request.json()) as { memberIDs: number[] };

	const member = await prisma.user.updateMany({
		where: {
			id: {
				in: memberIDs
			},
			chaburahID: Number(groupID)
		},
		data: {
			chaburahID: null
		}
	});

	return json(member);
}

export async function fallback({ request }) {
	return json({
		message: `This endpoint does not support the request method used [${request.method}].`
	});
}
