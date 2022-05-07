<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { jwtToken } from '$lib/jwtStore';
	import { browser } from '$app/env';

	if (!$jwtToken && browser) {
		goto(`${base}/login`);
	}
</script>

<Header />
<slot />
<Footer />
