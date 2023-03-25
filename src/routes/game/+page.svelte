<script>
	import { goto } from '$app/navigation';
	import { state } from '../../store';
	import { Howl, Howler } from 'howler';
	import { onMount } from 'svelte';

	const codeToAudio = {
		'.': '/sound/morse-dot.wav',
		'-': '/sound/morse-dash.wav',
		' ': 'pause' // use "pause" string to add silence between characters
	};

	const playAudio = (src) => {
		Howler.stop();
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

		isPlaying = false; // Set isPlaying to false after the morse code is done playing
	};

	let morseCode = '';
	let morseCodeSymbols = '';
	let guess = '';
	let isPlaying = false;

	const codes = [
		{ text: 'PROGRAM', code: '.--. .-. --- --. .-. --- --. .-.. .' },
		{ text: 'SVELTE', code: '... ...- .-.. - .-' },
		{
			text: 'JAVASCRIPT',
			code: '.--- .- ...- .- ...-.- -.-- .--. ..- --. ....- .. - -.-. .-.. .. -.-. -.--'
		}
	];

	const getRandomCode = () => {
		const index = Math.floor(Math.random() * codes.length);
		return codes[index];
	};

	const startGame = () => {
		const code = getRandomCode();
		morseCode = code.text;
		morseCodeSymbols = code.code;
		playMorseCode(morseCodeSymbols);
		isPlaying = true;
	};

	const submitGuess = () => {
		const textToMorse = (text) => {
			return text
				.toUpperCase()
				.split('')
				.map((char) => codeToAudio[char])
				.filter((src) => src !== undefined) // remove undefined sources (for spaces)
				.join(' ');
		};

		if (guess === morseCode) {
			// Check if the guess is correct
			alert('Correct!');
			isPlaying = false;
			guess = '';
			morseCodeSymbols = '';
		} else {
			alert('Incorrect. Try again.');
		}
	};

	onMount(async () => {
		await state.checkSession().catch(() => {
			goto('/login');
		});
	});

	const logout = async () => {
		await state.logout();
		goto('/login');
	};
</script>

<h1>Guess the Morse Code</h1>
<button class="logout" on:click={logout}>Logout</button>
<div>
	<p>Morse Code: {morseCodeSymbols}</p>
	<p>Guess: {guess}</p>
	<input bind:value={guess} on:input={() => (guess = guess.toUpperCase())} />
	<button on:click={startGame}>Start</button>
	<button on:click={submitGuess}>Submit</button>
</div>
