<script lang="ts">
	const demo = [
		{
			id: 12,
			name: 'Student Name'
		},
		{
			id: 13,
			name: 'Student Name'
		}
	];
</script>

<ul>
	{#each demo as bochur, i (bochur.id)}
		<li>{i + 1}: {bochur.name}</li>
	{:else}
		<li>No rows to show</li>
	{/each}
</ul>
