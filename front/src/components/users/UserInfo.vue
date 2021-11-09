<template>
  <div v-if="user.userName" class="edit-form">
    <div class="user-status">
      <h4>{{ user.userName }}</h4>
      <div class="friend-status" v-if="isFriend">Friend</div>
      <div v-if="user.isActive" id="online-circle"></div>
      <div v-else id="offline-circle"></div>
    </div>
    <div class="container">
      <img
        v-if="user.avatar"
        :src="`http://localhost:3000/users/${user.id}/avatar`"
      />
      <img
        v-else
        :src="`https://avatars.dicebear.com/api/avataaars/${user.id}.svg`"
      />
      <div class="user-info">
        <p>Victories: {{ user.nbVictories }}</p>
        <p>Losses: {{ user.nbLosses }}</p>
        <p>Level: {{ user.ladderLevel }}</p>
        <br />
      </div>
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

export default defineComponent({
  name: "User",
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
  align-items: center;
  justify-content: center;
}
.user-info {
  margin: 5%;
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
  margin-right: 5px;
}
</style>
