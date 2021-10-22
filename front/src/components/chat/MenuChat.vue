<template>
	<div class="menu-chat">
		<div class="create">
			<h3>Créer un salon textuel</h3>

			<p>
				Nom du salon:
				<input type="text" name="channel_name" value="Default">
				mot de passe :
				<input type="password" name="channel_password" value="">

				<button type="button" name="button"
				@click="createChannel">
				Créer</button>
			</p>
		</div>
		<hr>
		<div class="list">
			<h3>Liste des salons crées</h3>

			<div class="list-salons">

			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ChannelDataService from '@/services/ChannelDataService';
import ResponseData from "@/types/ResponseData";

//import User from "@/types/User";
import Channel from "@/types/Channel";

export default defineComponent({
	name: "menu-chat",
	data() {
		return {
			newChannel: {} as Channel,
		};
	},
	methods: {
		createChannel() {
			console.log("Try to create Channel !");
			ChannelDataService.createChannel(this.newChannel)
			.then((response: ResponseData) => {
				console.log("Response LOG: " + response.data);
			})
			.catch((e: Error) => {
				console.log("CreateChannel Error: " + e);
			});
		},
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
