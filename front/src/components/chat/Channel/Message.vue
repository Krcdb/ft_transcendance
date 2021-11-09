<template>
	<div class="message">
		<div class="message-box"  :class="this.sender ? 'sender' : 'not-sender'">
			<h4>
				{{ this.owner.userName }} :
				{{ this.message.message }}
			</h4>

		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChatMessage from "@/types/ChatMessage";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";
import ChannelDataService from "@/services/ChannelDataService";
import UserDataService from "@/services/UserDataService";

export default defineComponent({
	name: "chat-message",
	data() {
		return {
			user: {} as User,
			owner: {} as User,
			sender: false as boolean,
		};
	},
	props: {
		message: {
			type: Object as () => ChatMessage,
			required: true,
		}
	},
	methods: {
		async getUserByID(id: number) {
			await UserDataService.get(id)
			.then((response : ResponseData) => {
				this.user = response.data;
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async getOwnerByID(id: number) {
			await UserDataService.get(id)
			.then((response : ResponseData) => {
				this.owner = response.data;
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async initElements() {
			await this.getUserByID(Number(localStorage.getItem("user-id")));
			await this.getOwnerByID(this.message.owner);

			this.sender = (this.user.id === this.message.owner ? true : false);
			console.log("isSender: " + this.sender + " | " + this.user.id + " == " + this.message.owner);

		},
	},
	mounted() {
		this.initElements();
	},
});
</script>

<style media="screen">
.message {
	width: 100%;
	display: inline-block;
	margin: 0 auto;
}

.message-box {
	width: 50%;
	border: 4px solid lightgreen;
	border-radius: 8px;
}

.message-box h4 {
	font-size: 24px;
}

.sender {
	float: left;
	background-color: lightgreen;
}

.not-sender {
	float: right;
	background-color: darkred;
}
</style>
