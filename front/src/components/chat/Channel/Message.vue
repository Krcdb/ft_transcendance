<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<div class="container mt-2">
		<div class="float-left" :class="this.sender ? 'sender' : 'not-sender'">
			<p :class="this.sender ? 'text-sender' : 'text-not-sender'">
				{{ this.owner.userName }} :
				{{ this.message.message }}
			</p>

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
/*
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

*/

.sender {
	float: right;
	background-color: lightgreen;
	border-radius: 20px;
	width: 75%;
}

.not-sender {
	float: left;
	background-color: darkred;
	border-radius: 20px;
	width: 75%;
}

.text-sender {
	color: white;
	transform: translate(0, 25%);
	float: right;
	margin-right: 15px;
}
.text-not-sender {
	color: white;
	transform: translate(0, 25%);
	float: left;
	margin-left: 15px;
}
</style>
