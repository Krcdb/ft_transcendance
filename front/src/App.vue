<template>
  <NavBar />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "App",
  // title: "Pong";
  components: {
      NavBar,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 6%;
}
button {
  border: none;
  padding: 8px;
  color: white;
  background-color: rgb(24, 24, 24);
  text-align: center;
  font-size: 18px;
  opacity: 0.9;
  text-decoration: none;
  margin: 5px;
}
button:hover {
  opacity: 1;
}
ul {
  list-style-type: none;
}
</style>
