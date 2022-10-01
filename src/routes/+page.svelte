<script lang="ts">
	import { goto } from '$app/navigation';
	import pocketbase from '$lib/pocketbase';
	const logout = async () => {
		await pocketbase.authStore.clear();
		goto('/login');
	};
</script>

<button class="bg-blue-500 rounded-xl p-3" on:click={logout}>Logout</button>
