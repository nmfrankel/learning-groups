<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { api } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';
	import * as Popover from '$lib/components/ui/popover';
	import * as Table from '$lib/components/ui/table';
	import * as Select from '$lib/components/ui/select';
	import Portal from '$lib/components/Portal.svelte';

	export let data;
	let { chaburos, members } = data;

	let loaners: any[] = [];
	$: loaners = members.filter((m) => m.chaburah === null);

	let selectedValue: any;
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

		members = [...members, member];

		// reset once completed
		newMember = {
			name: '',
			phone: ''
		};
	};

	async function moveTo(memberID: string) {
		let chaburahID: string | number | null = prompt('Where to? (chaburah id)');
		chaburahID = chaburahID === '' ? null : Number(chaburahID);

		const [err, member] = await api('PATCH', `members/${memberID}`, { chaburahID });

		console.log(member);
		if (!member) {
			// Show message w/ sonner
			console.log('An error occured while adding the new member');
			return;
		}

		const chaburahIndex = chaburos.findIndex((c) => c.id === Number(chaburahID));
		if (chaburahIndex >= 0 && chaburahID) {
			chaburos[chaburahIndex].bochurim = [...chaburos[chaburahIndex].bochurim, member];
		}
		// ADD: remove from old chaburah
		const memberIndex = members.findIndex((m) => m.id === member.id);
		members[memberIndex] = member;
	}
</script>

<!-- <div>
	<input type="text" placeholder="Yeshiva" bind:value={newChaburah.yeshiva} />
	<input type="text" placeholder="Rosh chaburah" bind:value={newChaburah.leaderID} />
	<Button on:click={createChaburah}>Create Chaburah</Button>
</div>

<div>
	<input type="text" placeholder="Name" bind:value={newMember.name} />
	<input type="text" placeholder="Phone" bind:value={newMember.phone} />
	<Button on:click={createMember}>Create Member</Button>
</div> -->

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

	<Button variant="secondary" on:click={() => undefined}>New Chaburah</Button>
	<Button variant="default" on:click={() => undefined}>New Member</Button>
</Portal>

<div class="admin-page-table-wrapper">
	<Table.Root>
		<Table.Caption>Bachurim in chaburos</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head>Name</Table.Head>
				<Table.Head>Chaburah</Table.Head>
				<Table.Head>Actions</Table.Head>
				<Table.Head>Move</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each members.filter( (m) => (selectedValue?.value ? selectedValue?.value === m.chaburahID : true) ) as member (member.id)}
				<Table.Row>
					<Table.Cell class="underline">
						<a href="member/{member.id}">{member.name}</a>
					</Table.Cell>
					<Table.Cell class="underline">
						{#if member.chaburahID}
							<a href="chaburah/{member.chaburahID}">{member.chaburah?.yeshiva}</a>
						{/if}
					</Table.Cell>
					<Table.Cell>
						<Button size="sm">Delete</Button>
					</Table.Cell>
					<Table.Cell>
						<Button size="sm" on:click={() => moveTo(member.id)}>Move</Button>
					</Table.Cell>
				</Table.Row>
			{:else}
				<Table.Row>
					<Table.Cell colspan={4}
						>There are currently no members in <i>{selectedValue?.label}</i> chaburah</Table.Cell
					>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

<div class="popovers-wrapper">
	<Popover.Root>
		<Popover.Trigger>
			<Button>Add Chaburah</Button>
		</Popover.Trigger>
		<Popover.Content class="w-350">
			<div class="dashboard-popovers-content">
				<Input type="text" placeholder="Yeshiva" bind:value={newChaburah.yeshiva} />
				<Input type="text" placeholder="Rosh chaburah" bind:value={newChaburah.leaderID} />
				<Button on:click={createChaburah}>Create Chaburah</Button>
			</div>
		</Popover.Content>
	</Popover.Root>

	<Popover.Root>
		<Popover.Trigger>
			<Button>Add Member</Button>
		</Popover.Trigger>
		<Popover.Content class="w-350">
			<div class="dashboard-popovers-content">
				<Input type="text" placeholder="Name" bind:value={newMember.name} />
				<Input type="text" placeholder="Phone" bind:value={newMember.phone} />
				<Button on:click={createMember}>Create Member</Button>
			</div>
		</Popover.Content>
	</Popover.Root>
</div>

The admin will be able to CRUD operations on chaburos. Additionally, he can move users between
chaburos and view/create events (vaadim) which rosh chaburos will see. There will also be a --flag
the admin will be able to set to drop into a chaburah and see it's talmidim.
