<script>
	import { page } from '$app/stores';
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.pcss';

	function getLastParam() {
		let lastParam = '';
		let routeParams = $page.route.id?.split('/') ?? [];
		let urlParams = $page.url.pathname.split('/');

		let i = routeParams.length - 1;
		while (i >= 0 && routeParams[i] !== urlParams[i]) {
			i--;
		}

		if (i >= 0) {
			lastParam = routeParams[i];
		}

		return lastParam;
	}

	// Keep track of the user's page
	let currentPage = '';
	$: if ($page.route.id) currentPage = getLastParam();

	const { user } = $page.data;

	// Set dashboard greeting based on time of day
	let greeting = `Good Morning`;
	$: if (new Date().getHours() >= 12) greeting = `Good Afternoon`;
	$: if (new Date().getHours() >= 16) greeting = `Good Evening`;
	$: if (user) greeting += `, ${user.name}`;
</script>

<Toaster />

<main class="flex-1 space-y-6 p-8 pt-6">
	<div class="flex items-center justify-between">
		<h2 class="capitalize-first text-3xl font-bold tracking-tight">
			{currentPage === 'dashboard' ? greeting : currentPage}
		</h2>
		<div id="actions">
			<!-- insert actions here with <Portal target='#actions' /> -->
		</div>
	</div>

	<slot />
</main>
