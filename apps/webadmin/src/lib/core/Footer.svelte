<script lang="ts">
	import NavLink from './NavLink.svelte';
</script>

<nav>
	<ul>
		<li><NavLink href="/" prefetch={false} rel="external">Back to page</NavLink></li>
	</ul>
</nav>

<style>
	nav {
		--link-color: #fff;
		--active-color: #f00;
		background-color: var(--text-color);
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
