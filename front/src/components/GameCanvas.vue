<template>
    <canvas id="myCanvas" width="700" height="400"></canvas>
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
			position: {
        		x: 0,
        		y: 0,
        	}
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