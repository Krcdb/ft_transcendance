<template>
	<div class="message">
		<div class="flex">
			<!-- AVATAR -->
			<img src="" alt="">

			<!--
			<div class="text w-3/4" :class="message.sender ? 'bg-green-800' : 'bg-gray-700'">
				{{ owner.userName }}: {{ message.message }}
			</div>
			-->

			{{ user.userName }} : {{ message }}

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
				user: this.owner,
				message: {} as ChatMessage,
				//user: {} as User,
				//message: {} as ChatMessage,
			};
		},
		props: {
			owner: {
				type: Object as () => User,
				//type: String,
				required: true,
			},
			prop_message: {
				type: String,
				required: true,
			}
		},
		methods: {
			initElements() {
				console.log("Init Elements !");
			},
		},
		mounted() {
			this.message.message = this.prop_message;

			console.log("Message: Mounted");
			console.log("Message: User: " + this.user.userName + " | Message: " + this.message.message);
			//this.message.message = "this is a test !";
			//this.message.sender = true;
			//this.user.userName = "Default User";

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
