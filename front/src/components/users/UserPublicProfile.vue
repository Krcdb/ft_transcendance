<template>
  <div v-if="user.userName" class="edit-form">
    <div class="user-status">
      <h4>{{ user.userName }}</h4>
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
        <button v-if="isfriend && !isblocked" class="block-btn" @click="removeFromFriends">Remove from Friends</button>
        <button v-if="!isfriend && !isblocked" class="friend-btn" @click="addToFriends" >＋ Add to Friends</button>
        <button v-if="isblocked" class="block-btn" @click="removeFromBlocked">Unblock</button>
        <button v-else class="block-btn" @click="addToBlocked">🚫 Block</button>
      </div>
      <router-link to="/chat">
        <button class="chat-btn">💬 start a private chat</button>
      </router-link>
      <router-link to="/game">
        <button class="game-btn">🎮 Start a game</button>
      </router-link>
    </div>
    <p>{{ message }}</p>
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
      userConnected: {} as User,
      user: {} as User,
      itsMe: false,
      isfriend: false,
      isblocked: false,
      message: ""
    };
  },
  methods: {
    getUser() {
      UserDataService.get(Number(this.$route.params.id))
        .then((response: ResponseData) => {
          this.user = response.data;
          if (this.user.id === Number(localStorage.getItem("user-id")))
            this.itsMe = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    getConnectedUser() {
      UserDataService.get(Number(localStorage.getItem("user-id")))
        .then((response: ResponseData) => {
          this.userConnected = response.data;
          if (this.userConnected.friends.indexOf(this.user.id) !== -1)
            this.isfriend = true;
          if (this.userConnected.blockedUsers.indexOf(this.user.id) !== -1)
            this.isblocked = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    addToFriends() {
      let data = {
        id: this.user.id,
      };
      UserDataService.addToFriends(Number(localStorage.getItem("user-id")), data)
        .then((response: ResponseData) => {
          this.message = response.data.message;
          if (this.userConnected.friends.indexOf(this.user.id) !== -1)
            this.isfriend = true;
          // this.$router.go(0);
          this.$forceUpdate();
        })
        .catch((e: Error) => {
          // this.message = e;
          console.log(e);
        });
    },
    addToBlocked() {
      let data = {
        id: this.user.id,
      };
      UserDataService.addToBlocked(Number(localStorage.getItem("user-id")), data)
        .then((response: ResponseData) => {
          this.message = response.data.message;
          if (this.userConnected.blockedUsers.indexOf(this.user.id) !== -1) {
            this.isblocked = true;
            this.isfriend = false;
          }
          // this.$router.go(0);
          this.$forceUpdate();
        })
        .catch((e: Error) => {
          // this.message = e;
          console.log(e);
        });
    },
    removeFromFriends() {
      let data = {
        id: this.user.id,
      };
      UserDataService.removeFromFriends(Number(localStorage.getItem("user-id")), data)
        .then((response: ResponseData) => {
          this.message = response.data.message;
          this.isfriend = false;
          this.$router.go(0);
        })
        .catch((e: Error) => {
          // this.message = e;
          console.log(e);
        });
    },
    removeFromBlocked() {
      let data = {
        id: this.user.id,
      };
      UserDataService.removeFromBlocked(Number(localStorage.getItem("user-id")), data)
        .then((response: ResponseData) => {
          this.message = response.data.message;
          this.isblocked= false;
          this.$router.go(0);
        })
        .catch((e: Error) => {
          // this.message = e;
          console.log(e);
        });
    },
  },
  mounted() {
    this.getUser();
    if (!this.itsMe)
      this.getConnectedUser();
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
.block-btn {
  background-color: #f44336;
}
.friend-btn {
  background-color: #4bbd4b;
}
</style>
