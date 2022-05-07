<script lang="ts">
	import AdministrationPage from '$lib/core/AdministrationPage.svelte';
	import { jwtToken } from '$lib/jwtStore';
	import { API_BASE, type User } from '$lib/user/userApi';

	import { useQuery } from '@sveltestack/svelte-query';

	const getUsers = async () => {
		const res = await fetch(`${API_BASE}/user`, {
			headers: {
				Authorization: `Bearer ${$jwtToken}`
			}
		});
		const users = (await res.json()) as User[];
		console.log({ users });
		return users;
	};

	const queryResult = useQuery('users', getUsers);
	console.log($queryResult.error);
</script>

<svelte:head>
	<title>Administration</title>
	<meta name="description" content="Administration for helpugee" />
</svelte:head>

<AdministrationPage>
	<h2>Registered users</h2>
	<ul>
		{#each $queryResult.data ?? [] as user}
			<li>{user.username}</li>
		{/each}
	</ul>
</AdministrationPage>
