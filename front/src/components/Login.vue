<template>
  <div class="login">
    Welcome!
    <a :href="url">Sign in with 42</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  data() {
    return {
      query: {
        client_id: process.env.VUE_APP_FT_CLIENT_ID,
        redirect_uri: process.env.VUE_APP_FT_REDIRECT_URL,
        response_type: "code",
      },
      url: "https://api.intra.42.fr/oauth/authorize?",
    };
  },
  mounted() {
    this.url += Object.entries(this.query)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  },
});
</script>