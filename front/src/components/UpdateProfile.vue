<template>
  <div v-if="user.userName" class="edit-form">
    <div class="update-head">
      <router-link class="profile-link" to="/profile">
        <h4>{{ user.userName }}</h4>
      </router-link>
    </div>
    <p>Current avatar:</p>
    <img
      v-if="user.avatar"
      :src="`http://localhost:3000/users/${user.id}/avatar`"
    />
    <img
      v-else
      :src="`https://avatars.dicebear.com/api/avataaars/${user.id}.svg`"
    />
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <div class="file-browsing-div">
          <input
            type="file"
            accept="image/*"
            @change="uploadFile"
            required
            id="file-input"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-success btn-block btn-lg">Upload</button>
          <button class="deletebtn" @click="deleteAvatar">Delete Avatar</button>
        </div>
      </form>
    </div>
    <div class="submit-form">
      <div class="update-username">
        <div class="form-group">
          <label for="userName">Change User Name:</label>
          <input
            type="text"
            class="form-control"
            required
            v-model="newUserName"
            :placeholder="user.userName"
          />
        </div>
        <button @click="updateUserName" class="btn btn-success">Submit</button>
      </div>
    </div>
    <p>{{ msg }}</p>
  </div>

  <div v-else>
    <br />
    <router-link to="/login"><button>Login</button></router-link>
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
      user: {} as User,
      msg: "",
      newUserName: "",
    };
  },
  methods: {
    getUser(id: number) {
      UserDataService.get(id)
        .then((response: ResponseData) => {
          this.user = response.data;
          if (!this.user)
            console.log("no user");
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    uploadFile(event: any) {
      this.file = event.target.files[0];
    },
    handleSubmit() {
      // if (this.file) {
        const formData = new FormData();
        formData.append("avatar", this.file);
        UserDataService.uploadAvatar(this.user.id, formData)
          .then(() => {
            this.$router.push("/profile");
          })
          .catch((e: Error) => {
            console.log(e);
          });
      // }
      // else
      //   this.msg = "Select a File to Upload"
    },
    updateUserName() {
      if (this.newUserName) {
        let data = {
          newUserName: this.newUserName,
        };
        UserDataService.updateUserName(this.user.id, data)
          .then(() => {
            console.log("username updated");
            this.msg = "";
            localStorage.setItem("user-name", this.newUserName);
            this.$router.push("/profile");
          })
          .catch((error) => {
            this.msg = error.response.data.message;
          });
      } else this.msg = "Please enter an User Name";
    },
    deleteAvatar() {
      if (this.user.avatar)
      {
        UserDataService.deleteAvatar(this.user.id)
          .then(() => {
            this.$router.go(0);
          })
          .catch((e: Error) => {
            this.msg = e.message;
            console.log(e);
          });
      }
      else {
        this.msg = "There is no avatar for user " + this.user.userName;
      }
    }
  },
  mounted() {
    this.getUser(Number(localStorage.getItem('user-id')));
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
.profile-link {
  color: black;
  text-decoration: none;
  align-content: center;
}
.deletebtn {
  background-color: #f44336;
}
.update-username {
  margin: 5%;
}
.file-browsing-div {
  margin: 5%;
}
</style>
