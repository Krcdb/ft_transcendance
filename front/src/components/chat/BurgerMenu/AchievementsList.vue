<template id="burger-achievement-list">
	<div
	:class="this.displayAchievements == 1 ?
	'achievements' + (this.parentOpened == 1 ? ' opened' : '') :
	'achievements hidden' + (this.parentOpened == 1 ? ' opened' : '') "
	>
		<div class="achievements-box">

			<h3>Achievements</h3>
			<hr>
			<div v-if="achievements.length">
				<ul class="achievements-list">
					<li
					v-for="achievements in achievements"
					:key="achievements.id"
					:class="`achievements-item-${achievements.class}`"
					>
					<div :class="`achievement-img-${achievements.class}`">
						<img
						:src="`http://localhost:3000/users/achievements/${achievements.class}`"
						/>
					</div>
					<div class="achievements-info">
						<h4>{{ achievements.name }}</h4>
						<p>{{ achievements.description }}</p>
					</div>
				</li>
			</ul>
		</div>
		<div v-else>
			<p>No achievements :(</p>
		</div>
		<hr>
	</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Achievements from "@/types/Achievements";
import UserDataService from "@/services/UserDataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
	name: "achievement-list",
	props: {
		userId: {
			type: Number,
			required: true,
		},
		displayAchievements: {
			type: Number,
			required: true,
		},
		parentOpened: {
			type: Boolean,
			required: true,
		}
	},
	data() {
		return {
			achievements: [] as Achievements[],
		};
	},
	methods: {
		getAchievements(id: number) {
			UserDataService.getAchievements(id)
			.then((response: ResponseData) => {
				this.achievements = response.data;
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
	},
	mounted() {
		this.getAchievements(this.userId);
	},
})

</script>

<style media="screen">

.achievements {
    transition: all 0.25s ease;

	display: flex;
	position: fixed;
	background: #11101D;
	left: 106px;
	margin-top: 200px;
	z-index: 1;
	width: 256px;
	height: calc(100% - 48%);
	opacity: 1;
	text-align: center;
	scroll-behavior: smooth;
	border-left: 2px solid white;
}

.hidden {
	left: 0px;
	opacity: 0;
    transition: all 0.25s ease;
}

.opened {
    transition: all 0.25s ease;
	margin-left: 172px;
}

.achievements h3, p {
	display: block;
	display: relative;
	color: white;
	font-size: 18px;
	text-align: center;
}

.achievements-box {
	padding: 15px;
	color: white;
	height: 80%;
}
.achievements-list {
  list-style: none;
  padding: 0px;
  max-height: 300px;
  overflow-y: auto;
}
[class|="achievements-item"] {
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  margin: 3px;
}
[class|="achievement-img"] {
  width: 20%;
  max-width: 50px;
  padding: 15px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
[class|="achievement-img"] img {
  width: 40px;
  height: 40px;
}

.achievement-img-user {
  background-color: #e6c7ff;
}

.achievement-img-relation {
  background-color: #b3f4ff;
}
.achievement-img-game {
  background-color: #faffb3;
}
.achievement-img-chat {
  background-color: #bdffb3;
}

.achievements-info {
  text-align: initial;
  width: 100%;
  margin-left: 10px;
}
.achievements-info p {
  margin: 0.1em;
  font-size: 0.8em;
  color: #999;
}
.achievements-info h4 {
  margin: 0;
  font-size: 1.2em;
}

</style>
