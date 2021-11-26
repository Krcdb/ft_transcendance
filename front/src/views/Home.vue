<template>
  <div class="home">
    <h1>This is the Home page</h1>
    <br />
    <img alt="Pong logo" src="../assets/pong_logo.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import io from "socket.io-client";
import SocketServices from "../services/SocketServices"
const socket = io("http://localhost:3000", {
	auth: {
		token: localStorage.getItem('user-token'),
		userId: localStorage.getItem('user-id'),
		page: "home"
	}
});


export default defineComponent({
	watch : {
		'$route': {
			handler: function() {
				socket.offAny();
			},
			deep: true,
			immediate: true,
		},
	},
  mounted() {
		SocketServices.connectGlobalSocketNotif(socket);
	},
});
</script>

<style scoped>
img {
  max-width: 50%;
  height: auto;
}
</style>
