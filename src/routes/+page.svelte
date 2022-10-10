<script lang="ts">
	import type { Record, User } from 'pocketbase';
	import pocketbase from '$lib/pocketbase';
	import { afterUpdate, onMount } from 'svelte';
	import Message from '../components/Message.svelte';
	import LogoutButton from '../components/LogoutButton.svelte';

	const userId = pocketbase.authStore.model?.id || '';
	let messages: Record[] = [];

	const getMessages = async () => {
		messages = await pocketbase.records.getFullList('messages', 200, {
			expand: 'sender_profile',
			sort: 'created'
		});
	};

	const getMessageById = async (id: string) => {
		return await pocketbase.records.getOne('messages', id, {
			expand: 'sender_profile'
		});
	};

	const subscribeToMessages = async () => {
		pocketbase.realtime.subscribe('messages', async (data) => {
			if (data.action == 'create') {
				const fullMessage = await getMessageById(data.record.id);
				messages = [...messages, fullMessage];
			}
		});
	};

	let currentMessageText = '';
	const getProfile = async () => {
		return await pocketbase.records.getOne(
			'profiles',
			(pocketbase.authStore.model as User).profile?.id!
		);
	};

	let profile: Record;
	const sendMessage = async () => {
		if (currentMessageText === '') {
			return;
		}

		const profileId = profile.id;
		const newMessage = {
			content: currentMessageText,
			sender: userId,
			sender_profile: profileId
		};
		await pocketbase.records.create('messages', newMessage);
		currentMessageText = '';
	};

	onMount(async () => {
		profile = await getProfile();
		await getMessages();
		subscribeToMessages();
	});

	afterUpdate(() => {
		var messages = document.getElementById('messages');
		if (messages != null) {
			messages.scrollBy({
				top: messages.scrollHeight,
				left: 0,
				behavior: 'smooth'
			});
		}
	});
</script>

<div class="flex flex-col justify-center items-center min-h-screen">
	<div class="w-full md:w-2/3 lg:w-3/5 xl:w-2/5  p-10 shadow-xl bg-white md:rounded-xl">
		<div class="flex flex-row justify-between mb-3">
			<h1 class="text-xl font-bold ">Group Chat</h1>
			<LogoutButton />
		</div>
		<div class="border w-full" />

		<div id="messages" class="flex flex-col gap-3 mt-5 overflow-y-scroll h-96 scroll-m-0 mx-3">
			{#each messages as message}
				<Message messageFromUser={message.sender == userId} {message} />
			{/each}
		</div>

		<div class="border w-full mt-10" />
		<div class="mb-4 mt-3 flex flex-row ">
			<input
				class="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
				type="text"
				placeholder="..."
				bind:value={currentMessageText}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						sendMessage();
					}
				}}
			/><span class="my-2 block" />
			<button class="p-2 bg-gray-100 rounded-md shadow-md ml-5" on:click={sendMessage}>🚀</button>
		</div>
	</div>
</div>
