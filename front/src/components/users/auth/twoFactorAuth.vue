<template>
  <h4>Two Factor Authentication</h4>
  <QRcode />
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
import QRcode from "./QRcode.vue";

export default defineComponent({
  components: {
    QRcode,
  },
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
      UserDataService.turn2FAon(data)
        .then((response: ResponseData) => {
          this.error = "";
          this.$router.push("/profile");
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
      this.getUser(Number(localStorage.getItem("user-id")));
    }
  },
});
</script>
