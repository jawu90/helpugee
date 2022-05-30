<script lang="ts" context="module">
	import 'leaflet/dist/leaflet.css';
	import type * as L from 'leaflet';

	let id = 0;
	const DEFAULT_CENTER: L.LatLngExpression = [48.8403285, 12.9489849];
	const tileProvider = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
	const tileProviderAttribution = {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	};
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { afterUpdate, getContext, onDestroy, onMount } from 'svelte';
	import type { Feature } from './types';
	import type { LatLngExpression } from 'leaflet';
	import type { Readable } from 'svelte/store';

	let map: L.Map | null = null;
	const mapId = `result-map-${++id}`;
	let Leaflet: typeof L;

	const { results } = getContext<{ results: Readable<Feature[]> }>('filterable-map');

	onMount(async () => {
		if (!browser) {
			return;
		}
		Leaflet = await import('leaflet');
		createMap();
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

	function createMap() {
		map = Leaflet.map(mapId);
		Leaflet.tileLayer(tileProvider, tileProviderAttribution).addTo(map);

		const coords: LatLngExpression[] = [];
		for (const feature of $results ?? []) {
			const geom = JSON.parse(feature.geom);
			if (geom.type !== 'Point') {
				continue;
			}

			const latlng = geom.coordinates;
			Leaflet.marker(latlng).addTo(map);
			coords.push(latlng);
		}

		if (coords.length === 0) {
			map.setView(DEFAULT_CENTER, 13);
		}

		if (coords.length >= 1) {
			const bounds = Leaflet.latLngBounds(coords);
			map.fitBounds(bounds);
		}
	}

	afterUpdate(() => {
		if (!map || $results?.length === 0) {
			return;
		}

		map.remove();
		createMap();
	});
</script>

<svelte:window on:resize={resizeMap} />
<div class="map">
	<div class="mapInstance" id={mapId}>&nbsp;</div>
</div>

<style>
	div.map {
		flex: 1;
	}

	div.mapInstance {
		height: 100%;
		width: 100%;
	}
</style>
