<template id="">
	<div class="container create-channel">
		<hr>
		<div class="create-channel-box">

			<h1>Créer un Salon</h1>

			<div class="create-channel-inputs">

				<h4>Nom du salon: <input type="text"
					v-model="this.channel.channelName"></h4>
				<h4>Mot de passe (laissez vide si aucun): <input type="text"
					v-model="this.channel.password"></h4>
				<h4>Salon publique: <input type="checkbox"
					v-model="this.channel.isPublic"></h4>
			</div>

			<button class="btn btn-success" type="button" name="button"
			@click="CreateChannel">
			Créer</button>
		</div>

		<div class="error-channel"
			v-if="this.state == 1">
			<h3>Le salon existe déjà</h3>
		</div>
		<div class="success-channel"
			v-if="this.state == 2">
			<h3>Le salon à bien été créé</h3>
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
		}
	},
    props: {
        owner: {
            type: Object as () => User,
            required: true,
        },
    },
	methods: {
		CreateChannel() {

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


			ChannelDataService.createChannel(data)
			.then((response: ResponseData) => {
				console.log("create Channel");
				this.state = 2;
			})
            .catch((e: Error) => {
				this.state = 1;
                console.log("Error: " + e);
            });
		}
	},
});
</script>

<style media="screen">
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

</style>
