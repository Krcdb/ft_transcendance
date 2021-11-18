<template>
	<div>
    	<div v-if="state === 'loading'">Loading...</div>
    	<div v-if="state === 'loaded'">
    		<div>{{player1}}  VS  {{player2}}</div>
			<canvas id="game-canvas"></canvas>
		</div>
  	</div>
  
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import { Game } from "./classes/Game";
import { GameDataUpdate, GameOptionsInterface } from "@/types/Game"
import Match from "@/types/Match"
import MatchDataService from "@/services/MatchServices"
import http from "@/http-common";
import io from "socket.io-client";
import ResponseData from "../../types/ResponseData";

const socket = io("http://localhost:3000", {
	auth: {
		token: localStorage.getItem('user-token'),
		userId: localStorage.getItem('user-id'),
		page: "game",
	}
});

export default defineComponent({
	name: "game",
	data() {
    	return {
			uuid: {} as number,
			match: {} as Match,
			game: {} as Game,
			gameOptions: {} as GameOptionsInterface,
			state: 'loading' as string,
			playerSide: "spectate" as string,
			player1: "" as string,
			player2: "" as string,
    	};
  	},
	methods: {
		async loadData() {
			this.uuid = Number(this.$route.params.id);
			console.log(`game uuid : ${this.uuid}`);
			await MatchDataService.get(this.uuid)
			.then((response: ResponseData) => {
				this.match = response.data;
				if (this.match.playerOne === Number(localStorage.getItem('user-id')))
					this.playerSide = 'left';
				else if (this.match.playerTwo === Number(localStorage.getItem('user-id')))
					this.playerSide = 'right';
				this.player1 = String(this.match.playerOne);
				this.player2 = String(this.match.playerTwo);
				this.state = 'loaded';
				socket.on(`startGame${this.uuid}`, (payload) => {
					this.gameOptions = payload;
					console.log(`game started !!!`);
					this.game = new Game(socket, this.gameOptions, this.uuid, this.playerSide, String(localStorage.getItem('user-id')));
				});
				socket.on("updateGame", (payload) => {
					if (this.game)
						this.game.updateGame(payload);
				});
				socket.emit("playerReady", this.uuid);
				console.log(`match loaded | uuid : ${this.match.matchId}\nplayer side : ${this.playerSide}`);
			});
		},
	},
    mounted() {
		this.loadData();
	},
});
</script>
