<template>
  	<div class="play">
    	<h1>W to move UP | S to move DOWN</h1>
    	<br />
		<button class="button" v-on:click="findMatch">Find a match</button>
  	</div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import io from "socket.io-client";
import SocketServices from "../services/SocketServices"
const socket = io("http://localhost:3000", {
	auth: {
		token: localStorage.getItem('user-token'),
		userId: localStorage.getItem('user-id'),
		page: "play"
	}
});

export default defineComponent({
	data() {
    	return {
			inQueue: false as boolean,
			
    	};
	},
	methods: {
		findMatch: function() {
			console.log("start matchmaking");
			this.inQueue = true;
			socket.emit('searchGame');
		}
	},
	watch : {
		'$route': {
			handler: function() {
				if (this.inQueue)
					socket.emit("playerLeaveMatchmaking");
				socket.offAny();
			},
			deep: true,
			immediate: true,
		},
	},
    mounted() {
		SocketServices.connectGlobalSocketNotif(socket);
		socket.on('matchFound', (uuid: string) => {
			console.log("match found | uuid : ", uuid);
			this.inQueue = false;
			this.$router.push("/game/" + uuid);
		});
	},
	beforeDestroy() {
		console.log("before destroy");
		socket.offAny();
	},
});
</script>

<style scoped>
img {
  max-width: 50%;
  height: auto;
}
canvas {
  background: #2e2d2d;
  display: block;
  margin: 0 auto;
}
</style>
