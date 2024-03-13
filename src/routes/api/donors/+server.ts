import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export async function GET() {
	const count = await prisma.user.aggregate({
		where: {
			isDonor: true
		},
		_count: {
			_all: true
		}
	});

	const donors = await prisma.user.findMany({
		where: {
			isDonor: true
		}
	});

	return json({
		count,
		donors
	});
}

export async function POST({ request }) {
	const { name, phone } = await request.json();

	const donor = await prisma.user.create({
		data: {
			name: name,
			phone: phone,
			isDonor: true,
			chaburahID: null
		}
	});

	return json(donor);
}

export async function fallback({ request }) {
	return json({
		message: `This endpoint does not support the request method used [${request.method}].`
	});
}
