<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { api } from '$lib/utils';
	import { toast } from 'svelte-sonner';

	export let isDialogOpen: string | undefined, members: any[], chaburos: any[];

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

		if (err || !chaburah) {
			toast.error('Error while creating the new chaburah', {
				description: 'Now',
				action: {
					label: 'Close',
					onClick: () => console.log('Close')
				}
			});
			return;
		}

		chaburos = [...chaburos, chaburah];
		newChaburah = {
			yeshiva: '',
			leaderID: ''
		};
		isDialogOpen = undefined;
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

		members = [...members, member];
		newMember = {
			name: '',
			phone: ''
		};
		isDialogOpen = undefined;
	}

	function closeDialog() {
		isDialogOpen = undefined;
		newChaburah = {
			yeshiva: '',
			leaderID: ''
		};
		newMember = {
			name: '',
			phone: ''
		};
	}
</script>

<Dialog.Root bind:open={isDialogOpen} on:close={closeDialog}>
	{#if isDialogOpen === 'newChaburah'}
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Create Chaburah</Dialog.Title>
			</Dialog.Header>
			<Dialog.Description class="grid gap-6">
				<div class="grid gap-2">
					<Label for="yeshiva">Yeshiva</Label>
					<Input id="yeshiva" placeholder="Yeshiva" bind:value={newChaburah.yeshiva} />
				</div>
				<div class="grid gap-2">
					<Label for="roshChaburahID">Rosh Chaburah ID</Label>
					<Input
						id="roshChaburahID"
						placeholder="Rosh chaburah ID"
						bind:value={newChaburah.leaderID}
					/>
				</div>
				<div class="flex justify-end gap-3">
					<Button variant="secondary" on:click={closeDialog}>Cancel</Button>
					<Button variant="default" on:click={createChaburah}>Create</Button>
				</div>
			</Dialog.Description>
		</Dialog.Content>
	{:else if isDialogOpen === 'newMember'}
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>New Bochur</Dialog.Title>
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
					<Button variant="secondary" on:click={closeDialog}>Cancel</Button>
					<Button variant="default" on:click={addMember}>Add</Button>
				</div>
			</Dialog.Description>
		</Dialog.Content>
	{/if}
</Dialog.Root>
