<script lang="ts">
	import { base } from '$app/paths';
	import NavLink from './NavLink.svelte';
</script>

<nav>
	<ul>
		<NavLink href={`${base}/`}>Home</NavLink>
		<NavLink href={`${base}/users`}>Users</NavLink>
	</ul>
</nav>

<style>
	nav {
		--link-color: #fff;
		--active-color: rgba(255, 255, 255, 0.8);
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
