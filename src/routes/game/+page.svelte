<script>
	import { goto } from '$app/navigation';
	import { state } from '../../store';
	import { Howl } from 'howler';
	import { onMount } from 'svelte';
	onMount(async () => {
		await state.checkSession().catch(() => {
			goto('/login');
		});
	});
	const logout = async () => {
		await state.logout();
		goto('/login');
	};

	const codeToAudio = {
		'.': '/sound/morse-dot.wav',
		'-': '/sound/morse-dash.wav',
		' ': 'pause' // use "pause" string to add silence between characters
	};

	const playAudio = (src) => {
		return new Promise((resolve) => {
			const sound = new Howl({
				src: [src],
				onload: () => {
					sound.play();
					sound.on('end', resolve);
				}
			});
		});
	};

	const playMorseCode = async (code) => {
		const audioSources = code
			.split('')
			.map((char) => codeToAudio[char])
			.filter((src) => src !== undefined); // remove undefined sources (for spaces)

		for (const src of audioSources) {
			if (src === 'pause') {
				await new Promise((resolve) => setTimeout(resolve, 500)); // add 500ms of silence for spaces
			} else {
				await playAudio(src);
			}
		}
	};
</script>

<h1>Game</h1>
<button class="logout" on:click={logout}>Logout</button>
<!-- play morse code bbutton -->
<button on:click={() => playMorseCode('.--. .-. --- --. .-. --- --. .-.. .')}>Play</button>
