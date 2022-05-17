<script lang="ts">
	import AdministrationPage from '$lib/core/AdministrationPage.svelte';
	import { data } from '$lib/jwtStore';
	console.log({ data: $data });
</script>

<svelte:head>
	<title>Administration</title>
	<meta name="description" content="Administration for helpugee" />
</svelte:head>

<AdministrationPage>
	<h2>helpugee administration</h2>
	<p>{$data?.username}</p>
</AdministrationPage>
