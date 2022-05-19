<script lang="ts" context="module">
	import 'leaflet/dist/leaflet.css';

	let id = 0;
	const tileProvider = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
	const tileProviderAttribution = {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	};
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import type * as L from 'leaflet';

	let map: L.Map | null;
	const mapId = `create-map-${++id}`;
	let Leaflet: typeof L;

	onMount(async () => {
		if (!browser) {
			return;
		}
		Leaflet = await import('leaflet');
		createMap();
	});

	afterUpdate(() => {
		if (!browser) {
			return;
		}
		map?.setView([0, 0]);
	});

	onDestroy(() => {
		if (!browser) {
			return;
		}

		map?.remove();
		map = null;
	});

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}

	function createMap(mapOptions?: L.MapOptions) {
		map = Leaflet.map(mapId).setView(mapOptions?.center ?? [0, 0], mapOptions?.zoom ?? 13);
		Leaflet.tileLayer(tileProvider, tileProviderAttribution).addTo(map);
	}
</script>

<svelte:window on:resize={resizeMap} />
<div class="map">
	<div class="mapInstance" id={mapId}>&nbsp;</div>
</div>

<style>
	div.map {
		background-color: red;
		flex: 1;
	}

	div.mapInstance {
		height: 100%;
		width: 100%;
	}
</style>
