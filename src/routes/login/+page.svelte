<script lang="ts">
	import { goto } from '$app/navigation';
	import pocketbase from '$lib/pocketbase';

	let email = '';
	let password = '';
	let authError = false;

	const onSubmitHandler = async () => {
		try {
			await pocketbase.users.authViaEmail(email, password);
			goto('/');
		} catch (e: any) {
			authError = true;
		}
	};
</script>

<div class="w-full min-h-screen flex flex-col justify-center items-center">
	<form
		class="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 bg-white w-full lg:w-1/3 lg:px-16"
		on:submit={(e) => {
			onSubmitHandler();
			e.preventDefault();
		}}
	>
		<h1 class="text-4xl font-bold text-center mb-10">Log in</h1>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold" for="email">E-mail</label><input
				class="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
				type="email"
				placeholder="email"
				bind:value={email}
			/><span class="my-2 block" />
		</div>

		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold" for="name">Password</label><input
				class="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
				type="password"
				placeholder="password"
				bind:value={password}
			/><span class="my-2 block" />
		</div>

		<button class="w-full shadow-md mt-4 bg-blue-300 py-2 px-2 text-center rounded-xl">Login</button
		>
		{#if authError}
			<span class="text-sm mt-3 text-red-500">Email or password is incorrect. Please try again</span
			>
		{/if}
	</form>
</div>
