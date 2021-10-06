<template>
  <div class="user-profile">
    <h1>{{ msg }}</h1>
    <img src="../assets/avatar.png" />
    <h3>
      Name: blabla <br />
      other info <br />
      ...
    </h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserProfile",
  props: {
    msg: {
      type: String,
      required: false,
    },
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
