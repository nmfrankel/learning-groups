<script lang="ts">
	export let data;
	const { member } = data;
</script>

<div>
	This page will show the info for member: <b>{member?.name} ({member?.id})</b>. The rosh chaburah
	will have the ability to update and delete the user. Additionally, he can upload new chaburah .pdf
	files, to save for future record.
</div>

<div>
	<div>Name: {member.name}</div>
	<div>Phone: {member.phone}</div>
</div>
