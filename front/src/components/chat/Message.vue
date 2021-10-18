<template>
	<div class="message">
		<div class="flex" :class="message.sender ? 'flex-row-reverse' : ''">
			<!-- AVATAR -->
			<img src="" alt="">

			<div class="text w-3/4" :class="message.sender ? 'bg-green-800' : 'bg-gray-700'">
				{{ user.userName }}: {{ message.message }}
			</div>

		</div>
	</div>
</template>

<script lang="ts">

	import { defineComponent } from "vue";

	import ChatMessage from "@/types/ChatMessage";
	import User from "@/types/User";

	export default defineComponent({
		name: "chat-message",
		data() {
			return {
				user: {} as User,
				message: {} as ChatMessage,
			};
		},
		props: {
			//owner: String,
			Owner: {
				type: String,
				required: true,
			},
		},
		methods: {
			initElements() {
				console.log("Init Elements !");
			},
		},
		mounted() {
			this.message.message = "this is a test !";
			this.message.sender = true;
			this.user.userName = "Default User";

			//owner: props.Owner.label;

			//let OwnerPropRef = ref({
			//	console.log("");
			//})

			//this.message.owner = this.props.PropOwner;
		},
	});
</script>

<style media="screen">
	.sender {

	}

	.notSender {

	}

	.message {

	}
</style>
