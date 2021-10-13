<template>
  	<div class="game">
    	<h1>This will be the Game page</h1>
    	<br />
		    <game-canvas/>
    	<img src="../assets/pong_img.png" />
  	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameCanvas from "../components/Game/GameCanvas.vue"

export default defineComponent({
  components: {
    GameCanvas,
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
