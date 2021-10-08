<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="firstName">firstName</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          required
          v-model="user.firstName"
          name="firstName"
        />
      </div>

      <div class="form-group">
        <label for="lastName">lastName</label>
        <input
          class="form-control"
          id="lastName"
          required
          v-model="user.lastName"
          name="lastName"
        />
      </div>

      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
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
        // id: 0,
        firstName: "",
        lastName: "",
        // isActive: false,
      } as User,
      submitted: false,
    };
  },
  methods: {
    saveUser() {
      let data = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
      };
      UserDataService.create(data)
        .then((response) => {
          console.log(response);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newUser() {
      this.submitted = false;
      this.user = {} as User;
    },
  },
});
</script>
