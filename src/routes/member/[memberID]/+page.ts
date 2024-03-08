import { api } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

type LoadMemberResponse = [string | null, User | undefined];

export async function load({ params }) {
	const { memberID } = params;

	const getMember = async () => {
		const [err, member] = (await api('GET', `members/${memberID}`)) as LoadMemberResponse;

		if (!member) {
			throw redirect(302, '/');
		}

		return member;
	};

	return {
		member: await getMember()
	};
}
