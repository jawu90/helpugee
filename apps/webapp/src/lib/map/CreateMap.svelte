<script lang="ts" context="module">
	let id = 0;
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import type * as L from 'leaflet';

	let map;
	const mapId = `create-map-${++id}`;
	let Leaflet: typeof L;

	onMount(async () => {
		if (!browser) {
			return;
		}
		Leaflet = await import('leaflet');
		createMap();
	});

	function createMap(mapOptions?: L.MapOptions) {
		map = Leaflet.map(mapId, mapOptions);
	}
</script>

<div id={mapId} />

<style>
	div {
		flex: 1;
		height: 100%;
		width: 100%;
	}
</style>
