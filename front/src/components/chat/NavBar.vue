<template>
	<div class="chat-nav-bar">
		<ul class="list">
			<li class="list-item" >
				<router-link class="element" :to="'/chat/createchannel'">
					<h4>Créer un salon</h4>
				</router-link>
			</li>
			<li class="list-item" >
				<router-link class="element" :to="'/chat/joinchannel'">
					<h4>Rejoindre un salon</h4>
				</router-link>
			</li>
			<li class="list-item" >
				<router-link class="element" :to="'/chat/listusers'">
					<h4>Liste des joueurs connectés</h4>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
export default defineComponent({
	name: "char-nav-bar",
});

</script>

<style media="screen">
@import url("https://fonts.googleapis.com/css?family=Varela+Round");
.chat-nav-bar {
	box-sizing: border-box;
	font-family: "Varela Round", sans-serif;
	background-color: rgba(20, 20, 20, 255);
	width: 100%;
	max-width: 75%;
	height: 6em;
	display: block;
	margin: 0 auto;
}
.chat-nav-bar .list {
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 720px;
	margin: 0 auto;
	list-style: none;
}

.chat-nav-bar .list .list-item {
	width: 250px;
	height: 100%;
	transition: background-position-x 0.9s linear;
	text-align: center;
}

.chat-nav-bar .element, h4 {
	font-size: 22px;
	color: #777;
	text-decoration: none;
	transition: all 0.45s;
	color: white;
	text-transform: uppercase;
	font-size: 18px;
	transition: 0.25s;
}

.chat-nav-bar .element h4:hover {
	color: #d94f5c;
	transition: 0.25s;
}

chat-nav-bar,
chat-nav-bar:before,
chat-nav-bar:after {
	box-sizing: inherit;
	padding: 0;
	margin: 0;
	letter-spacing: 1.1px;
}

</style>
