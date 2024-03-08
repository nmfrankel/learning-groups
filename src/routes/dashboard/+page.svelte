<script lang="ts">
	import { api } from '$lib/api';
	export let data;
	let { chaburos, members } = data;

	let newChaburah = {
		yeshiva: '',
		leaderID: ''
	};

	let newMember = {
		name: '',
		phone: ''
	};

	async function moveTo(memberID: string) {
		let chaburahID: string | number | null = prompt('Where to? (chaburah id)');
		chaburahID = chaburahID === '' ? null : Number(chaburahID);

		const res = await api('PATCH', `members/${memberID}`, { chaburahID });

		if (res.status !== 200) {
			console.log('An error occured while adding the new member');
			return;
		}

		const member = await res.json();
		const chaburahIndex = chaburos.findIndex((c) => c.id === Number(chaburahID));
		chaburos[chaburahIndex].bochurim = [...chaburos[chaburahIndex].bochurim, member];
		members = members.filter((m) => m.id !== member.id);
	}

	const deleteChaburah = async (chaburahID: string) => {
		const res = await api('DELETE', `groups/${chaburahID}`);

		if (res.status !== 200) {
			console.log('An error occured while adding the new member');
			return;
		}

		const member = await res.json();
		chaburos = chaburos.filter((c) => c.id !== chaburahID);
	};

	const createChaburah = async () => {
		const res = await api('POST', 'groups', newChaburah);

		if (res.status !== 200) {
			console.log('An error occured while adding the new chaburah');
			return;
		}

		const chaburah = await res.json();
		chaburos = [...chaburos, chaburah];

		// reset once completed
		newChaburah = {
			yeshiva: '',
			leaderID: ''
		};
	};

	const createMember = async () => {
		const res = await api('POST', 'members', newMember);

		if (res.status !== 200) {
			console.log('An error occured while adding the new member');
			return;
		}

		const member = await res.json();
		members = [...members, member];

		// reset once completed
		newMember = {
			name: '',
			phone: ''
		};
	};
</script>

The admin will be able to CRUD operations on chaburos. Additionally, he can move users between
chaburos and view/create events (vaadim) which rosh chaburos will see. There will also be a --flag
the admin will be able to set to drop into a chaburah and see it's talmidim.

<div>
	<h3>Chaburah list</h3>
	{#each chaburos as chaburah (chaburah.id)}
		<div class="chaburah-card">
			<h3>
				<div>{chaburah.id}</div>
				<h1 class="chaburah-title">
					<a class="chaburah-title-anchor" href="/chaburah/{chaburah.id}">{chaburah.yeshiva}</a>
				</h1>
				<button
					type="submit"
					class="btn btn-danger rounded-pill px-3"
					on:click={() => deleteChaburah(chaburah.id)}>Delete Chaburah</button
				>
			</h3>
			{#each chaburah.bochurim as member (member.id)}
				<div>
					<a href="/member/{member.id}">{member.name}</a>
					<button on:click={() => moveTo(member.id)}>Move</button>
					<button>Delete</button>
				</div>
			{:else}
				<div>No members in this chaburah</div>
			{/each}
		</div>
	{:else}
		<div>No chaburahs exist</div>
	{/each}
</div>

<div>
	<h3>Not in a chaburah</h3>
	<div>
		{#each members.filter((m) => m.chaburahID === null) as member (member.id)}
			<div>
				<a href="/member/{member.id}">{member.name} [{member.id}]</a>
				<button on:click={() => moveTo(member.id)}>Move</button>
				<button>Delete</button>
			</div>
		{:else}
			<div>No members in this chaburah</div>
		{/each}
	</div>
</div>

<div>
	<input type="text" placeholder="Yeshiva" bind:value={newChaburah.yeshiva} />
	<input type="text" placeholder="Rosh chaburah" bind:value={newChaburah.leaderID} />
	<button on:click={createChaburah}>Create Chaburah</button>
</div>

<div>
	<input type="text" placeholder="Name" bind:value={newMember.name} />
	<input type="text" placeholder="Phone" bind:value={newMember.phone} />
	<button on:click={createMember}>Create Member</button>
</div>
