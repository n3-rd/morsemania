<script>
	import LoginButton from '../lib/LoginButton.svelte';
	import PlayButton from '../lib/PlayButton.svelte';
	import SignUpButton from '../lib/SignUpButton.svelte';
</script>

<div class="min-h-screen w-screen">
	<h1 class="font-black text-[3rem] text-center">Morsemania .-..</h1>
	<h3 class="text-center font-medium">
		A simple morse code game built with Sveltekit and Appwrite
	</h3>

	<div class="h-full w-full flex justify-center items-center">
		<PlayButton />
		<LoginButton />
		<SignUpButton />
	</div>
</div>
