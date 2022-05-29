<script lang="ts">
	import { API_BASE } from '$lib/core/api';
	import { useQuery } from '@sveltestack/svelte-query';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import CategorySelection from './filterable/CategorySelection.svelte';
	import RegionSelection from './filterable/RegionSelection.svelte';
	import ResultMap from './filterable/ResultMap.svelte';
	import TextFilter from './filterable/TextFilter.svelte';
	import type { Feature, RequestDto } from './filterable/types';

	const results = writable([]);
	const request = writable<Partial<RequestDto>>({});
	setContext('filterable-map', { request, results });

	async function getFeatures() {
		const res = await fetch(`${API_BASE}/feature`);
		const jsonResponse = await res.json();
		if (!res.ok) {
			throw new Error(jsonResponse.error_msg);
		}
		const feature = jsonResponse as Feature[];
		return feature;
	}

	const markers = useQuery('feature', getFeatures);
</script>

<section>
	<RegionSelection />
	<CategorySelection />
	<TextFilter />
	{#if $markers.data}
		<ResultMap features={$markers.data} />
	{/if}

	<div>
		<h3>Selections</h3>
		<p>Region: {$request.region}</p>
		<p>Category: {$request.category}</p>
	</div>
</section>

<style>
	section {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
