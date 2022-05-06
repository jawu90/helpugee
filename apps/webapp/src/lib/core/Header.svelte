<script lang="ts">
	import NavLink from './NavLink.svelte';
</script>

<nav>
	<ul>
		<NavLink href="/">Home</NavLink>
		<NavLink href="/map">Map</NavLink>
		<NavLink href="/how-to-help">How to help</NavLink>
	</ul>
</nav>

<style>
	nav {
        --link-color: #fff;
        --active-color: #f00;
		background-color: var(--primary-color);
		padding: 1em 2em;
	}

	ul {
		display: flex;
		justify-content: space-between;
		max-width: 42rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>
