<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import Portal from '$lib/components/Portal.svelte';
	import Table from './Table.svelte';
	import Dialog from './Dialog.svelte';

	export let data;
	let { chaburosData, membersData } = data;
	let {chaburos} = chaburosData
	let {members} = membersData

	let loaners: any[] = [];
	$: loaners = members.filter((m) => m.chaburah === null);

	let newChaburah = {
		yeshiva: '',
		leaderID: ''
	};

	let newMember = {
		name: '',
		phone: ''
	};

	const createChaburah = async () => {
		const [err, chaburah] = await api('POST', 'groups', newChaburah);

		if (!chaburah) {
			// Show message w/ sonner
			console.log('An error occured while adding the new chaburah');
			return;
		}

		chaburos = [...chaburos, chaburah];

		// reset once completed
		newChaburah = {
			yeshiva: '',
			leaderID: ''
		};
	};

	const deleteChaburah = async (chaburahID: string) => {
		const [err, chaburah] = await api('DELETE', `groups/${chaburahID}`);

		if (!chaburah) {
			// Show message w/ sonner
			console.log('An error occured while deleting the selected chaburah');
			return;
		}

		chaburos = chaburos.filter((c) => c.id !== chaburahID);
	};

	const createMember = async () => {
		const [err, member] = await api('POST', 'members', newMember);

		if (!member) {
			// Show message w/ sonner
			console.log('An error occured while adding the new member');
			return;
		}

	let loaners: any[] = [];
	$: loaners = members?.filter((m) => m.chaburah === null);

	let isDialogOpen: string | undefined;
	let selectedValue: any;
</script>

<Portal target="#actions" class="flex gap-3">
	<Select.Root bind:selected={selectedValue}>
		<Select.Trigger class="w-[180px]">
			<Select.Value placeholder="All Chaburos" />
		</Select.Trigger>
		<Select.Content>
			<Select.Item value={null}>All Chaburos</Select.Item>
			{#each chaburos as chaburah (chaburah.id)}
				<Select.Item value={chaburah.id}>{chaburah.yeshiva}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>

	<Button variant="secondary" on:click={() => (isDialogOpen = 'newChaburah')}>New Chaburah</Button>
	<Button variant="default" on:click={() => (isDialogOpen = 'newMember')}>New Member</Button>
</Portal>

<Dialog bind:isDialogOpen bind:chaburos bind:members />

<Table bind:chaburos bind:members {selectedValue} />

<div>
	The admin will be able to CRUD operations on chaburos. Additionally, he can move users between
	chaburos and view/create events (vaadim) which rosh chaburos will see. There will also be a --flag
	the admin will be able to set to drop into a chaburah and see it's talmidim.
</div>
