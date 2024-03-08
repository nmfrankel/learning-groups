import { api } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
	const getChaburos = async () => {
		const [err, chaburos] = await api('GET', 'groups');

		if (!chaburos) {
			throw redirect(302, '/');
		}

		return chaburos;
	};
	const getMembers = async () => {
		const [err, members] = await api('GET', 'members');

		if (!members) {
			throw redirect(302, '/');
		}

		return members;
	};

	return {
		chaburos: await getChaburos(),
		members: await getMembers()
	};
}
