import { api } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const { chaburahID } = params;

	const getChaburah = async () => {
		const [err, chaburah] = await api('GET', `groups/${chaburahID}`);

		if (!chaburah) {
			throw redirect(302, '/');
		}

		return chaburah;
	};

	return {
		chaburah: await getChaburah()
	};
}
