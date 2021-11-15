<template>
  <div class="login">
    <a :href="url">
      <button>Sign in with 42</button>
    </a>
    <router-link to="/illegal-login">
      <button>Illegal login</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  data() {
    return {
      url: "https://api.intra.42.fr/oauth/authorize?",
      query: {
        client_id: process.env.VUE_APP_FT_CLIENT_ID,
        redirect_uri: process.env.VUE_APP_FT_REDIRECT_URL,
        response_type: "code",
      },
    };
  },
  mounted() {
    this.url += Object.entries(this.query)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
  },
});
</script>

<style scoped>
.login {
  margin: 20%;
}
</style>
