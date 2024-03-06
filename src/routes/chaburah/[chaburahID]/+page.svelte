<script>
	export let data;
	const { chaburah } = data;
</script>

<h1>Rosh Chaburah Panel</h1>
On this page, a rosh chaburah or the admin can drop-in and can run CRUD operations on the bnei chaburah.
Additionally, they can run CRUD operations on events or select bnei chaburah and be rerouted to `/members/[memberID]`

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
