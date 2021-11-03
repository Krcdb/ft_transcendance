<template>
	<div class="menu-chat">
		<div class="create">
			<h3>Créer un salon textuel</h3>

			<p>
				Nom du salon:
				<input placeholder="Default"
				v-model="this.newChannel.channelName">
				mot de passe :
				<input type="password" v-model="this.newChannel.password">

				<button type="button" name="button"
				@click="createChannel">
				Créer</button>
			</p>

			<div class="debug">

				debug: <br>
				channelName: {{ this.newChannel.channelName }} <br>
				channelPassword: {{ this.newChannel.password }} <br>
				Owner: {{ this.owner }} <br>
			</div>
		</div>
		<hr>

		<div class="list" v-if="this.channelList > 0">
			<!--
			<h3>Liste des salons crées</h3>

			<div class="list-salons"
			:class="{ active, index == currentIndex} "
			v-for="(channel, index) in channelList"
			:key="index"
			>
			{{ channel.channelName }}
			</div>
		-->
		</div>


		<!--
		<ErrorChat
		:error_message="'olala'"
		:description="'cpascool'"
		:button_left="'Confirmer'"
		:button_right="'retour'"
		/>
		-->

	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ChannelDataService from "@/services/ChannelDataService";
import ResponseData from "@/types/ResponseData";

import User from "@/types/User";
import Channel from "@/types/Channel";

//import ErrorChat from "./Error.vue";

export default defineComponent({
	name: "menu-chat",
	data() {
		return {
			newChannel: {} as Channel,
			channelList: [] as Channel[],
			currentIndex: -1,
		};
	},
	//components: {
	//	ErrorChat,
	//},
	props: {
		owner: {
			type: Object as () => User,
			required: true,
		},
	},
	methods: {
		createChannel() {
			this.newChannel.owner = this.owner;
			console.log("Try to create Channel !");
			ChannelDataService.createChannel(this.newChannel)
			.then((response: ResponseData) => {
				console.log("Response LOG: " + response.data);
			})
			.catch((e: Error) => {
				console.log("CreateChannel Error: " + e);
			});
		},
		getAllChannel() {
			ChannelDataService.getAllChannels()
			.then((response: ResponseData) => {
				console.log("Channel List: " + response.data);
				this.channelList = response.data;
			})
			.catch((e: Error) => {
				console.log("Get AllChannel Error: " + e);
			})
		}
	},
	mounted() {
		this.getAllChannel();
	},
});
</script>

<style media="screen">

.menu-chat {
	margin: 0 auto;
	padding: 0 auto;
	text-align: left;
	display: inline-block;
	width: auto;
	height: auto;
	position: relative;
}

.menu-chat hr {
	margin-top: 25px;
	margin-bottom: 25px;
}

</style>
