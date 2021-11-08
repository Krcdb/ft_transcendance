// todo créer la zone chat avec les joueurs connectés à droite et chat a gauche ou inversement
// écrire des messages, a envoyer dans le back et avec les socket informer les autres joueurs du channel de refresh


// si atom bug c'est le plugin typescript

<template>
	<div class="Channel-Pannel">

		<!-- PLAYERS LIST -->
		<div class="List-Players">

			{{ user.userName }}
			{{ channel.channelName }}

			<h4>Joueurs connectés au salon</h4>
			<ul class="Player-List">
				<li class="Player-List-Element" v-for="player in PlayerList" :key="player.id">
					<p>
						Name: {{ player.userName }}
					</p>
				</li>
			</ul>
		</div>



		<h4>Message: <input type="text" name="" value=""></h4>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import User from "@/types/User";
import ChannelDataService from "@/services/ChannelDataService";
import UserDataService from "@/services/UserDataService";
import ResponseData from "@/types/ResponseData";
import Channel from "@/types/Channel";

export default defineComponent({
	data() {
		return {
			PlayerList: [] as User[],
			user: {} as User,

			channel: {} as Channel,
		};
	},
	methods: {
		getAllPlayersInChannel() {
			//let users: Array<User>;
			//console.log("Users: " + users);

			ChannelDataService.getAllUsersInChannel(this.channel.channelName)
			.then((response: ResponseData) => {

				for (let index = 0; index < response.data.length; index++) {
					const element = response.data[index];
					console.log("Element: " + element);

				}
				//this.PlayerList = response.data;
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
		async initChannel() {
			console.log("name: " + this.channel.channelName);

			await ChannelDataService.addChannelUser(this.channel.channelName, this.user.id)
			.then((response : ResponseData) => {
				console.log("Successfully added user connected");
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async init() {
			await this.getAllPlayersInChannel();
			await this.getUser(Number(localStorage.getItem("user-id")));
			await this.getChannel(String(localStorage.getItem("channel-name")));
			await this.initChannel();
		}
	},
	mounted() {
		this.init();
	},
});
</script>

<style media="screen">

</style>
