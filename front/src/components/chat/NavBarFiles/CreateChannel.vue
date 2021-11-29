<template>
	<div class="create-channel-wrapper">
		<div class="create-channel">
			<h2>Create a new Channel</h2>
			<label for="chanel-name" >Channel Name
			<input 
				type="text"
				required
				id="channel-name"
				v-model="this.channel.channelName"
			></label>
			<label for="password">Password
			<input 
				type="password"
				id="password"
				v-model="this.channel.password"
			></label>
			<label for="public-channel">Public Channel
			<input
				id="public-channel"
				type="checkbox"
				v-model="this.channel.isPublic"
			></label>
			<button class="create-button" type="button" name="button"
				@click="CreateChannel">
				Create
			</button>
		</div>
	</div>
	<div class="messages">
		<!-- <div class="" v-if="isLoading">
			<div class="spinner-border" role="status">
				<span class="sr-only"></span>
			</div>
		</div> -->
		<div class="error-message"
		v-if="this.state == 1">
			<p>{{ error }}</p>
		</div>
		<div class="success-message"
			v-if="this.state == 2">
			<p>Channel sucessfully created</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Vue from 'vue';
import http from '@/http-common';

import ChannelDataService from '@/services/ChannelDataService';
import ResponseData from "@/types/ResponseData";

import CreateChannel from "@/types/CreateChannel";
import User from "@/types/User";

export default defineComponent({
	data() {
		return {
			channel: {} as CreateChannel,
			error: {} as string,
			state: 0,
			isLoading: false,
		}
	},
    props: {
        owner: {
            type: Object as () => User,
            required: true,
        },
    },
	methods: {
		async delay(ms: number) {
			return new Promise( resolve => setTimeout(resolve, ms) );
		},
		async CreateChannel() {
			if (this.channel.channelName !== undefined) {
				this.isLoading = true;
				this.state = 0;

				let data = {
					channelName: this.channel.channelName as string,
					password: this.channel.password as string,
					isPublic: this.channel.isPublic as boolean,
					owner: this.owner.id as number,
				};

				console.log("CreateChannel: " + this.channel.channelName);
				console.log("public: " + this.channel.isPublic);
				console.log("password: " + this.channel.password);
				console.log("owner: " + this.owner.userName);

				ChannelDataService.createChannel(data)
				.then((response: ResponseData) => {
					console.log("create Channel");
					this.state = 2;
					this.isLoading = false;
				})
				.catch((e) => {
					this.state = 1;
					this.error =  e.response.data.message;
					this.isLoading = false;
				});
				this.isLoading = false;
			} else {
				this.state = 1;
				this.error = "Please enter a channel name";
			}
			}
	},
	mounted() {
		this.channel.isPublic = false;
	},
});
</script>

<style  scoped>
.create-channel {
	display: flex;
	flex-direction: column;
    align-items: center;
	gap: 10px;
}
label {
	font-weight: bold;
}
.messages {
	font-size: 20px;
}
.success-message {
	color: green;
}
.error-message {
	color: red;
}
.create-button {
	background-color: #4bbd4b;
}
</style>