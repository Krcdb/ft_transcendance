<template>
  <p>Scan it in an Authentificator App and enter the code</p>
  <div v-if="qrcode">
    <img :src="qrcode" />
  </div>
  <div v-else>
    <h1>Please <router-link to="/login">Login</router-link></h1>
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
      qrcode: "",
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
    getQrcode() {
      let data = {
        id: localStorage.getItem("user-id"),
      };
      UserDataService.generateQRcode(data)
        .then((response) => {
        this.qrcode = `data:${response.headers["content-type"]};base64,${btoa(
          String.fromCharCode(...new Uint8Array(response.data))
        )}`;
      });
    },
  },
  mounted() {
    if (localStorage.getItem("user-id"))
    {
      this.getUser(Number(localStorage.getItem("user-id")));
      this.getQrcode();
    }
  },
});
</script>

<style scoped>

img {
}

</style>
