<script lang="ts">
	import NavLink from './NavLink.svelte';
</script>

<nav>
	<ul>
		<NavLink href="/">Home</NavLink>
		<NavLink href="/map">Map</NavLink>
		<NavLink href="/map/create">Create</NavLink>
		<NavLink href="/how-to-help">How to help</NavLink>
	</ul>
</nav>

<style>
	nav {
		--link-color: #fff;
		--active-color: var(--text-color);
		background-color: var(--primary-color);
		padding: 1em 2em;
		display: flex;
		justify-content: center;
	}

	ul {
		display: flex;
		justify-content: space-between;
		max-width: 100%;
		list-style: none;
		margin: 0;
		padding: 0;
		width: 42rem;
	}
</style>
