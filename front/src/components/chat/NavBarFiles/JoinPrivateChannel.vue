<template>
	<div class="join-private-channels">
		<h2>Join private Channel</h2>
		<label for="chanel-name" >Channel Name
		<input 
			type="text"
			required
			id="channel-name"
			v-model="channel.channelName"
		></label>
		<label for="password">Password
		<input 
			type="password"
			id="password"
			v-model="channel.password"
			autocomplete="on"
		></label>
		<button type="button" class="join-btn"
			@click="JoinPrivateChannel()">Join Channel</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Channel from "@/types/Channel";
import User from "@/types/User";

import ChannelDataService from '@/services/ChannelDataService';
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: "join-private-channel",
	data() {
		return {
			channel: {} as Channel,
		};
	},
	methods: {
		JoinPrivateChannel() {
			let data = {
				password: this.channel.password,
			};
			console.log("data = ", data);
			ChannelDataService.JoinPrivateChannel(this.channel.channelName, data)
			.then((response : ResponseData) => {
				console.log("Can join channel !");
				localStorage.setItem("channel-name", this.channel.channelName);
				this.$router.push("/Channel/" + this.channel.channelName);
			})
            .catch((e) => {
                console.log("Error: " + e.response.data.message);
            });
		},
	}
});
</script>

<style scoped>
.join-private-channels {
	display: flex;
	flex-direction: column;
    align-items: center;
	gap: 10px;
}
</style>
