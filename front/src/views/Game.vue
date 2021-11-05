<template>
  	<div class="game">
    	<h1>W/S for player 1 || P/L for player 2</h1>
    	<br />
		   <button class="button" v-on:click="findMatch">Find a match</button>
    	<img src="../assets/pong_img.png" />
  	</div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import io from "socket.io-client";
//import GameCanvas from "../components/Game/GameCanvas.vue"
const socket = io("http://localhost:3000");

export default defineComponent({
	/*components: {
		GameCanvas,
	},*/
	data() {
		return {

		};
	},
	methods: {
		findMatch: function() {
			socket.emit('searchGame');
		}
	},
    mounted() {
		socket.on('matchFound', ()=> {
			console.log("match found");
		})
    }
   
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
