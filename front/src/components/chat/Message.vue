<template>
	<div class="message">
		<div class="flex" :class="message.sender ? 'flex-row-reverse' : ''">
			<!-- AVATAR -->
			<div class="text w-3/4" :class="message.sender ? 'bg-green-800' : 'bg-gray-700'">
				{{ user.userName }}: {{ message.message }}
			</div>

		</div>
	</div>
</template>

<script lang="ts">

	import ChatMessage from "@/types/ChatMessage";
	import User from "@/types/User";

	export default {
		name: "chat-message",
		data() {
			return {
				user: {} as User,
				message: {} as ChatMessage,
			};
		},
	mounted() {
		this.message.message = "this is a test !";
		this.user.userName = "Default User";
	},
}
</script>
