<template>

	<div class="container-fluid">
		<div class="">
			<ul class="list-group list-group-horizontal justify-content-center">
				<li class="list-group-item">
					<button class="btn btn-primary"
						:class='currentButtonIsActive(0) ? "btn-success" : "btn-primary"'
							@click="changeNavSelection(0)">Create a channel</button>
				</li>
				<li class="list-group-item">
					<button class="btn btn-primary"
						:class='currentButtonIsActive(1) ? "btn-success" : "btn-primary"'
							@click="changeNavSelection(1)">Join a channel</button>
				</li>
				<li class="list-group-item">
					<button class="btn btn-primary"
						:class='currentButtonIsActive(2) ? "btn-success" : "btn-primary"'
							@click="changeNavSelection(2)">Join a private channel</button>
				</li>
				<li class="list-group-item">
					<button class="btn btn-primary"
						:class='currentButtonIsActive(3) ? "btn-success" : "btn-primary"'
							@click="changeNavSelection(3)">List of friends connected</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
export default defineComponent({
	name: "char-nav-bar",
	data() {
		return ({
			nav: -1 as number,
		});
	},
	methods: {
		changeNavSelection(value: number) {
			this.nav = value;
			this.$emit("switchNavBarSelection", value);
			console.log("change selection emit: " + value);
		},
		currentButtonIsActive(value: number) {
			return (this.nav === value);
		},
	}
});

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Varela+Round");

/*
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
*/

</style>
