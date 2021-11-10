<template>
  <div class="achievements-wrapper">
    <h3>Achievements</h3>
    <div v-if="achievements.length">
      <ul class="achievements-list">
        <li class="achievements-item" v-for="achievements in achievements" :key="achievements.id">
          <!-- <img src="@/assets/user_icon.png"> -->
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Achievements from "@/types/Achievements";
import UserDataService from "@/services/UserDataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "users-achievements",
props: {
    userId: {
      type: Number,
      required: true,
    },
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
});
</script>

<style scopped>
.achievements-wrapper {
  /* border: 2px solid #ddd;
  border-radius: 10px; */
}
.achievements-wrapper h3{
  font-size: 20px;
}
.achievements-list {
  list-style: none;
  padding: 0px;
  max-height: 300px;
  overflow-y: auto;
}
.achievements-item {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
}
.achievements-item img {
    width: 32px;
    height: 32px;
    margin-right: 10px ;
}
.achievements-info {
  text-align: initial;
}
.achievements-info p {
  margin: 0;
  font-size: 14px;
}
.achievements-info h4 {
  margin: 0;
}
</style>
