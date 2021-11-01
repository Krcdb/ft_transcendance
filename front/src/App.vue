<template>
  <NavBar />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "App",
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
#online-circle {
    background: #1fcc00;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
#offline-circle {
    background: #ff0000;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
</style>
