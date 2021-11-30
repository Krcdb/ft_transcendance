<template>
	<div class="chat-navbar">
		<ul>
			<li>
				<button
					:class='currentButtonIsActive(0) ? "btn-select" : "btn-primary"'
						@click="changeNavSelection(0)">Join a public channel</button>
			</li>
			<li>
				<button
					:class='currentButtonIsActive(1) ? "btn-select" : "btn-primary"'
						@click="changeNavSelection(1)">List of Channels</button>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
export default defineComponent({
	name: "char-nav-bar",
	data() {
		return ({
			nav: 0 as number,
		});
	},
	methods: {
		changeNavSelection(value: number) {
			this.nav = value;
			this.$emit("switchNavBarSelection", value);
		},
		currentButtonIsActive(value: number) {
			return (this.nav === value);
		},
	},
	mounted() {
		this.changeNavSelection(this.nav);
	}
});

</script>

<style scoped>
.chat-navbar ul {
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-primary {
	font-weight: bold;
	border-radius: 5px;
	background-color: white;
	color: black;
	border: solid 2px black;
}
.btn-select {
	font-weight: bold;
	border-radius: 5px;
	background-color: black;
	color: white;
	border: solid 2px black;

}
.btn-primary:hover {
	background-color: rgb(206, 206, 206);
}
</style>
