<template>
  <div v-if="user.userName" class="edit-form">
    <h4>{{ user.userName }}</h4>
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
        <p>Victories: 0</p>
        <p>Losses: 0</p>
        <p>Level: 0</p>
        <br />
      </div>
    </div>
    <div v-if="itsMe">
      <router-link to="/profile">
        <button>Got to your profile page</button>
      </router-link>
    </div>
    <div v-else>
      <div>
        <button class="friend-btn">＋ Add to Friends</button>
        <button class="block-btn">🚫 Block</button>
      </div>
      <router-link to="/chat">
        <button class="chat-btn">💬 start a private chat</button>
      </router-link>
      <router-link to="/game">
        <button class="game-btn">🎮 Start a game</button>
      </router-link>
    </div>
  </div>

  <div v-else>
    <br />
    <p>Please select an <router-link to="/users">User</router-link></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "User",
  data() {
    return {
      user: {} as User,
      itsMe: false,
    };
  },
  methods: {
    getUser(id: number) {
      UserDataService.get(id)
        .then((response: ResponseData) => {
          this.user = response.data;
          if (this.user.id === Number(localStorage.getItem("user-id")))
            this.itsMe = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getUser(Number(this.$route.params.id));
  },
});
</script>

<style scoped>
/* div {
  border: 1px solid black;
} */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-info {
  margin: 5%;
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
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.block-btn {
  background-color: #f44336;
}
.friend-btn {
  background-color: #4bbd4b;
}
</style>
