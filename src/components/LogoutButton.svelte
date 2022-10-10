<script lang="ts">
	import pocketbase from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	const logout = async () => {
		await pocketbase.authStore.clear();
		goto('/login');
	};
</script>

<button class="bg-red-300 rounded-md shadow-md py-1 px-3" on:click={logout}>Logout</button>
