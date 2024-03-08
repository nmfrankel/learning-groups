import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
    const getChaburos = async () => {
        const res = await fetch(`/api/groups`)
        const chaburos = await res.json()

        if (!chaburos) {
            throw redirect(302, '/')
        }

        return chaburos
    }
    const getMembers = async () => {
        const res = await fetch(`/api/members`)
        const members = await res.json()

        if (!members) {
            throw redirect(302, '/')
        }

        return members
    }

    return {
        chaburos: await getChaburos(),
        members: await getMembers()
    };
}
