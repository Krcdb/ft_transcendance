<template>
  <div class="list row">
    <div class="list-wrapper">
      <h3>Users List</h3>
      <input
        type="text"
        placeholder="Search an user..."
        v-model="keyword"
        @input="searchhandler"
        @change="searchhandler"
      />
      <ul class="list">
        <li class="list-item" v-for="user in filteredUsers" :key="user.id">
          <div class="list-img">
            <img
              v-if="user.avatar"
              :src="`http://localhost:3000/users/${user.id}/avatar`"
            />
            <img
              v-else
              :src="`https://avatars.dicebear.com/api/avataaars/${user.id}.svg`"
            />
          </div>
          <div class="list-item-content">
            <router-link class="profile-link" :to="'/users/' + user.id">
              <h4>{{ user.userName }}</h4>
            </router-link>
          </div>
          <div class="user-status">
            <div v-if="user.isActive" id="online-circle"></div>
            <div v-else id="offline-circle"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "users-list",
  data() {
    return {
      users: [] as User[],
      filteredUsers: [] as User[],
      keyword: "",
    };
  },
  methods: {
    retrieveusers() {
      UserDataService.getAll()
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
.list-img img {
  width: 64px;
  height: 64px;
  object-fit: contain;
}
h3 {
  font-size: 30px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.list-wrapper {
  max-width: 400px;
  margin: auto;
}
.profile-link {
  color: black;
  text-decoration: none;
  font-size: 18px;
  align-content: center;
}
.list {
  background-color: white;
  border-radius: 2px;
  list-style: none;
  /* padding: 10px 20px; */
}

.list-item {
  display: flex;
  align-content: center;
  margin: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
}
.list-item-content {
  margin-left: 20px;
}
.list-wrapper input[type="text"] {
  padding: 6px;
  font-size: 17px;
}
.user-status {
  margin-left: auto;
  margin-right: 10%;
}
.user-status .online {
  color: green;
}
.user-status .offline {
  background-color: red;
}
</style>