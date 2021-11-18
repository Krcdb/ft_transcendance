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
const socket = io("http://localhost:3000", {
	auth: {
		token: localStorage.getItem('user-token'),
		userId: localStorage.getItem('user-id'),
		page: "play"
	}
});

export default defineComponent({
	methods: {
		findMatch: function() {
			console.log("start matchmaking");
			socket.emit('searchGame');
		}
	},
    mounted() {
		socket.on('matchFound', (uuid: string) => {
			console.log("match found | uuid : ", uuid);
			this.$router.push("/game/" + uuid);
		})
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
