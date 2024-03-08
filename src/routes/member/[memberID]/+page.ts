import { api } from '$lib/utils';

type LoadMemberResponse = [string | null, User | undefined];

export const load = async ({ params }) => {
	const { memberID } = params;

	const loadMember = async () => {
		const [err, data] = (await api('GET', `members/${memberID}`)) as LoadMemberResponse;
		return data;
	};

	return {
		member: await loadMember()
	};
};
