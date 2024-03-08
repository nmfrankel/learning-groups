import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    const { memberID } = params;

    const getMember = async () => {
        const res = await fetch(`/api/members/${memberID}`)
        const member = await res.json()

        if (!member) {
            throw redirect(302, '/')
        }

        return member
    }

    return {
        member: await getMember()
    };
}