<template>
  <h4>Two Factor Authentication</h4>
  <p>Enter the code from your authentification app</p>
  <div class="send-code">
    <div class="form-group">
      <label for="code">Enter code:</label>
      <input
        type="text"
        maxlength="6"
        minlength="6"
        required
        v-model="authcode"
        placeholder="000000"
        size="6"
      />
      </div>
      <button @click="sendCode" class="btn btn-submit">Submit</button>
    </div>
    <p> {{ error }} </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  data() {
    return {
      error: "",
      user: {} as User,
      authcode: "",
    };
  },
  methods: {
    getUser(id: number) {
      UserDataService.get(id)
        .then((response: ResponseData) => {
          this.error = "";
          this.user = response.data;
        })
        .catch((e: Error) => {
          this.error = e.message;
          console.log(e);
        });
    },
    sendCode() {
      let data = {
        twoFAuthCode: this.authcode,
        id: this.user.id,
      };
      UserDataService.authenticate2fa(data)
        .then((response: ResponseData) => {
          console.log("RESPONSE = ", response);
          this.error = "";
          if (response.data.access_token)
          {
            localStorage.setItem("user-name", response.data.userName);
            localStorage.setItem("user-id", response.data.id);
            localStorage.setItem("user-token", response.data.access_token);
            this.$router.push("/profile");
          }
        })
        .catch((e: Error) => {
          this.error = e.message;
          console.log(e);
        });
    }
  },
  mounted() {
    if (localStorage.getItem("user-id"))
    {
      console.log("id = ", localStorage.getItem("user-id"));
      this.getUser(Number(localStorage.getItem("user-id")));
    }
  },
});
</script>