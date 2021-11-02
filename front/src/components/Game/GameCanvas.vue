<template>
  <canvas id="game-canvas" width="700" height="400"></canvas>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Game } from "./classes/Game";

export default defineComponent({
  name: "game-canvas",
  data() {
    return {};
  },
  methods: {
    launchLoop: function () {
      var game = new Game();
      requestAnimationFrame(game.gameLoop.bind(game));
    },
  },
  mounted() {
    this.launchLoop();
  },
});
</script>
