<template>
  <div>
    <form @submit="postData" method="post">
      <label for="firstName">First Name:</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First Name"
        v-model="firstName"
      />
      <br />
      <br />
      <label for="lastName">Last Name:</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
        v-model="lastName"
      />
      <br />
      <br />
      <button type="submit">Create New User</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      firstName: null,
      lastName: null,
    };
  },
  methods: {
    postData(e) {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
      };
        axios.post("http://localhost:3000/users", data).then((result) => {
        console.warn(result);
        // window.location = "/Users"
      });
      e.preventDefault();
    },
  },
};
</script>
