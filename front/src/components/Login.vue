<template>
    <button @click="saveUser"> 42 connect </button>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";

export default defineComponent({
  name: "login",
  methods: {
    saveUser() {
      window.location.href = 'http://localhost:3000/login';
      }
  },
  mounted() {
    if (this.$route.query.code) {
      localStorage.code = this.$route.query.code;
      console.log(localStorage.code);
    }
  }
});
</script>
