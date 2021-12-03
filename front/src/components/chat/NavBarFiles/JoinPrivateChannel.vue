<template>
	<div class="join-private-channels">
		<h4>Join private Channel</h4>
		<form>
			<div class="form-div">
				<label for="chanel-name" >Channel Name
				<input 
					type="text"
					required
					minlength="1"
					maxlength="10"
					id="channel-name"
					v-model="joinChannel.channelName"
				></label>
			</div>
			<div class="form-div">
				<label for="password">Password
				<input 
					type="password"
					id="password"
					v-model="password"
					autocomplete="off"
				></label>
			</div>
			<div class="form-div">
				<button type="button" class="join-btn"
					@click="JoinPrivateChannel(password)">Join Channel
				</button>
			</div>
		</form>
	</div>
	<div class="error-message" v-if="error">
			<p>{{ error }}</p>
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
			joinChannel: {} as Channel,
			channel: {} as Channel,
			error: "" as string,
			password: "" as string,
		};
	},
	props: {
		userId: {
			type: Number,
			required: true,
		},
	},
	methods: {
		async getChannel(name: string) {
			console.log("getChannels private ");
			await ChannelDataService.getChannel(name)
			.then((response: ResponseData) => {
				this.channel = response.data;
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async JoinPrivateChannel(current_password: string) {
			let data = {
				password: current_password,
			};
			// console.log("data = ", data);
			// console.log(this.joinChannel.channelName);
			await ChannelDataService.canJoinChannel(this.joinChannel.channelName, data)
			.then((response : ResponseData) => {
				console.log("Password Match ? for " + current_password + " -> " + response.data.value);
				// console.log(response);
				if (response.data.value == true) {
                    console.log(response.data.message);
					localStorage.setItem("channel-name", this.joinChannel.channelName);
					this.$router.push("/Channel/" + this.joinChannel.channelName);
				}
				else {
					this.error = response.data.message;
				}
			})
      		.catch((e) => {
				this.error =  e.response.data.message;
          		console.log("Error: " + e.response.data.message);
      		});
		},
	}
});
</script>

<style scoped>
h4 {
    margin: 0;
}
.form-div {
	margin: 10px;
}
.join-private-channels {
	display: flex;
	flex-direction: column;
    align-items: center;
	gap: 10px;
}
.error-message {
	color: red;
}
</style>
