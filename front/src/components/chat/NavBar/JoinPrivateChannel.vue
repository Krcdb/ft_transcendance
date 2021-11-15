<template>
	<div class="container-fluid">
		<hr>
		<h4>Join private Channel</h4>
		<br>
		<p>Channel Name:  <input type="text" v-model="channel.channelName"></p>
		<p>Channel Password:  <input type="password" v-model="channel.password"></p>

		<button type="button" class="btn btn-secondary"
		@click="JoinPrivateChannel(this.channel)">Join Channel</button>
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
		JoinPrivateChannel(channel: Channel) {
			console.log("trying to Join");

			ChannelDataService.JoinPrivateChannel(channel.channelName, channel.password)
			.then((response: ResponseData) => {
				console.log("Join");
				console.log("response: " + response.data);

			})
            .catch((e: Error) => {
                console.log("Error: " + e);
            });
		},
	}
});
</script>

<style media="screen">

</style>
