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
    console.log("query.code -> ", this.$route.query.code);
    if (!this.$route.query.code) {
      this.$router.push("/login");
      return;
    }

    const url = `http://localhost:3000/auth/42?code=${this.$route.query.code}`;
    try {
      axios
        .get(url)
        .then((response: ResponseData) => {
          this.user = response.data;
          console.log(response.data);
          // window.localStorage.setItem('user', this.user.userName);
          this.$router.push(`/users/${this.user.userName}`);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      // const { data } = await axios.get(url);
      this.state = "loggedIn";
    } catch (e) {
      this.error = e.response.data.message;
      this.state = "error";
    }
    console.log("state = ", this.state);
},
});
</script>
