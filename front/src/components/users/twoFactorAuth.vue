<template>
  <div>
    <img :src="qrcode" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import http from "@/http-common";
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
    getQrcode() {
      const url = "http://localhost:3000/2fa/generate";
      let data = {
        id: 0,
      };
      http.post(url, data, { responseType: "arraybuffer" }).then((response) => {
        this.qrcode = `data:${response.headers["content-type"]};base64,${btoa(
          String.fromCharCode(...new Uint8Array(response.data))
        )}`;
      });
    },
  },
  mounted() {
    this.getQrcode();
  },
});
</script>
