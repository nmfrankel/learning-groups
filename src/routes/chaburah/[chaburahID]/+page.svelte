<script>
	import { api } from '$lib/api';
	export let data;
	const { chaburah } = data;

	async function addMember () {
		const newMember = {
			name: 'Chaim Zanvel',
			phone: '+0520000000',
			chaburahID: 7
		}

		const res = await api('POST', 'members', newMember);

		if(res.status !== 200) {
			console.log('An error occured while adding the new member');
			return
		}

		const member = await res.json();
		chaburah.bochurim = [...chaburah.bochurim, member];
	};
</script>

<h1>Rosh Chaburah Panel</h1>
On this page, a rosh chaburah or the admin can drop-in and can run CRUD operations on the bnei chaburah.
Additionally, they can run CRUD operations on events or select bnei chaburah and be rerouted to `/members/[memberID]`

<button on:click={addMember}>New bochur</button>
<div>
	<h3>List of guys goes in this div</h3>
	<div>
		{#each chaburah.bochurim as member (member.id)}
			<div>
				<a href="/member/{member.id}">{member.name}</a>
			</div>
		{:else}
			No members in this chaburah
		{/each}
	</div>
</div>
