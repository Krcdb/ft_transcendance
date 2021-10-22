<template>
  <div v-if="currentUser.userName" class="edit-form">
    <h4>{{ currentUser.userName }}</h4>
    <p>Current avatar:</p>
    <img
      v-if="currentUser.avatar"
      :src="`http://localhost:3000/users/${currentUser.userName}/avatar`"
    />
    <img
      v-else
      :src="`https://avatars.dicebear.com/api/avataaars/${currentUser.userName}.svg`"
    />
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <input type="file" accept="image/*" @change="uploadFile" id="file-input"/>
        </div>
        <div class="form-group">
          <button class="btn btn-success btn-block btn-lg">Upload</button>
        </div>
      </form>
    </div>
    <button class="deletebtn" @click="deleteAvatar">Delete Avatar</button>
    <router-link :to="`/users/${currentUser.userName}`">
      <button>Go back to {{ currentUser.userName }} Profile</button>
    </router-link>
    <p>{{ msg }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please select an <router-link to="/users">User</router-link></p>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: "User",
  data() {
    return {
      file: "",
      currentUser: {} as User,
      msg: "",
    };
  },
  methods: {
    getUser(userName: string) {
      UserDataService.get(userName)
        .then((response: ResponseData) => {
          this.currentUser = response.data;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    uploadFile(event: any) {
      this.file = event.target.files[0];
    },
    handleSubmit() {
      if (this.file) {
        const formData = new FormData();
        formData.append("avatar", this.file);
        UserDataService.uploadAvatar(this.currentUser.userName, formData)
          .then(() => {
            var path = "/users/" + this.currentUser.userName;
            window.location.assign(path);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
      else
        this.msg = "Select a File to Upload"
    },
    deleteAvatar() {
      if (this.currentUser.avatar)
      {
        UserDataService.deleteAvatar(this.currentUser.userName)
          .then(() => {
            this.$router.go(0);
          })
          .catch((e: Error) => {
            this.msg = e.message;
            console.log(e);
          });
      }
      else {
        this.msg = "There is no avatar for user " + this.currentUser.userName;
      }
    }
  },
  mounted() {
    this.getUser(String(this.$route.params.userName));
  },
});
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  border: 5px solid #ddd;
  border-radius: 10px;
  width: 300px;
  height: 300px;
  object-fit: contain;
}
h4 {
  font-size: 30px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.deletebtn {
  background-color: #f44336;
}
</style>
