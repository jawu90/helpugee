<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { jwtToken } from '$lib/jwtStore';
	import Login from '$lib/user/Login.svelte';

	console.log('login page rendering');
	if ($jwtToken && $jwtToken.length > 0 && browser) {
		console.log('redirecting to', base);
		goto(`${base}/`);
	}
</script>

<svelte:head>
	<title>Administration</title>
	<meta name="description" content="Administration for helpugee" />
</svelte:head>

<section>
	<h2>helpugee administration</h2>
	<div>
		<Login />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	div {
		display: flex;
		justify-content: center;
	}
</style>
