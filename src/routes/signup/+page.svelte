<script lang="ts">
	import pocketbase from '$lib/pocketbase';

	let email = '';
	let password = '';
	let passwordConfirm = '';
	let name = '';

	const onSubmitHandler = async () => {
		// simple password validation
		if (password.length >= 8 && password == passwordConfirm) {
			// create the user
			const user = await pocketbase.users.create({
				email,
				password,
				passwordConfirm
			});

			// if user was created
			if (user) {
				// log the user in
				await pocketbase.users.authViaEmail(email, password);

				// does the profile exist?
				if (user.profile) {
					// update profile with their name
					await pocketbase.records.update('profiles', user.profile?.id, {
						name
					});
				}
			}
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
		<h1 class="text-4xl font-bold text-center mb-10">Sign Up</h1>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold" for="email">E-mail</label><input
				class="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
				type="email"
				placeholder="email"
				bind:value={email}
			/><span class="my-2 block" />
		</div>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold" for="name">Name</label><input
				class="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
				type="text"
				placeholder="name"
				bind:value={name}
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
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold" for="name">Confirm Password</label><input
				class="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
				type="password"
				placeholder="password"
				bind:value={passwordConfirm}
			/><span class="my-2 block" />
		</div>
		<button class="w-full shadow-md mt-4 bg-blue-300 py-2 px-2 text-center rounded-xl"
			>Sign Up</button
		>
	</form>
</div>
