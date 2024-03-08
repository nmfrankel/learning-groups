<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { api } from '$lib/utils';

	export let data;
	let { chaburos, members } = data;
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

The admin will be able to CRUD operations on chaburos. Additionally, he can move users between
chaburos and view/create events (vaadim) which rosh chaburos will see. There will also be a --flag
the admin will be able to set to drop into a chaburah and see it's talmidim.

<div>
	<h3 class="font-bold">Chaburah list</h3>
	{#each chaburos as chaburah (chaburah.id)}
		<div class="chaburah-card">
			<h3>
				<div class="font-bold">
					<a class="font-bold" href="/chaburah/{chaburah.id}">{chaburah.yeshiva}</a>
					({chaburah.id})
				</div>
				<Button on:click={() => deleteChaburah(chaburah.id)}>Delete Chaburah</Button>
			</h3>
			{#each chaburah.bochurim as member (member.id)}
				<div>
					<a href="/member/{member.id}">{member.name}</a>
					<Button on:click={() => moveTo(member.id)}>Move</Button>
					<Button>Delete</Button>
				</div>
			{:else}
				<div>No members in this chaburah</div>
			{/each}
		</div>
	{:else}
		<div>No chaburahs exist</div>
	{/each}
</div>

{#if loaners}
	<div>
		<h3 class="font-bold">Not in a chaburah</h3>
		<div>
			{#each loaners as member (member.id)}
				<div>
					<a href="/member/{member.id}">{member.name} [{member.id}]</a>
					<Button on:click={() => moveTo(member.id)}>Move</Button>
					<Button>Delete</Button>
				</div>
			{/each}
		</div>
	</div>
{/if}

<div>
	<input type="text" placeholder="Yeshiva" bind:value={newChaburah.yeshiva} />
	<input type="text" placeholder="Rosh chaburah" bind:value={newChaburah.leaderID} />
	<Button on:click={createChaburah}>Create Chaburah</Button>
</div>

<div>
	<input type="text" placeholder="Name" bind:value={newMember.name} />
	<input type="text" placeholder="Phone" bind:value={newMember.phone} />
	<Button on:click={createMember}>Create Member</Button>
</div>
