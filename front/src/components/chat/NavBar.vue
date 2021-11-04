<template>
	<div class="chat-nav-bar">
		<ul class="list">
			<li class="list-item" >
				<button class="element" type="btn btn-success" name="button"
				@click="changeNavSelection(0)"
				>
					<h4>Créer un salon</h4>
				</button>
			</li>
			<li class="list-item" >
				<button class="element" type="btn btn-success" name="button"
				@click="changeNavSelection(1)">
					<h4>Rejoindre un salon</h4>
				</button>
			</li>
			<li class="list-item" >
				<button class="element" type="btn btn-success" name="button"
				@click="changeNavSelection(2)">
					<h4>Liste des joueurs connectés</h4>
				</button>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
export default defineComponent({
	name: "char-nav-bar",
	methods: {
		changeNavSelection(value: number) {
			this.$emit("switchNavBarSelection", value);
			console.log("change selection emit: " + value);
		}
	}
});

</script>

<style media="screen">
@import url("https://fonts.googleapis.com/css?family=Varela+Round");
.chat-nav-bar {
	box-sizing: border-box;
	font-family: "Varela Round", sans-serif;
	max-width: 75%;
	display: block;
	margin: 0 auto;
}
.chat-nav-bar .list {
	display: flex;
	flex-grow: row;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	list-style: none;
}

.chat-nav-bar .list .list-item {
	width: 100%;
	height: 100%;
	text-align: center;
	margin: 0 auto;
	padding: 0 auto;
}

.chat-nav-bar .element, {
	background-color: rgba(20, 20, 20, 255);
}

.chat-nav-bar .element, button {
	text-decoration: none;
	color: white;
	text-transform: uppercase;
	font-size: 18px;
	transition: 0.25s;
	width: 500px;
}
.chat-nav-bar .element h4:hover {
	color: #d94f5c;
	transition: 0.25s;
}

</style>
