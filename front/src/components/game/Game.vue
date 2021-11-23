<template>
	<div>
    	<div v-if="state === 'loading'">Loading...</div>
    	<div v-if="state === 'loaded'">
    		<h2>{{player1}}  VS  {{player2}}</h2>
			<canvas id="game-canvas"></canvas>
		</div>
    	<div v-if="state === 'finished'">
			<h1>Match done</h1>
			<div v-if="player1Score > player2Score">
				<h2>{{player1}} win !!</h2>
			</div>
			<div v-else>
				<h2>{{player2}} win !!</h2>
			</div>
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
import UserDataService from "../../services/UserDataService";

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
			player1Score: {} as number,
			player2Score: {} as number,
			game: {} as Game,
			gameOptions: {} as GameOptionsInterface,
			state: 'loading' as string,
			playerSide: "spectate" as string,
			player1: "" as string,
			player2: "" as string,
    	};
  	},
	methods: {
		async getPlayer1Name(playerId: number) {
			await UserDataService.get(playerId)
			.then((response: ResponseData) => {
				this.player1 = response.data.userName;
			});
		},

		async getPlayer2Name(playerId: number) {
			await UserDataService.get(playerId)
			.then((response: ResponseData) => {
				this.player2 = response.data.userName;
			});
		},

		async loadData() {
			this.uuid = Number(this.$route.params.id);
			console.log(`game uuid : ${this.uuid}`);
			await MatchDataService.get(this.uuid)
			.then((response: ResponseData) => {
				this.match = response.data;
				if (!this.match) {
					console.log("ERROR: match not found !");
					this.$router.push("/Play");
				}
				if (this.match.playerOne === Number(localStorage.getItem('user-id')))
					this.playerSide = 'left';
				else if (this.match.playerTwo === Number(localStorage.getItem('user-id')))
					this.playerSide = 'right';
				this.getPlayer1Name(this.match.playerOne);
				this.getPlayer2Name(this.match.playerTwo);
				this.state = 'loaded';
				this.player1Score = this.match.scorePlayerOne;
				this.player2Score = this.match.scorePlayerTwo;
				if (this.player1Score >= 5 || this.player2Score >= 5)
					this.state = "finished";
				socket.on(`startGame${this.uuid}`, (payload) => {
					this.gameOptions = payload;
					console.log(`game started !!!`);
					this.game = new Game(socket, this.gameOptions, this.uuid, this.playerSide, String(localStorage.getItem('user-id')));
				});
				socket.on("updateGame", (payload) => {
					if (this.game) {
						this.player1Score = payload.player1.score;
						this.player2Score = payload.player2.score;
						if (this.player1Score >= 5 || this.player2Score >= 5)
							this.state = "finished";
						if (this.state !== "finished")
							this.game.updateGame(payload);
					}
				});
				socket.emit("playerReady", this.uuid);
				console.log(`match loaded | uuid : ${this.match.matchId}\nplayer side : ${this.playerSide}`);
			});
		},
	},
    mounted() {
		this.loadData();
	},
	destroy() {
		socket.offAny();
	}
});
</script>
