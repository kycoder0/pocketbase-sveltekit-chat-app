<script lang="ts">
	import type { Record } from 'pocketbase';
	export let messageFromUser: boolean;
	export let message: Record;
	const senderName = message['@expand']?.sender_profile?.name;
</script>

{#if messageFromUser}
	<div class="bg-purple-300 px-5 py-3 rounded-md shadow-md ml-auto flex w-2/5 flex-col">
		<span class="text-sm">{senderName}</span>
		{message.content}
	</div>
{:else}
	<div class="bg-blue-300 px-5 py-3 mr-auto rounded-md shadow-md flex flex-col w-2/5">
		<span class="text-sm">{senderName}</span>
		{message.content}
	</div>
{/if}
