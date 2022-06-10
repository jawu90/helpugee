<script lang="ts">
	import { page } from '$app/stores';
	import { API_BASE } from '$lib/core/api';
	import type { Feature } from '$lib/map/filterable/types';
	import { useQuery } from '@sveltestack/svelte-query';

	const id = $page.params.id;

	async function getFeature() {
		const res = await fetch(`${API_BASE}/feature`);
		const jsonResponse = await res.json();
		if (!res.ok) {
			throw new Error(jsonResponse.error_msg);
		}
		return jsonResponse as Feature;
	}

	const featureQuery = useQuery(['feature', { id }], getFeature);
	$: featureQuery.setOptions(['feature', { id }], getFeature);
</script>

<svelte:head>
	<title>Update entry</title>
	<meta name="description" content="Helpful map for new people" />
</svelte:head>

{#if $featureQuery.isLoading}
	<h2>Update an entry</h2>
	<p>Loading entry {id}</p>
{:else if $featureQuery.error}
	<h2>Error during loading</h2>
	<p>{$featureQuery.error}</p>
{:else if $featureQuery.data}
	<h2>{$featureQuery.data.label}</h2>
	<p>{$featureQuery.data.data.address}</p>
{/if}

<style>
</style>
