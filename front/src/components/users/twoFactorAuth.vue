<template>
  <div>
        <b-img :src="qrcode"></b-img>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import http from "@/http-common";
import ResponseData from "@/types/ResponseData";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";

export default defineComponent({
  data() {
    return {
      error: "",
      user: {} as User,
      qrcode: "",
      state: "verifying",
    };
  },
  methods: {
    getUser(id: number) {
      UserDataService.get(id)
        .then((response: ResponseData) => {
          this.user = response.data;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getUser(0);
    const url = "http://localhost:3000/2fa/generate";
    let data = {
        user: this.user,
    };
    try {
      console.log("data = ", data);
      http
        .post(url, data)
        .then((response: ResponseData) => {
            console.log(response);
            const urlCreator = window.URL || window.webkitURL;
            this.qrcode = urlCreator.createObjectURL(response.data);
        //   localStorage.setItem("user-name", response.data.userName);
        //   localStorage.setItem("user-id", response.data.id);
        //   localStorage.setItem("user-token", response.data.access_token);
        //   this.$router.push("/profile");
        })
        .catch((e: Error) => {
          console.log(e);
        });
      this.state = "loggedIn";
    } catch (e) {
      this.error = e.response.data.message;
      console.log(e);
    }
  },
});
</script>