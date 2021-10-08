<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Users List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in users"
          :key="index"
          @click="setActiveuser(user, index)"
        >
          {{ user.firstName }} {{ user.lastName }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentuser.id">
        <h4>User</h4>
        <div>
          <label><strong>Name:</strong></label>
          {{ currentuser.firstName }} {{ currentuser.lastName }}
        </div>

        <router-link
          :to="'/users/' + currentuser.id"
          class="badge badge-warning"
          >Click here</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a user...</p>
      </div>
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
          console.log(response.data);
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

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
