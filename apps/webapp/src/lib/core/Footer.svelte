<script lang="ts">
	import NavLink from './NavLink.svelte';
	const VITE_WEBADMIN_URL = import.meta.env.VITE_WEBADMIN_URL;
</script>

<nav>
	<ul>
		<NavLink href="/imprint">Imprint</NavLink>
		<NavLink href="/privacy">Privacy</NavLink>
		<NavLink href={VITE_WEBADMIN_URL} prefetch={false} rel="external">Administration</NavLink>
	</ul>
</nav>

<style>
	nav {
		--link-color: #fff;
		--active-color: var(--text-color);
		background-color: var(--text-color);
		padding: 1em 2em;
		display: flex;
		justify-content: center;
		position: relative;
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
