<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<div class="container" :class="this.sender ? 'message-sender' : 'message-not-sender'">
		<div v-if="!this.sender" class="sender-info">
			{{ this.owner.userName }}
		</div>
		<div :class="this.sender ? 'sender' : 'not-sender'">
			<!-- <Avatar :user="this.owner.id" /> -->
			<p :class="this.sender ? 'text-sender' : 'text-not-sender'">
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
// import Avatar from "@/components/users/Avatar.vue";

export default defineComponent({
	name: "chat-message",
	// components: {
	// 	Avatar,
	// },
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

<style media="screen" scoped>
.container {
	display: flex;
	flex-direction: column;
}
.message-sender {
	float: right;

}
.container.message-sender {
	align-items: flex-end;
	margin: 5px;
}
.container.message-not-sender {
	align-items: flex-start;
}
.message-not-sender {
	float: left;
}
.sender {
	float: right;
	background-color: #218aff;
	border-radius: 20px;
	max-width: 75%;
	padding: 3px;
}
.not-sender {
	float: left;
	background-color: grey;
	border-radius: 20px;
	max-width: 75%;
	padding: 3px;
}
p {
	padding-top: 5px;
	color: white;
	margin: 5px;
}

.text-sender {
	text-align: right;
}
.text-not-sender {
	text-align: left;
}
.sender-info {
	margin-inline: 15px;
}
.sender-info img {
	width: 30px;
	height: 30px;
}
</style>
