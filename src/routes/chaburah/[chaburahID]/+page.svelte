<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import Portal from '$lib/components/Portal.svelte';
	import Table from './Table.svelte';
	import { api } from '$lib/utils';
	import { toast } from 'svelte-sonner';

	export let data;
	const { chaburah } = data;

	let isDialogOpen: string | undefined;

	let newMember = {
		name: '',
		phone: '',
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
		newMember = {
			name: '',
			phone: '',
			chaburahID: chaburah.id
		};
		isDialogOpen = undefined;
	}

	function closeMember() {
		isDialogOpen = undefined;

		newMember = {
			name: '',
			phone: '',
			chaburahID: chaburah.id
		};
	}
</script>

<Portal target="#actions" class="flex gap-3">
	<Button variant="secondary" on:click={() => (isDialogOpen = 'bochur')}>Add Bochur</Button>
	<Button variant="default" on:click={() => (isDialogOpen = 'event')}>New Event</Button>
</Portal>

<Dialog.Root bind:open={isDialogOpen} on:close={() => closeMember}>
	{#if isDialogOpen === 'bochur'}
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Add Bochur</Dialog.Title>
			</Dialog.Header>
			<Dialog.Description class="grid gap-6">
				<div class="grid gap-2">
					<Label for="name">Name</Label>
					<Input id="name" placeholder="Name" bind:value={newMember.name} />
				</div>
				<div class="grid gap-2">
					<Label for="phone">Phone</Label>
					<Input id="phone" placeholder="Phone number" bind:value={newMember.phone} />
				</div>
				<div class="flex justify-end gap-3">
					<Button variant="secondary" on:click={closeMember}>Cancel</Button>
					<Button variant="default" on:click={addMember}>Add</Button>
				</div>
			</Dialog.Description>
		</Dialog.Content>
	{:else if isDialogOpen === 'event'}
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>New Event</Dialog.Title>
			</Dialog.Header>
			<Dialog.Description>
				<div class="grid gap-2">
					<Label for="subject">Subject</Label>
					<Input id="subject" placeholder="I need help with..." />
				</div>
			</Dialog.Description>
		</Dialog.Content>
	{/if}
</Dialog.Root>

<Table {chaburah} />

<div>
	On this page, a rosh chaburah or the admin can drop-in and can run CRUD operations on the bnei
	chaburah. Additionally, they can run CRUD operations on events or select bnei chaburah and be
	rerouted to `/members/[memberID]`
</div>
