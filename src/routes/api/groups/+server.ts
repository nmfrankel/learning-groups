import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export async function GET() {
	const groups = await prisma.chaburah.findMany({
		include: {
			bochurim: true,
			events: {
				skip: 0,
				take: 10
			}
		}
	});

	return json(groups);
}

export async function POST({ request }) {
	const { yeshiva, leaderID } = await request.json();

	const group = await prisma.chaburah.create({
		data: {
			yeshiva,
			bochurim: {
				connect: {
					id: Number(leaderID),
					isRoshChaburah: true
				}
			}
		}
	});

	return json(group);
}

export async function fallback({ request }) {
	return json({
		message: `This endpoint does not support the request method used [${request.method}].`
	});
}
