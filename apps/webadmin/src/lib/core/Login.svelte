<script lang="ts">
	import { jwtToken } from '$lib/jwtStore';

	const API_BASE = '/api/v1';

	async function checkLoginForm(
		event: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) {
		const username =
			event.currentTarget.querySelector<HTMLInputElement>('input[name="username"]')?.value;
		const password =
			event.currentTarget.querySelector<HTMLInputElement>('input[name="password"]')?.value;

		if (!(username && password)) {
			return;
		}

		const res = await fetch(`${API_BASE}/users`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		const result = await res.json();
		$jwtToken = result.jwt;
	}
</script>

<div>
	<form on:submit={(e) => checkLoginForm(e)}>
		<fieldset>
			<label
				><span>Username:</span>
				<input type="text" name="username" />
			</label>
			<label
				><span>Password:</span>
				<input type="password" name="password" />
			</label>
			<button type="submit">Login</button>
		</fieldset>
	</form>
</div>
