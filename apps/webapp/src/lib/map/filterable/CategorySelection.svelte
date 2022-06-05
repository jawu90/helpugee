<script lang="ts">
	import { getContext } from 'svelte';
	import type { Category } from './types';

	export let categories: Category[];

	const { request } = getContext('filterable-map');
</script>

<h3>Please select the category you're looking for</h3>
<select name="category" bind:value={$request.category}>
	<option value="">Any category</option>
	{#each categories as category}
		<option value={category}>{category}</option>
	{/each}
</select>

<style>
	select {
		width: 100%;
	}
</style>
