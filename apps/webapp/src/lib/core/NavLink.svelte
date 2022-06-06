<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let prefetch = true;
</script>

<li class:active={$page.url.pathname === href}>
	{#if prefetch}
		<a sveltekit:prefetch {href} {...$$props}><slot /></a>
	{:else}
		<a {href} {...$$props}><slot /></a>
	{/if}
</li>

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
