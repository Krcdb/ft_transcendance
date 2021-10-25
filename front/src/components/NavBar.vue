<template>
  <nav class="navbar">
    <div class="logo-wrapper">
      <img class="logo" src="@/assets/pong_logo.png" height="60" width="140" />
    </div>
    <div class="nav-wrapper">
      <ul>
        <li><router-link class="active" to="/">Home</router-link></li>
        <li><router-link to="/game">Game</router-link></li>
        <li><router-link to="/chat">Chat</router-link></li>
        <li><router-link to="/users">Users</router-link></li>
        <li style="float:right">
          <router-link v-if="user && user.userName" to="/profile">{{ user.userName }}</router-link>
          <router-link v-else to="/login">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
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
      user: {} as User | null, 
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
    logout() {
      localStorage.removeItem("user-token");
      localStorage.removeItem("user-name");
      localStorage.removeItem("user-id");
      this.user = null;
      this.$router.go(0);
    },
  },
  watch: {
    $route () {
      // this.user = null;
      if (localStorage.getItem("user-id")) {
        console.log("user id = ", localStorage.getItem("user-id"))
        this.getUser(Number(localStorage.getItem("user-id")));
      }
      console.log("user = ", this.user);
    }
  },
});
</script>

<style scoped>
.navbar div {
  display: flex;
  height: 60px;
}
.logo-wrapper {
  float: left;
}

.user-login {
  float:left;
  background-color: pink;
}

.nav-wrapper ul {
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.nav-wrapper li {
  float: left;
  font-weight: bold;
  padding: 5px 5px;
}

.nav-wrapper li a {
  color: black;
  padding: 14px 16px;
  text-decoration: none;
  text-align: center;
}

.nav-wrapper li a:hover {
  background-color: rgb(206, 206, 206);
  border-radius: 10px;
}

.nav-wrapper li a.router-link-exact-active {
  background-color: black;
  border-radius: 10px;
  color: white;
}

</style>
