<script>
	import { Button } from '$lib/components/ui/button';
	import Portal from '$lib/components/Portal.svelte';
	import Table from './Table.svelte';
	import { api } from '$lib/utils';
	import { toast } from 'svelte-sonner';

	export let data;
	const { chaburah } = data;

	let newMember = {
		name: 'Shlomo Person',
		phone: '+052000000',
		chaburahID: chaburah.id
	};

	async function addMember() {
		const [err, member] = await api('POST', 'members', newMember);

		if (err || !member) {
			toast.error('Error while creating the new member', {
				description: 'Now',
				action: {
					label: 'Close',
					onClick: () => console.log('Close')
				}
			});
			return;
		}

		chaburah.bochurim = [...chaburah.bochurim, member];
	}
</script>

<Portal target="#actions" class="flex gap-3">
	<Button variant="default" on:click={addMember}>New bochur</Button>
</Portal>

<Table />

<div>
	On this page, a rosh chaburah or the admin can drop-in and can run CRUD operations on the bnei
	chaburah. Additionally, they can run CRUD operations on events or select bnei chaburah and be
	rerouted to `/members/[memberID]`
</div>
