<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { jwtToken } from '$lib/jwtStore';
	import Login from '$lib/user/Login.svelte';

	if ($jwtToken && $jwtToken.length > 0 && browser) {
		goto(`${base}/`);
	}
</script>

<svelte:head>
	<title>Administration</title>
	<meta name="description" content="Administration for helpugee" />
</svelte:head>

<h2>helpugee administration</h2>
<div>
	<Login />
</div>

<style>
	div {
		display: flex;
		justify-content: center;
	}
</style>
