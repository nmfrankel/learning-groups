import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export async function GET({ params, url }) {
	const { groupID } = params;
	const skip = Number(url.searchParams.get('skip')) || 0;
	const take = Number(url.searchParams.get('take')) || 0;

	const group = await prisma.chaburah.findFirst({
		where: {
			id: Number(groupID)
		},
		include: {
			bochurim: true,
			events: {
				skip,
				take
			}
		}
	});

	return json(group);
}

export async function PATCH({ params, request }) {
	const { groupID } = params;
	const { yeshiva, leaderID } = await request.json();

	const group = await prisma.chaburah.update({
		where: {
			id: Number(groupID)
		},
		data: {
			yeshiva: yeshiva ?? undefined,
			bochurim: {
				connect: {
					id: Number(leaderID) ?? undefined
				}
			}
		}
	});

	return json(group);
}

export async function DELETE({ params }) {
	const { groupID } = params;

	const group = await prisma.chaburah.delete({
		where: {
			id: Number(groupID)
		}
	});

	// TODO: Figure this out
	// const clearLeaders = await prisma.user.updateMany({
	// 	where: {
	// 		chaburahID: Number(groupID)
	// 	},
	// 	data: {
	// 		isRoshChaburah: false,

	// 	}
	// });

	return json(group);
}

export async function fallback({ request }) {
	return json({
		message: `This endpoint does not support the request method used [${request.method}].`
	});
}
