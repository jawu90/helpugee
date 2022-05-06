<script lang="ts">
	import NavLink from './NavLink.svelte';
</script>

<nav>
	<ul>
		<NavLink href="/imprint">Imprint</NavLink>
		<NavLink href="/privacy">Privacy</NavLink>
	</ul>
</nav>

<style>
	nav {
		background-color: var(--text-color);
		padding: 1em 2em;
		--link-color: #fff;
		--active-color: #f00;
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
