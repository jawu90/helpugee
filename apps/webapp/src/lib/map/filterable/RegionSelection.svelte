<script lang="ts">
	import { getContext } from 'svelte';

	const { request } = getContext('filterable-map');
</script>

<h3>Please select the region you're looking for</h3>
<select name="region" bind:value={$request.region}>
	<option value="">Anywhere</option>
	<option value="germany-lower_bavaria-deggendorf">Deggendorf</option>
	<option value="germany-lower_bavaria-passau">Passau</option>
	<option value="germany-lower_bavaria">Lower bavaria</option>
	<option value="germany">Germany</option>
</select>

<style>
	select {
		width: 100%;
	}
</style>
