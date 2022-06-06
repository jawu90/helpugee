<script lang="ts">
	import { base } from '$app/paths';
	import { API_BASE } from '$lib/core/api';
	import { useQuery } from '@sveltestack/svelte-query';

	import { setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import CategorySelection from './filterable/CategorySelection.svelte';
	import RegionSelection from './filterable/RegionSelection.svelte';
	import ResultMap from './filterable/ResultMap.svelte';
	import TextFilter from './filterable/TextFilter.svelte';
	import type { Category, Feature, RequestDto } from './filterable/types';

	export let categories: Category[];

	const request = writable<Partial<RequestDto>>({ category: '', region: '', query: '' });
	const selection = writable<Feature | undefined>();

	async function getFeatures() {
		const res = await fetch(`${API_BASE}/feature`);
		const jsonResponse = await res.json();
		if (!res.ok) {
			throw new Error(jsonResponse.error_msg);
		}
		const { features } = jsonResponse as { features: Feature[]; categories: Category[] };
		const result = features.filter((feature) => {
			const hasCorrectCategory = $request.category === '' || $request.category === feature.category;
			const hasCorrectRegion = $request.region === ''; // || isInRegion($request.region, feature.geom);
			const hasCorrectQuery = $request.query
				? feature.label.toLocaleLowerCase().includes($request.query.toLocaleLowerCase())
				: true;
			return hasCorrectCategory && hasCorrectRegion && hasCorrectQuery;
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

	setContext('filterable-map', { request, results, selection });
</script>

<section>
	<RegionSelection />
	<CategorySelection {categories} />
	<TextFilter />
	<ResultMap />

	{#if $selection !== undefined}
		<h3>{$selection.label}</h3>
		<p>{$selection.data.address}</p>
		{#if $selection.data.specificOfferForRefugees}
			<p>Specific offer for refugees.</p>
		{/if}

		<p>
			In case you find missing, outdated or false information, help us and <a
				href="{base}/map/update/{$selection.id}">add your knowledge here</a
			>
		</p>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
