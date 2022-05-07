<script lang="ts">
	import { getContext } from 'svelte';

	const { request } = getContext('filterable-map');
</script>

<h3>Search for ...</h3>
<input name="query" bind:value={$request.query} />

<style>
	input {
		border: 0;
		border-bottom: 1px solid var(--text-color);
		width: 100%;
	}
</style>
