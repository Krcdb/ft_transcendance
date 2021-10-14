<template>
  <div class="list row">
    <div class="list-wrapper">
      <h3>Users List</h3>
      <router-link to="/create-user">
        <button>Create New User</button>
      </router-link>
      <ul class="list">
        <li
          class="list-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in users"
          :key="index"
          @click="setActiveuser(user, index)"
        >
          <div class="list-img">
            <img
              v-if="user.avatar"
              :src="`http://localhost:3000/users/${user.userName}/avatar`"
            />
            <img
              v-else
              :src="`https://avatars.dicebear.com/api/avataaars/${user.userName}.svg`"
            />
          </div>
          <div class="list-item-content">
            <router-link class="profile-link" :to="'/users/' + user.userName">
              <h4>{{ user.userName }}</h4>
            </router-link>
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
      currentuser: {} as User,
      currentIndex: -1,
    };
  },
  methods: {
    retrieveusers() {
      UserDataService.getAll()
        .then((response: ResponseData) => {
          this.users = response.data;
          this.users.sort((a, b) => (a.userName > b.userName ? 1 : -1));
          // console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveusers();
      this.currentuser = {} as User;
      this.currentIndex = -1;
    },

    setActiveuser(user: User, index = -1) {
      this.currentuser = user;
      this.currentIndex = index;
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
  display: flex;
  align-content: center;
}
.list {
  background-color: white;
  border-radius: 2px;
  list-style: none;
  padding: 10px 20px;
}

.list-item {
  display: flex;
  align-content: center;
  margin: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.list-item-content {
  margin-left: 20px;
}
</style>
