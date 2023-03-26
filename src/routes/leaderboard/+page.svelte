<script>
	import { Client, Databases, Query } from 'appwrite';
	let scores = [];
	const client = new Client()
		.setEndpoint('https://morsemania.up.railway.app/') // Replace with your Appwrite endpoint
		.setProject('641ce07103bff7c6ce23'); // Replace with your Appwrite project ID

	const databases = new Databases(client);

	let promise = databases.listDocuments(
		'641f07fadfb274667be2', // Replace with your Appwrite database ID
		'641f08174117c6dc127b', // Replace with your Appwrite collection ID
		[Query.orderDesc('score')]
	);

	promise.then(
		function (response) {
			console.log(response);
			scores = response.documents;
			console.log(scores.slice(0, 20));
		},
		function (error) {
			console.log(error);
		}
	);
</script>

<div class="min-h-screen w-screen bg-[#10100E] text-white">
	<h1 class="text-center font-black text-[3rem]">LeaderBoard</h1>
	<div class="px-[23vw]">
		{#each scores as score}
			<div class="flex flex-row justify-between">
				<div class="text-center font-black text-[2rem]">{score.username}</div>
				<div class="text-center font-black text-[2rem]">{score.score}</div>
			</div>
		{/each}
	</div>
</div>
