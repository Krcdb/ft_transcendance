<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<div class="d-flex container">

		<!-- PLAYERS LIST -->
		<div class="container">

			<div class="d-flex align-items-baseline">
				<h6 class="m-0">ChannelName: {{ channel.channelName }}</h6>
				<h6 class="m-2">Owner: {{ user.userName }}</h6>
			</div>

			<div class="d-flex player-list">
				<div class="align-items-center">
					<p>Joueurs connectés au salon</p>
					<li class="list-group-item d-flex mt-2 align-items-center" v-for="player in PlayerList" :key="player.id">
						<img :src="`https://avatars.dicebear.com/api/avataaars/${player.id}.svg`" width="64"/>
						<p class="mt-4"> {{ player.userName }} </p>
					</li>
				</div>
			</div>
		</div>

		<!-- CHAT BOX -->
		<div class="d-flex flex-column container-fluid">
			<h4 class="mt-4">Message Box {{ channel.channelName }}</h4>
			<hr>
			<div class="message-box container d-flex flex-column" ref="ScrollBar">
				<div class="Mesages">
					<ul class="list-group" style="height:512px">
						<li class="Plist-group-item" v-for="message in Messages" :key="message.id">
							<MessageComponent :message="message"/>
						</li>
					</ul>
				</div>
			</div>

			<div class="bottom">

				<hr>
				<p>Message: <input type="text" v-model="currentMessage.message"></p>
				<button type="button" name="button" class="btn btn-secondary m-2" style="width:75%"
				@click="SendMessage">Envoyer</button>
			</div>

		</div>
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
import io from "socket.io-client";

const socket = io("http://localhost:3000", {
	auth: {
		token: localStorage.getItem('user-token'),
		userId: localStorage.getItem('user-id'),
		page: 'channel'
	}
});

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
					socket.emit('sendMessage', this.channel.channelName);
				})
				.catch((e: Error) => {
					console.log(e);
				});
			}
		},
		async checkMessages() {
			await this.getMessages();
			await this.getAllPlayersInChannel();

			let scrollBar = (this.$refs.ScrollBar) as any;
			scrollBar.scrollTop = scrollBar.scrollHeight;

			console.log("Refresh CHannel");
		},
		async init() {
			await this.getUser(Number(localStorage.getItem("user-id")));
			await this.getChannel(String(localStorage.getItem("channel-name")));
			await this.initChannel();
			await this.getMessages();

			await this.getAllPlayersInChannel();

			socket.emit('JoinChannel', this.channel.channelName);
			socket.on('refreshChannelMessages', (uuid: string) => {
				console.log('Init Socket ON: ' + uuid);
				this.checkMessages();
			});
		}
	},
	mounted() {
		this.init();
	},
});
</script>

<style media="screen">

.player-list {
	position: relative;
	overflow-x: hidden;
}

/*
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
*/


.message-box {
	overflow-x: hidden;
	border: 1px solid black;
	scroll-behavior: smooth;
}

</style>
