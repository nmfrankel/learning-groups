import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export async function GET({ params }) {
	const { donorID } = params;

	const donor = await prisma.user.findFirst({
		where: {
			id: Number(donorID)
		}
	});

	return json(donor);
}

export async function PATCH({ params, request }) {
	const { donorID } = params;
	const { name, phone, chaburahID } = await request.json();

	const donor = await prisma.user.update({
		where: {
			id: Number(donorID),
			isDonor: true
		},
		data: {
			name: name ?? undefined,
			phone: phone ?? undefined,
			chaburahID: chaburahID ?? undefined
		}
	});

	return json(donor);
}

export async function DELETE({ params }) {
	const { donorID } = params;

	const donor = await prisma.user.delete({
		where: {
			id: Number(donorID)
		}
	});

	return json(donor);
}

export async function fallback({ request }) {
	return json({
		message: `This endpoint does not support the request method used [${request.method}].`
	});
}
