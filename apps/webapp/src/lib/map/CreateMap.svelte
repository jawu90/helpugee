<script lang="ts" context="module">
	import 'leaflet/dist/leaflet.css';
	import type * as L from 'leaflet';

	let id = 0;
	const DEFAULT_CENTER: L.LatLngExpression = [48.5501835, 12.1342703];
	const tileProvider = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
	const tileProviderAttribution = {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	};
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { onDestroy, onMount } from 'svelte';

	let map: L.Map | null;
	let marker: L.Marker | null;
	const mapId = `create-map-${++id}`;
	let Leaflet: typeof L;

	let lat: L.LatLng['lat'];
	let lng: L.LatLng['lng'];
	let name: string;
	let description: string;

	onMount(async () => {
		if (!browser) {
			return;
		}
		Leaflet = await import('leaflet');
		createMap({ center: DEFAULT_CENTER });
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
		map.on('click', (event: L.LeafletMouseEvent) => {
			const { latlng } = event;
			if (!map) {
				return;
			}
			if (marker) {
				marker.remove();
			}
			marker = Leaflet.marker(latlng).addTo(map);
			lat = latlng.lat;
			lng = latlng.lng;
		});
	}

	function submitForm(e: SubmitEvent) {
		e.preventDefault();
		e.stopPropagation();
		console.log('submitting', { name, description, location: { lat, lng } });
	}
</script>

<svelte:window on:resize={resizeMap} />
<section>
	<div class="map">
		<div class="mapInstance" id={mapId}>&nbsp;</div>
	</div>
	<form action="" on:submit={submitForm}>
		<input type="hidden" name="lat" value={lat} />
		<input type="hidden" name="lng" value={lng} />
		<label><span>Name:</span><input type="text" name="name" bind:value={name} /></label>
		<label><span>Description:</span><textarea name="description" bind:value={description} /></label>
		<button
			disabled={lat === undefined ||
				lng === undefined ||
				name === undefined ||
				description === undefined}>Submit</button
		>
	</form>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 1rem;
		min-height: 80vh;
	}

	@media (min-width: 1200px) {
		section {
			flex-direction: row;
		}
	}

	div.map {
		flex: 1;
	}

	div.mapInstance {
		height: 100%;
		width: 100%;
	}

	form {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 1em;
	}

	label {
		display: flex;
		flex-direction: column;
	}
</style>
