<script lang="ts">
	import { API_BASE } from '$lib/core/api';
	import { useQuery } from '@sveltestack/svelte-query';

	import { setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import CategorySelection from './filterable/CategorySelection.svelte';
	import RegionSelection from './filterable/RegionSelection.svelte';
	import ResultMap from './filterable/ResultMap.svelte';
	import TextFilter from './filterable/TextFilter.svelte';
	import type { Feature, RequestDto } from './filterable/types';

	const request = writable<Partial<RequestDto>>({ category: '', region: '', query: '' });

	async function getFeatures() {
		const res = await fetch(`${API_BASE}/feature`);
		const jsonResponse = await res.json();
		if (!res.ok) {
			throw new Error(jsonResponse.error_msg);
		}
		const features = jsonResponse as Feature[];
		const result = features.filter((feature) => {
			const hasCorrectCategory = $request.category === '' || $request.category === feature.category;
			const hasCorrectRegion = $request.region === ''; // || isInRegion($request.region, feature.geom);
			return hasCorrectCategory && hasCorrectRegion;
		});
		return result;
	}

	const featureQuery = useQuery(
		['feature', { category: $request.category, region: $request.region, query: $request.query }],
		getFeatures
	);
	$: featureQuery.setOptions(
		['feature', { category: $request.category, region: $request.region, query: $request.query }],
		getFeatures
	);

	const results = derived([featureQuery], ([features]) => {
		return features.data;
	});

	setContext('filterable-map', { request, results });
</script>

<section>
	<RegionSelection />
	<CategorySelection />
	<TextFilter />
	<ResultMap />

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
