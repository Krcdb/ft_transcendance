<template>
  <div v-if="currentUser.userName" class="edit-form">
    <h4>{{ currentUser.userName }}</h4>
    <div class="container">
      <img
        :src="'http://localhost:3000/users/' + currentUser.userName + '/avatar'"
      />
      <div class="user-info">
        <!-- <br /> -->
        <p> Victories: 0 </p>
        <p> Losses: 0 </p>
        <p> Level: 0 </p>
        <br />

        <button onclick="document.getElementById('id01').style.display='block'">Delete Profile</button>
        <div id="id01" class="modal">
          <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
          <form class="modal-content">
            <div class="modal-window">
              <h1>Delete Account</h1>
              <br />
              <p>Are you sure you want to delete your account?</p>
              <br />
                <button class="cancelbtn">Cancel</button>
                <button class="deletebtn" @click="deleteUser">Delete</button>
            </div>
          </form>
        </div>
        </div>
    </div>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "User",
  data() {
    return {
      currentUser: {} as User,
      message: "",
    };
  },
  methods: {
    getUser(userName: string) {
      UserDataService.get(userName)
        .then((response: ResponseData) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteUser() {
      UserDataService.delete(this.currentUser.userName)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "Users" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getUser(String(this.$route.params.userName));
  },
});
</script>

<style scoped>
div {
  /* border: 1px solid black; */
}
.container {
  display: flex;
  align-items: center;
  justify-content: center
}
.user-info {
  margin: 5%;
}

img {
  border: 5px solid #ddd;
  border-radius: 10px;
  max-width: 300px;
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
  opacity:1;
}
.cancelbtn, .deletebtn {
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
.modal-window {}
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
