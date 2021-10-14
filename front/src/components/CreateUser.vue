<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="userName">User Name:</label>
        <input
          type="text"
          class="form-control"
          id="userName"
          required
          v-model="user.userName"
          name="userName"
        />
      </div>
      <br />
      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>The user was successfully created !</h4>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
  <h4>{{ msg }}</h4>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
// import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "create-user",
  data() {
    return {
      user: {
        userName: "",
      } as User,
      submitted: false,
      msg: "",
    };
  },
  methods: {
    saveUser() {
      if (this.user.userName)
      {
        let data = {
          userName: this.user.userName,
        };
        UserDataService.create(data)
          .then((response) => {
            console.log(response);
            this.submitted = true;
            this.msg = "";
          })
          .catch((error) => {
            console.log(error);
            this.msg = error;
          });
      }
      else
        this.msg = "Please enter an User Name";
      //  console.log("❌");
    },

    newUser() {
      this.submitted = false;
      this.msg = "";
      this.user = {} as User;
    },
  },
});
</script>
