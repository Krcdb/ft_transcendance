<template>
  <div v-if="currentUser.userName" class="edit-form">
    <h4>{{ currentUser.userName }}</h4>
    <p>Current avatar:</p>
    <img v-if="currentAvatar" :src="currentAvatar" />
    <img v-else src="../assets/avatar.png" />
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <input type="file" @change="uploadFile" multiple />
        </div>
        <div class="form-group">
          <button class="btn btn-success btn-block btn-lg">Upload</button>
        </div>
      </form>
    </div>
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
      files: "",
      currentAvatar: "",
      currentUser: {} as User,
    };
  },
  methods: {
    getUserAvatar(userName: string) {
      UserDataService.getAvatar(userName)
        .then(() => {
          this.currentAvatar =
            "http://localhost:3000/users/" + userName + "/avatar";
          console.log("AVATAR");
        })
        .catch(() => {
          this.currentAvatar = "";
          console.log("Nothing");
        });
    },
    getUser(userName: string) {
      UserDataService.get(userName)
        .then((response: ResponseData) => {
          this.currentUser = response.data;
          // console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      this.getUserAvatar(userName);
    },
    uploadFile(event: any) {
      this.files = event.target.files;
      console.log(event);
    },
    handleSubmit() {
      const formData = new FormData();
      for (const i of Object.keys(this.files)) {
        formData.append("avatar", this.files[Number(i)]);
      }
      UserDataService.uploadAvatar(this.currentUser.userName, formData)
        .then(() => {
          console.log("success");
          window.location.reload();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getUser(String(this.$route.params.userName));
  },
});
</script>

<style scoped>
/* div {
  border: 1px solid black;
} */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-info {
  margin: 5%;
}

img {
  border: 5px solid #ddd;
  border-radius: 10px;
  max-width: 300px;
  max-height: 300px;
  /* margin-right: 50%; */
}
h4 {
  font-size: 30px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

button {
  border: none;
  padding: 8px;
  color: white;
  background-color: black;
  text-align: center;
  font-size: 18px;
  opacity: 0.9;
}
button:hover {
  opacity: 1;
}
.cancelbtn,
.deletebtn {
  float: left;
  width: 50%;
}

/* Add a color to the cancel button */
.cancelbtn {
  background-color: #ccc;
  color: black;
}

/* Add a color to the delete button */
.deletebtn {
  background-color: #f44336;
}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: #474e5d;
  padding-top: 50px;
}
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}
</style>
