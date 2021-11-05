<template>
  <div class="blocked-select">
    <select class="blocked" onchange="location = this.value">
      <option>Blocked users:</option>
      <option class="blocked-item" v-for="user in users" :key="user.id" :value="'/users/' + user.id">
        {{ user.userName }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "users-blocked",
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
.blocked-select h3 {
  font-size: 20px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.blocked-select {
  position: relative;
}
</style>