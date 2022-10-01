<script>
	import '../app.css';
	import pocketbase from '$lib/pocketbase';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const isLoggedIn = pocketbase.authStore.isValid;
	const currentPath = $page.url.pathname;

	/* 
    if the user is logged in and they are trying
    to go to /login or /register, redirect them
    to the home page
  */
	onMount(() => {
		if (isLoggedIn && (currentPath == '/login' || currentPath == '/signup')) {
			goto('/');
		} else if (!isLoggedIn && currentPath == '/') {
			/* 
        if the user is not logged in and they try to acces
        the home page, redirect them to login
      */
			goto('/login');
		}
	});
</script>

<div class="min-h-screen bg-gray-50">
	<slot />
</div>
