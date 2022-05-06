<script lang="ts">
	import Footer from '$lib/core/Footer.svelte';
	import Header from '$lib/core/Header.svelte';

	import '../app.css';
</script>

<div>
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	div {
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 100%;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		box-sizing: border-box;
	}
</style>
