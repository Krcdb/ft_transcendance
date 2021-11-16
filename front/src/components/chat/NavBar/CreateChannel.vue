<template>
	<div class="container-fluid">
		<hr>
		<div class="text-center">
			<div class="justify-content-center">
				<h4>Create new Channel</h4>

				<p>Channel Name:  <input type="text"
					v-model="this.channel.channelName"></p>
					<p>Password: <input type="text"
						v-model="this.channel.password"></p>
						<p>Public Channel: <input type="checkbox"
							v-model="this.channel.isPublic"></p>

							<button class="btn btn-secondary" type="button" name="button"
							@click="CreateChannel">
							Create</button>
						</div>
					</div>

					<hr>

					<div class="container-fluid">

						<div class="d-flex justify-content-center" v-if="isLoading">
							<div class="spinner-border" role="status">
								<span class="sr-only"></span>
							</div>
						</div>

						<div class="alert alert-danger" role="alert"
						v-if="this.state == 1">
						<h6>Le salon existe déjà</h6>
					</div>
					<div class="alert alert-success" role="alert"
					v-if="this.state == 2">
					<h6>Le salon à bien été créé</h6>
				</div>

			</div>
		</div>
	</template>

<script lang="ts">
import { defineComponent } from "vue";
import Vue from 'vue';
import http from '@/http-common';

import ChannelDataService from '@/services/ChannelDataService';
import ResponseData from "@/types/ResponseData";

import Channel from "@/types/Channel";
import User from "@/types/User";

export default defineComponent({
	data() {
		return {
			channel: {} as Channel,
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

			this.isLoading = true;
			this.state = 0;

			let data = {
				channelName: this.channel.channelName as string,
				password: this.channel.password as string,
				isPublic: this.channel.isPublic as boolean,
				owner: this.owner.id as number
			};

			console.log("CreateChannel: " + this.channel.channelName);
			console.log("public: " + this.channel.isPublic);
			console.log("password: " + this.channel.password);
			console.log("owner: " + this.owner.userName);

			await this.delay(1000);

			ChannelDataService.createChannel(data)
			.then((response: ResponseData) => {
				console.log("create Channel");
				this.state = 2;
				this.isLoading = false;
			})
            .catch((e: Error) => {
				this.state = 1;
                console.log("Error: " + e);
				this.isLoading = false;
            });
			this.isLoading = false;
		}
	},
});
</script>

<style>
/*
.create-channel {
	max-width: 80%;
	min-width: 50%;
	display: block;
	margin: 0 auto;
    animation: fadeIn 0.5s;
}

@keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
}
.create-channel .create-channel-box {
	display: flex;
	flex-direction: column;
	width: auto;
	margin: 0 auto;
}
.create-channel .create-channel-inputs {
	text-align: left;
	width: 100%;
	margin: 0 auto;
}
.create-channel .error-channel {
	width: 512px;
	margin: 0 auto;
	display: block;
	background-color: orangered;
}
.create-channel .error-channel h3 {
	padding: 15px;
	color: white;
}

.create-channel .success-channel {
	width: 512px;
	margin: 0 auto;
	display: block;
	background-color: lightgreen;
}
.create-channel .success-channel h3 {
	padding: 15px;
	color: white;
}
*/
</style>
