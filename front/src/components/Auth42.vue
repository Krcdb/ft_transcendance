<template>
  <div>
    <p v-if="state === 'verifying'">Verifying your login...</p>

    <p v-if="state === 'loggedIn'">Welcome {{ user.userName }}! :)</p>

    <div v-if="state === 'error'">
      <p>Failed to login in :(</p>
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  data() {
    return {
      error: "",
      user: {} as User,
      state: "verifying",
    };
  },
  async mounted() {
    if (!this.$route.query.code) {
      this.$router.push("/login");
      return;
    }

    const url = `http://localhost:3000/auth/42?code=${this.$route.query.code}`;
    try {
      axios
        .get(url)
        .then((response: ResponseData) => {
          // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
          console.log(response);
          this.$router.push(`/users/${response.data.userName}`);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      this.state = "loggedIn";
    } catch (e) {
      this.error = e.response.data.message;
      this.state = "error";
    }
    console.log("state = ", this.state);
},
});
</script>
