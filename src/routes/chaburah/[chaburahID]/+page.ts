import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    const { chaburahID } = params;

    const getChaburah = async () => {
        const res = await fetch(`/api/groups/${chaburahID}`)
        const chaburah = await res.json()

        if (!chaburah) {
            throw redirect(302, '/')
        }

        return chaburah
    }

    return {
        chaburah: await getChaburah()
    };
}
