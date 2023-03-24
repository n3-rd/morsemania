<!-- <script context="module">
	import { goto } from '$app/navigation';
	import { Client, Account, ID } from 'appwrite';

	const client = new Client()
		.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Set only when using self-hosted solution
		.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

	// check if user is logged in
	export async function preload(page, session) {
		const account = new Account(client);
		const promise = await account.get();

		if (promise.result === null) {
			goto('/login');
		}
	}

	// get user data
	export async function load({ page, fetch }) {
		const account = new Account(client);
		const promise = await account.get();

		return {
			user: promise.result
		};
	}
</script>

<script>
	export let user;
</script>

<h1>Welcome, {user.name}!</h1> -->

<h1>NEWWWWWW</h1>
