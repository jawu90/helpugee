<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { jwtToken } from '$lib/jwtStore';
	import { browser } from '$app/env';

	console.log('jwtToken', $jwtToken);
	if (!$jwtToken && browser) {
		goto(`${base}/login`);
	}
</script>

<Header />
<main><slot /></main>
<Footer />

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
	}
</style>
