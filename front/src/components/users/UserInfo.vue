<template>
  <div v-if="user.userName" class="edit-form">
    <div class="user-status">
      <h4>{{ user.userName }}</h4>
      <div class="friend-status" v-if="isFriend">Friend</div>
      <div v-if="user.isActive" id="online-circle"></div>
      <div v-else id="offline-circle"></div>
    </div>
    <div class="container">
      <Avatar :user="user" />
      <div class="user-info">
        <p>Victories: {{ user.nbVictories }}</p>
        <p>Losses: {{ user.nbLosses }}</p>
        <p>Level: {{ user.ladderLevel }}</p>
        <br />
      </div>
    <AchievementsList :userId="user.id"/>
    </div>
  </div>

  <div v-else>
    <br />
    <p>Please select an <router-link to="/users">User</router-link></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import User from "@/types/User";
import AchievementsList from "./AchievementsList.vue";
import Avatar from "./Avatar.vue";

export default defineComponent({
  name: "User",
  components: {
    AchievementsList,
    Avatar,
  },
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
    isFriend: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.user-info {
  margin: 5%;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.user-status {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
}
img {
  width: 300px;
  height: 300px;
  object-fit: contain;
  border: 5px solid #ddd;
  border-radius: 10px;
}
h4 {
  font-size: 30px;
  margin-right: 10px;
}
.friend-status {
  background-color: #4bbd4b;
  font-weight: bold;
  color: white;
  margin-right: 0%;
  padding: 5px;
  margin-right: 5px;
}
</style>
