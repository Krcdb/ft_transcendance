<template>
  <div v-if="currentUser.id" class="edit-form">
    <h4>User</h4>
    <h3> {{ currentUser.firstName }} {{ currentUser.lastName }}</h3>
    <button class="badge badge-danger mr-2" @click="deleteUser">
      Delete
    </button>

    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
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
      currentUser: {} as User,
      message: "",
    };
  },
  methods: {
    getUser(id: number) {
      UserDataService.get(id)
        .then((response: ResponseData) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteUser() {
      UserDataService.delete(this.currentUser.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "Users" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getUser(Number(this.$route.params.id));
  },
});
</script>

<style scoped>
div {
  display: inline-block;
  /* border: 2px solid black; */
}
h3 {
  display: inline-block;
  text-align: left;
  margin: 50px;
}
img {
  border: 5px solid #ddd;
  border-radius: 10px;
  vertical-align: top;
  /* margin-left: 200px;
  max-width: 300px; */
}
</style>
