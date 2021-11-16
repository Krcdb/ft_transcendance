<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<div class="d-flex container">

		<!-- PLAYERS LIST -->
		<div class="container">

			<div class="d-flex align-items-baseline">
				<!-- <h6 class="m-0">Channel Name: {{ channel.channelName }}</h6> -->
				<h6 class="m-2">Owner: {{ user.userName }}</h6>
			</div>

			<div class="d-flex player-list">
				<div class="align-items-center">
					<p>Users connected to the channel</p>
					<ul class="list">
					<li class="list-item" v-for="player in PlayerList" :key="player.id">
						<Avatar :user="player" />
						<div class="list-item-content">
							<router-link class="profile-link" :to="'/users/' + player.id">
								<h4>{{ player.userName }}</h4>
							</router-link>
						</div>
						<!-- <div class="friend-status" v-if="friends.indexOf(user.id) !== -1">
							Friend
						</div> -->
						<!-- <div class="me-status" v-if="player.id == user.id">Me</div> -->
						<div class="user-status">
							<div v-if="player.isActive" id="online-circle"></div>
							<div v-else id="offline-circle"></div>
						</div>
						<!-- <Avatar :user="player" />
						<p class="mt-4"> {{ player.userName }} </p> -->
					</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="message-box container d-flex flex-column">
			<h4 class="mt-4">{{ channel.channelName }}</h4>
			<hr>
			<div class="Mesages">
				<ul class="list-group" style="height:512px">
					<li class="Plist-group-item" v-for="message in Messages" :key="message.id">
						<MessageComponent :message="message"/>
					</li>
				</ul>
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
import Avatar from "@/components/users/Avatar.vue";

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
		Avatar,
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
				console.log("response = ", response.data);
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
			console.log("Message = ", this.currentMessage);
			const data = {
				"owner": this.currentMessage.owner as number,
				"message": this.currentMessage.message as string,
			};
			if (this.currentMessage.message != "") {
				await ChannelDataService.sendMessageToChannel(this.channel.channelName, data)
				.then((response : ResponseData) => {
					console.log("SendMessage: " + response.data);
					//this.$socket.emit('message', this.currentMessage.message);
					this.currentMessage.message = "";
					this.getMessages();

				})
				.catch((e: Error) => {
					console.log(e);
				});
			}
		},

		async delay(ms: number) {
			return new Promise( resolve => setTimeout(resolve, ms) );
		},
		async checkMessages() {
			// solution temporaire, utiliser les websockets, ça... c'est vraiment de la giga merde !
			await this.getMessages();
			this.delay(10000);
			await this.checkMessages();
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
			await this.checkMessages();
		}
	},
	mounted() {
		this.init();
	},
});
</script>

<style media="screen" scoped>
.container img {
	width: 64px;
	height: 64px;
	object-fit: contain;
}
.list {
  background-color: white;
  border-radius: 2px;
  list-style: none;
}
.player-list {
	position: relative;
	overflow-x: hidden;
}
.list-item-content {
  margin-left: 20px;
  margin-right: auto;
}
/* .me-status {
  background-color: black;
  font-weight: bold;
  font-size: 10px;
  color: white;
  padding: 5px;
} */
.profile-link {
  color: black;
  text-decoration: none;
  align-content: center;
}
.profile-link h4 {
  font-size: 18px;
}
.list-item {
  display: flex;
  align-content: center;
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
}
.user-status {
  margin-left: 5%;
  margin-right: 0%;
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
}

</style>
