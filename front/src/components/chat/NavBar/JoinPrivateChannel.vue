<template>
	<div class="join-private-channel">
		<div class="container">
			<h1>Join private Channel</h1>
			<h4>Channel Name: <input type="text" v-model="channel.channelName"></h4>
			<h4>Channel Password: <input type="password" v-model="channel.password"></h4>

			<button type="button" name="button"
				@click="JoinPrivateChannel(this.channel)">Join Channel</button>
			</div>

		<div class="container bad-channel" v-if="this.errorMSG.length > 0">
			<h4>{{ this.errorMSG }}</h4>
		</div>

	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Channel from "@/types/Channel";
import User from "@/types/User";

import ChannelDataService from '@/services/ChannelDataService';
import UserDataService from "@/services/UserDataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: "join-private-channel",
	data() {
		return {
			channel: {} as Channel,
			errorMSG: "" as string,
			joiningChannel: false as boolean,
			owner: {} as User,
		};
	},
	methods: {
		JoinPrivateChannel(channel: Channel) {

			this.joiningChannel = true;
			let data = {
				channelName: channel.channelName as string,
				password: channel.password as string,
				//isPublic: channel.isPublic as boolean,
				//owner: channel.owner.id as number
			};

			console.log("trying to Join");

			ChannelDataService.JoinPrivateChannel(channel.channelName, data)
			.then((response : ResponseData) => {
				console.log("Join");
				console.log("response: " + response.data);
				console.log("Join response: " + response.data.value);
				console.log("Message: " + response.data.message);

				this.joiningChannel = false;

				if (response.data.value === true) {
					this.$router.push({ path: '/Channel'});// params: {channel: channel, owner: this.owner} });
				}
				else {
					this.errorMSG = "Error " + response.data.message;
				}
			})
            .catch((e: Error) => {
                console.log("Error: " + e);
				this.errorMSG = "Error " + e;
            });
			this.joiningChannel = false;
		},
		async getUser(id: number) {
			await UserDataService.get(id)
			.then((response: ResponseData) => {
				this.owner = response.data;
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async init() {
			await this.getUser(Number(localStorage.getItem("user-id")));
		}
	},
	mounted() {
		this.init();
	}
});
</script>

<style media="screen">

.join-private-channel .bad-channel {
	background-color: orangered;
	width: 18em;
	height: 4em;
	display: block;
	margin: 0 auto;
}

.join-private-channel .bad-channel h4 {
	transform: translate(0, 50%);
}

</style>
