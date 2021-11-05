<template>
  <div class="list-row">
    <div class="list-wrapper">
      <h3>Blocked List</h3>
      <ul class="list">
        <li class="list-item" v-for="user in users" :key="user.id">
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
              <p>{{ user.userName }}</p>
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
    };
  },
  methods: {
    retrieveusers() {
      UserDataService.getBlocked(Number(localStorage.getItem('user-id')))
        .then((response: ResponseData) => {
          this.users = response.data;
          this.users.sort((a, b) => (a.userName > b.userName ? 1 : -1));
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveusers();
  },
});
</script>

<style scopped>
.list-row {
  padding: 20px;
  display: flex;
}
.list-img img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
h3 {
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
.list {
  list-style: none;
  padding: 0px;
}
.list-item {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
}
.list-item-content {
  margin-left: 10px;
}
.list-wrapper input[type="text"] {
  padding: 6px;
}
</style>