<script>
	import { goto } from '$app/navigation';
	import { state } from '../../store';

	let email = '';
	let password = '';
	let error = null;

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await state.login(email, password);
			goto('/game');
		} catch (error) {
			state.alert({
				color: 'red',
				message: error.message
			});
		}
	};
</script>

<section class="h-screen bg-[#10100E]">
	<div class="container h-full px-6 py-12">
		<div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
			<div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 text-center font-black text-[4rem]">
				Morsemania
			</div>
			<div class="md:w-8/12 lg:ml-6 lg:w-5/12">
				<form on:submit|preventDefault={handleSubmit}>
					<!-- Email input -->
					<div class="relative mb-6" data-te-input-wrapper-init>
						<input
							type="email"
							class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
							id="exampleFormControlInput3"
							placeholder="Email address"
							bind:value={email}
						/>
						<label
							for="exampleFormControlInput3"
							class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
							>Email address
						</label>
					</div>
					<!-- Password input -->
					<div class="relative mb-6" data-te-input-wrapper-init>
						<input
							type="password"
							class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
							id="exampleFormControlInput33"
							placeholder="Password"
							bind:value={password}
						/>
						<label
							for="exampleFormControlInput33"
							class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
							>Password
						</label>
					</div>
					<button
						type="submit"
						class="inline-block w-full rounded bg-black px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal bg-white text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
					>
						Login
					</button>
					<!-- Password reset link -->
					<div class="text-center">
						<a
							href="#"
							class="text-neutral-500 hover:text-primary focus:text-primary focus:outline-none transition-all duration-200 ease-out"
						>
							Forgot Password?
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
