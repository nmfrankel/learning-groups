<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { api } from '$lib/utils';

	export let selectedValue: any, members: any[], chaburos: any[];

	const deleteChaburah = async (chaburahID: string) => {
		const [err, chaburah] = await api('DELETE', `groups/${chaburahID}`);

		if (!chaburah) {
			// Show message w/ sonner
			console.log('An error occured while deleting the selected chaburah');
			return;
		}

		chaburos = chaburos.filter((c) => c.id !== chaburahID);
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

<Table.Root>
	<Table.Caption>
		Bachurim currently within <i>{selectedValue?.value ? selectedValue?.label : 'all'}</i>
		{selectedValue?.value ? 'chaburah' : 'chaburos'}
	</Table.Caption>
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
					<Button class="h-5 px-2" size="sm">Delete</Button>
				</Table.Cell>
				<Table.Cell>
					<Button class="h-5 px-2" size="sm" on:click={() => moveTo(member.id)}>Move</Button>
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
