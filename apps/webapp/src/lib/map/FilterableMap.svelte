<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import CategorySelection from './filterable/CategorySelection.svelte';
	import RegionSelection from './filterable/RegionSelection.svelte';
	import ResultMap from './filterable/ResultMap.svelte';
	import TextFilter from './filterable/TextFilter.svelte';
	import type { RequestDto } from './filterable/types';

	const results = writable([]);
	const request = writable<Partial<RequestDto>>({});
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
