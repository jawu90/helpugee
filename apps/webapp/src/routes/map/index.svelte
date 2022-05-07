<script lang="ts">
	import FilterableMap from '$lib/map/FilterableMap.svelte';
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

<FilterableMap />

<style>
</style>
