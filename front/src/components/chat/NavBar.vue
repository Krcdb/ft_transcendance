<template>
	<div class="chat-nav-bar">
		<div class="container">

			<ul class="list">
				<li class="list-item" >
					<div class="col">

						<button class="btn btn-primary element" type="btn btn-success" name="button"
						@click="changeNavSelection(0)"
						>
						<h4>Créer un salon</h4>
					</button>

				</div>
			</li>

			<li class="list-item" >
				<div class="col">

					<button class="btn btn-primary element" type="btn btn-success" name="button"
					@click="changeNavSelection(1)">
					<h4>Rejoindre un salon</h4>
				</button>

			</div>
		</li>

		<li class="list-item" >
			<div class="col">

				<button class="btn btn-primary element" type="btn btn-success" name="button"
				@click="changeNavSelection(2)">
				<h4>Rejoindre un salon privé</h4>
			</button>

		</div>
	</li>

		<li class="list-item" >
			<div class="col">

				<button class="btn btn-primary element" type="btn btn-success" name="button"
				@click="changeNavSelection(3)">
				<h4>Liste des joueurs connectés</h4>
			</button>

		</div>
	</li>
</ul>
</div>
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
	font-family: "Varela Round", sans-serif;

	max-width: 100%;
	width: 100%;

	display: inline-block;
	position: relative;
	background-color: rgba(20, 20, 20, 255);
}
.chat-nav-bar .list {
	display: flex;
	flex-grow: row;

	justify-content: center;
	align-items: center;

	margin: 0 auto;
	list-style: none;

	float: left;
	text-align: center;
	width: 100%;
}

.chat-nav-bar .element {
	text-decoration: none;
	color: white;
	text-transform: uppercase;
	font-size: 16px;
	transition: 0.25s;
	width: 20em;
	height: 100%;
	background-color: rgba(20, 20, 20, 255);
	top: 50%;
	left: 50%;
}
.chat-nav-bar .element h4:hover {
	color: #d94f5c;
	transition: 0.25s;
}
.chat-nav-bar .element:hover {
	background-color: rgba(40, 40, 40, 255);
	transition: 0.25s;
}

</style>
