<script>
	import { goto } from '$app/navigation';
	import { state } from '../../store';
	import { Howl, Howler } from 'howler';
	import { onMount } from 'svelte';
	import { Client, Databases, Account } from 'appwrite';
	import { uid } from 'uid';
	import codes from '../../lib/morseDictionary';

	let morseElement;

	const client = new Client()
		.setEndpoint('http://localhost/v1') // Replace with your Appwrite endpoint
		.setProject('641ce07103bff7c6ce23'); // Replace with your Appwrite project ID

	const addPoints = async (points) => {
		const database = new Databases(client);
		const account = new Account(client);
		const user = await account.get();

		const result = await database.createDocument(
			'641f07fadfb274667be2', // Replace with your Appwrite database ID
			'641f08174117c6dc127b', // Replace with your Appwrite collection ID
			uid(20),
			{
				username: user.name,
				score: points,
				timestamp: new Date(Date.now()).toISOString()
			}
		);

		return result;
	};

	const flashGreen = (element) => {
		element.classList.add('text-green-500');
		setTimeout(() => {
			element.classList.remove('text-green-500');
		}, 100);
	};

	const flashRed = (element) => {
		element.classList.add('text-red-500');
		setTimeout(() => {
			element.classList.remove('text-red-500');
		}, 100);
	};

	import SoundIcon from '../../lib/soundIcon.svelte';
	import LeaderBoard from '../../lib/leaderBoardIcon.svelte';
	import LeaderBoardIcon from '../../lib/leaderBoardIcon.svelte';

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
	let timer = 20;
	let intervalId;
	let score = 0;

	const getRandomCode = () => {
		const index = Math.floor(Math.random() * codes.length);
		return codes[index];
	};

	const startTimer = () => {
		clearInterval(intervalId);
		timer = 20;
		intervalId = setInterval(() => {
			timer--;
			if (timer === 0) {
				clearInterval(intervalId);
				alert('Game Over!');
				if (score > 0) {
					addPoints(score);
				}
				isPlaying = false;
				guess = '';
				morseCodeSymbols = '';
			}
		}, 1000);
	};

	const startGame = () => {
		const code = getRandomCode();
		morseCode = code.text;
		morseCodeSymbols = code.code;
		playMorseCode(morseCodeSymbols);
		isPlaying = true;
		timer = 0;
		startTimer();
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
			flashGreen(morseElement);

			score++;
			isPlaying = false;
			Howler.stop();
			guess = '';
			morseCodeSymbols = '';
			timer = 0;
			startGame();
		} else {
			flashRed(morseElement);
			score = 0;
			guess = '';
			Howler.stop();
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

<div class="h-screen w-screen bg-[#10100E] text-white overflow-hidden">
	<h1 class="font-black text-[3rem] text-center">Guess the Morse Code</h1>
	<button class="logout" on:click={logout}>Logout</button>
	<div class="h-[90vh] flex justify-center items-center">
		<div class="w-full flex justify-center items-center flex-col">
			<div class="py-6">
				<div class="block text-[3rem] font-bold" bind:this={morseElement}>
					{morseCodeSymbols}
				</div>
			</div>
			<div>
				<p class="my-4 font-bold text-xl">Time left: {timer}s</p>
			</div>
			<p class="py-6">Guess: {guess}</p>
			<div>
				<input
					class="text-[#10100E] px-4 py-2 rounded-lg font-semibold"
					bind:value={guess}
					on:input={() => (guess = guess.toUpperCase())}
					on:keydown={(event) => {
						if (event.key === 'Enter') {
							submitGuess();
						}
					}}
				/>
			</div>
			<div>
				<button
					type="button"
					on:click={startGame}
					class="my-6 bg-white inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-[#10100E] transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
				>
					Start
				</button>
				<button
					type="button"
					on:click={submitGuess}
					class="my-6 bg-white inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-[#10100E] transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
				>
					Submit
				</button>
			</div>
		</div>
	</div>
	<div class="absolute bottom-2 left-4">
		<SoundIcon />
	</div>
	<div class="absolute bottom-2 right-4">
		<LeaderBoardIcon />
	</div>
</div>
