<template>
  <div class="profile">
    <router-link to="/create_user">Create New user !</router-link>
    <br />
    <UserProfile msg="Welcome to Your Profile" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import UserProfile from "@/components/UserProfile.vue";

export default defineComponent({
  name: "userProfile",
  components: {
    UserProfile,
  },
});
</script>

<style scoped>
/* .profile {
  border: 2px solid black;
} */
</style>
