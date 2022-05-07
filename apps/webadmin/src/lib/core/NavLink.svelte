<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
</script>

<li class:active={$page.url.pathname === href}><a sveltekit:prefetch {href}><slot /></a></li>

<style>
	a {
		color: var(--link-color);
		text-decoration: underline;
	}
	a:hover {
		color: var(--active-color);
		text-decoration: none;
	}
	li.active a {
		color: var(--active-color);
	}
</style>
