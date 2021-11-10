<template>
	<div class="Channel-Pannel">

		<!-- PLAYERS LIST -->
		<div class="List-Players">

			{{ user.userName }}
			{{ channel.channelName }}

			<div class="Player-List">

				<h4>Joueurs connectés au salon</h4>
				<ul class="Player-List-ul">
					<li class="Player-List-Element" v-for="player in PlayerList" :key="player.id">
						<img :src="`https://avatars.dicebear.com/api/avataaars/${player.id}.svg`"/>
						<h4> {{ player.userName }} </h4>
					</li>
				</ul>
			</div>
		</div>

		<div class="Messages-Box">
			<h4>Message Box</h4>
			<hr>

			<div class="Mesages">
				<ul class="Players-Messages">
					<li class="Players-List-Messages" v-for="message in Messages" :key="message.id">
						<MessageComponent :message="message"/>
					</li>
				</ul>
			</div>
		</div>


		<hr>
		<h4>Message: <input type="text" v-model="currentMessage.message"></h4>
		<button type="button" name="button"
		@click="SendMessage">Envoyer</button>


	</div>
</template>

<script lang="ts">
//import Vue from "vue";
import { defineComponent } from "vue";
import User from "@/types/User";
import ChannelDataService from "@/services/ChannelDataService";
import UserDataService from "@/services/UserDataService";
import ResponseData from "@/types/ResponseData";
import Channel from "@/types/Channel";
import Message from "@/types/ChatMessage";

import MessageComponent from "./Message.vue";

import VueSocketIO from 'vue-socket.io';

export default defineComponent({
	data() {
		return {
			PlayerList: [] as User[],
			user: {} as User,
			channel: {} as Channel,
			Messages: [] as Message[],
			currentMessage: {} as Message,
		};
	},
	sockets: {
		connect: function () {
			console.log('socket connected');
		},
		customEmit: function (data: number) {
			console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)' + data);
		},
		refreshChannelMessages: function() {
			console.log("refresh socket");
		},
	},
	components: {
		MessageComponent,
	},
	methods: {
		async getAllPlayersInChannel() {
			let users: Array<number>;

			await ChannelDataService.getAllUsersInChannel(this.channel.channelName)
			.then((response: ResponseData) => {
				users = response.data.users;

				console.log("Users Length: " + users.length);


				for (let index = 0; index < users.length; index++) {
					const element = users[index];
					console.log("Element : " + element);

					UserDataService.get(element)
					.then((responseUser: ResponseData) => {
						this.PlayerList.push(responseUser.data);
					})
					.catch((e: Error) => {
						console.log(e);
					});

				}
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async getUser(id: number) {
			await UserDataService.get(id)
			.then((response: ResponseData) => {
				this.user = response.data;
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async getChannel(name: string) {
			await ChannelDataService.getChannel(name)
			.then((response : ResponseData) => {
				this.channel = response.data;
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async getMessageByID(id : number) {
			ChannelDataService.getMessageFromChannel(this.channel.channelName, id)
			.then((response : ResponseData) => {
				while (this.Messages.length > 0)
				this.Messages.pop();
				for (let index = 0; index < response.data.length; index++) {
					const element = response.data[index];
					this.Messages.push(response.data[index]);
				}
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async getMessages() {
			let messages: Array<number>;

			await ChannelDataService.getMessagesInChannel(this.channel.channelName)
			.then((response : ResponseData) => {
				messages = response.data;
				for (let index = 0; index < messages.length; index++) {
					const element = messages[index];
					this.getMessageByID(index);
				}
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async initChannel() {
			console.log("name: " + this.channel.channelName);
			console.log("Post into : " + this.channel.channelName  + " ID: " + this.user.id);

			const data = {
				"newUser": this.user.id as number,
			};

			await ChannelDataService.addChannelUser(this.channel.channelName, data)
			.then((response : ResponseData) => {
				console.log("Successfully added user connected");
			})
			.catch((e: Error) => {
				console.log(e);
			});

			this.currentMessage.id = 0;
			this.currentMessage.owner = this.user.id;
			this.currentMessage.message = "";
		},
		async SendMessage() {
			if (this.currentMessage.message != "") {
				await ChannelDataService.sendMessageToChannel(this.channel.channelName, this.currentMessage)
				.then((response : ResponseData) => {
					console.log("SendMessage: " + response.data);
					//this.$socket.emit('message', this.currentMessage.message);
					this.getMessages();
				})
				.catch((e: Error) => {
					console.log(e);
				});
			}
		},
		// SocketHandler
		refreshChannelMessages() {
			console.log("refresh");
		},
		async init() {
			await this.getUser(Number(localStorage.getItem("user-id")));
			await this.getChannel(String(localStorage.getItem("channel-name")));
			await this.initChannel();
			await this.getMessages();

			await this.getAllPlayersInChannel();
		}
	},
	mounted() {
		this.init();
	},
});
</script>

<style media="screen">

.Player-List {
	display: inline-block;
	float: left;
	position: relative;
	border: 4px solid lightgreen;
	border-radius: 12px;
	background-color: rgb(20, 20, 20);
	color: white;
	padding: 25px;
}

.Player-List-Element {
	display: flex;
}

.Player-List-Element h4 {
	margin-top: 75px;
	border: 2px solid lightgreen;
	border-radius: 6px;
	padding: 10px;
	background-color: rgb(2, 6, 33);
}

.Player-List-Element img {
	width: 128px;
}


.Messages-Box {
	width: 50%;
	min-height: 360px;
	height: 720px;
	margin: 0 auto;
	background-color: rgb(20, 20, 20);

	border: 4px solid lightgreen;
	border-radius: 12px;
	color: white;
	overflow-x: hidden;
}

</style>
