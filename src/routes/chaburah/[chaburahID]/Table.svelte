<script lang="ts">
	import { page } from '$app/stores';
	import * as Table from '$lib/components/ui/table';

	const { chaburah } = $page.data;
</script>

<Table.Root>
	<Table.Caption>A list of members in <i>{chaburah.yeshiva}</i> chaburah.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[300px]">Name</Table.Head>
			<Table.Head>Phone</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each chaburah.bochurim as bochur (bochur.id)}
			<Table.Row>
				<Table.Cell class="font-medium underline">
					<a href="/member/{bochur.id}">{bochur.name}</a>
				</Table.Cell>
				<Table.Cell>{bochur.phone}</Table.Cell>
			</Table.Row>
		{:else}
			<Table.Row>
				<Table.Cell class="font-medium" colspan={2}
					>This chaburah does not have any bochurim in it</Table.Cell
				>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
