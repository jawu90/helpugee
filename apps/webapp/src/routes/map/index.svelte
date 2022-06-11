<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Category, Feature } from '$lib/map/filterable/types';
	import { API_BASE } from '$lib/core/api';

	export const load: Load = async ({ fetch }) => {
		const categoriesUrl = `${API_BASE}/feature/categories`;
		const res = await fetch(categoriesUrl);
		const jsonResponse = await res.json();
		if (!res.ok) {
			throw new Error(jsonResponse.error_msg);
		}
		const { categories } = jsonResponse as { features: Feature[]; categories: Category[] };
		return { status: res.status, props: { categories } };
	};
</script>

<script lang="ts">
	import FilterableMap from '$lib/map/FilterableMap.svelte';

	export let categories: Category[];
</script>

<svelte:head>
	<title>Map</title>
	<meta name="description" content="Helpful map for new people" />
</svelte:head>

<h2>Welcome to helpugee!</h2>
<p>We provide you with all necessary information to find a new home in Europe.</p>
<p>
	You can also post information yourself and help us expand our information network. In this way,
	you also contribute to helping others with the information provided.
</p>

<FilterableMap {categories} />

<style>
</style>
