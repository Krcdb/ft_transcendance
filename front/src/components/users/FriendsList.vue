<template>
  <div class="friends-list-div">
    <h3>Friends</h3>
    <div v-if="users.length" class="friend-wrapper">
      <input
        type="text"
        placeholder="Search an user..."
        v-model="keyword"
        @input="searchhandler"
        @change="searchhandler"
      />
      <ul class="friend">
        <li class="friend-item" v-for="user in filteredUsers" :key="user.id">
          <div class="friend-img">
            <img
              v-if="user.avatar"
              :src="`http://localhost:3000/users/${user.id}/avatar`"
            />
            <img
              v-else
              :src="`https://avatars.dicebear.com/api/avataaars/${user.id}.svg`"
            />
          </div>
          <div class="friend-item-content">
            <router-link class="profile-link" :to="'/users/' + user.id">
              <p>{{ user.userName }}</p>
            </router-link>
          </div>
          <div class="user-status">
            <div v-if="user.isActive" id="online-circle"></div>
            <div v-else id="offline-circle"></div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>You currently have no friends :(</p>
    </div>
    <div>
      <router-link to="/users">
        <button class="users-link">Find New Friends</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "users-friend",
  data() {
    return {
      users: [] as User[],
      filteredUsers: [] as User[],
      keyword: "",
    };
  },
  methods: {
    retrieveusers() {
      UserDataService.getFriends(Number(localStorage.getItem("user-id")))
        .then((response: ResponseData) => {
          this.users = response.data;
          this.users.sort((a, b) => (a.userName > b.userName ? 1 : -1));
          this.filteredUsers = this.users;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    searchhandler() {
      this.filteredUsers = this.users.filter((user) =>
        user.userName.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
  },
  mounted() {
    this.retrieveusers();
  },
});
</script>

<style scopped>
.friend-img img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.friend-wrapper h3 {
  font-size: 20px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.profile-link {
  color: black;
  text-decoration: none;
  font-size: 18px;
  align-content: center;
}
.friend {
  list-style: none;
  padding: 0px;
}
.friend-item {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
}
.friend-item-content {
  margin-left: 10px;
}
.friend-wrapper input[type="text"] {
  padding: 6px;
}
.user-status {
  margin-left: auto;
  margin-right: 5%;
}
.user-status .online {
  color: green;
}
.user-status .offline {
  background-color: red;
}
.users-link {
  font-size: 14px;
  background-color: grey;
}
</style>
