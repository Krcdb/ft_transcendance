<template>
  <div class="list row">
    <div class="list-wrapper">
      <h3>Users List</h3>
      <input
        type="text"
        placeholder="Search an user..."
        v-model="keyword"
        @input="searchhandler"
      />
      <ul class="list">
        <li class="list-item" v-for="user in users" :key="user.id">
          <div class="list-img">
            <Avatar :user="user" />
          </div>
          <div class="list-item-content">
            <router-link class="profile-link" :to="'/users/' + user.id">
              <h4>{{ user.userName }}</h4>
            </router-link>
          </div>
          <div class="friend-status" v-if="currentUser.friends.indexOf(user.id) != -1">
            Friend
          </div>
          <div class="me-status" v-if="user.id == currentUser.id">Me</div>
          <div class="admin-status" v-if="user.isWebsiteAdmin">Admin</div>
          <div class="owner-status" v-if="user.isWebsiteOwner">Owner</div>
          <div class="user-status">
            <div v-if="user.isActive" id="online-circle"></div>
            <div v-else id="offline-circle"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";
import Avatar from "@/components/users/Avatar.vue";

export default defineComponent({
  name: "admin-users-list",
  components: {
    Avatar,
  },
  data() {
    return {
      users: [] as User[],
      // admins: [] as User[],
      owner: {} as User,
      filteredUsers: [] as User[],
      keyword: "",
      currentUser: {} as User,
    };
  },
  methods: {
    retrieveUsers() {
      UserDataService.getAll().then((response: ResponseData) => {
        for (let i in response.data)
        {
          this.users.push(response.data[i]);
          if (response.data[i].isWebsiteOwner == true)
            this.owner = response.data[i];
        }
        this.users.sort((a, b) => (a.userName > b.userName ? 1 : -1));
      })
      .catch((e: Error) => {
        console.log(e);
      });
    },
    searchhandler() {
      this.filteredUsers = this.users.filter((user) =>
        user.userName.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
  },
  mounted() {
    UserDataService.get(Number(localStorage.getItem("user-id")))
    .then((response: ResponseData) => {
      this.currentUser = response.data;
      this.retrieveUsers();
    })
    .catch((e: Error) => {
      console.log(e);
    });
  },
});
</script>

<style scopped>
.list-img img {
  width: 64px;
  height: 64px;
}
h3 {
  font-size: 30px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.list-wrapper {
  max-width: 400px;
  margin: auto;
}
.profile-link {
  color: black;
  text-decoration: none;
  font-size: 18px;
  align-content: center;
}
.list {
  background-color: white;
  border-radius: 2px;
  list-style: none;
}
.list-item {
  display: flex;
  align-content: center;
  margin: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
}
.list-item-content {
  margin-left: 20px;
  margin-right: auto;
}
.list-wrapper input[type="text"] {
  padding: 6px;
  font-size: 17px;
}
.user-status {
  margin-left: 5%;
  margin-right: 10%;
}
.user-status .online {
  color: green;
}
.user-status .offline {
  background-color: red;
}
.friend-status {
  background-color: #4bbd4b;
  font-weight: bold;
  color: white;
  padding: 5px;
}
.me-status {
  background-color: black;
  font-weight: bold;
  color: white;
  padding: 5px;
}
.admin-status {
  background-color: #2d9feb;
  font-weight: bold;
  color: white;
  padding: 5px;
}
.owner-status {
  background-color: darkblue;
  font-weight: bold;
  color: white;
  padding: 5px;
}
</style>
