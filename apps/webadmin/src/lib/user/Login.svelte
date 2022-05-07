<script lang="ts">
	import { jwtToken } from '$lib/jwtStore';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { writable } from 'svelte/store';
	import Button from '$lib/core/forms/Button.svelte';
	import TextInput from '$lib/core/forms/TextInput.svelte';
	import { API_BASE } from './userApi';

	const error = writable<string>();

	async function checkLoginForm(
		event: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) {
		event.preventDefault();
		event.stopPropagation();

		const username =
			event.currentTarget.querySelector<HTMLInputElement>('input[name="username"]')?.value;
		const password =
			event.currentTarget.querySelector<HTMLInputElement>('input[name="password"]')?.value;

		if (!(username && password)) {
			return;
		}

		try {
			const res = await fetch(`${API_BASE}/login`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});
			const result = await res.json();

			if (!res.ok && result.error_msg) {
				throw new Error(result.error_msg);
			}

			$jwtToken = result.jwt;

			goto(`${base}/`);
		} catch (err) {
			$error = (err as Error).message;
		}
	}
</script>

<form on:submit={(e) => checkLoginForm(e)}>
	<fieldset>
		<div>
			<label for="username">Username:</label>
			<TextInput type="text" name="username" />
		</div>
		<div>
			<label for="password">Password:</label>
			<TextInput type="password" name="password" />
		</div>
		<Button type="submit">Login</Button>
		{#if $error}
			<div class="error">Error: {$error}</div>
		{/if}
	</fieldset>
</form>

<style>
	form {
		flex: 1;
		display: flex;
		justify-content: center;
		width: 100%;
	}

	fieldset {
		display: flex;
		flex-direction: column;
		gap: 1em;
		margin: 0;
		padding: 2em;
		box-sizing: border-box;
	}

	div {
		display: flex;
		gap: 1em;
		justify-content: space-between;
	}

	label {
		width: 5em;
	}

	.error {
		background-color: var(--error-background-color);
		border-left: 2px solid var(--error-accent-color);
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		padding: 2em;
	}
</style>
