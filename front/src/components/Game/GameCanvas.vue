<template>
    <canvas id="game-canvas" width="700" height="400"></canvas>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue'

export default defineComponent({
	name: "game-canvas",
	data() {
      	return {
        	socket: {} as any,
			ctx: {} as any,
			vueCanvas: {} as any,
      	};
    },
    mounted() {
		var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
		this.ctx = canvas!.getContext("2d")!;
		this.vueCanvas = this.ctx;
    },
    //methods: { }
})
</script>