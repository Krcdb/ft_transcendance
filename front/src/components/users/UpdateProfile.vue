<template>
  <div v-if="user.userName">
    <div class="update-head">
      <router-link class="profile-link" to="/profile">
        <h4>{{ user.userName }}</h4>
      </router-link>
    </div>
    <div class="edit-form">
      <div class="change-avatar">
        <p>Current avatar:</p>
        <img
          v-if="user.avatar"
          :src="`http://localhost:3000/users/${user.id}/avatar`"
        />
        <img
          v-else
          :src="`https://avatars.dicebear.com/api/avataaars/${user.id}.svg`"
        />
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
            <button class="deletebtn" @click="deleteAvatar">
              Delete Avatar
            </button>
          </div>
        </form>
      </div>
      <div class="other-change">
        <div class="twofa-handling">
          <h3>2-factor authentication</h3>
          <label class="switch">
            <input
              type="checkbox"
              v-model="checked"
              @change="Handle2FaChange"
            />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="update-username">
          <div class="form-group">
            <h3>Change User Name</h3>
            <label for="userName">
              <input
                type="text"
                maxlength="12"
                class="form-control"
                required
                v-model="newUserName"
                :placeholder="user.userName"
              />
              <button @click="updateUserName" class="btn btn-success">
                Submit
              </button>
            </label>
          </div>
        </div>
        <p>{{ msg }}</p>
        <router-link to="/profile">
          <button class="discreet-button">Go back to Profile Page</button>
        </router-link>
      </div>
    </div>
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
      checked: {} as boolean,
    };
  },
  methods: {
    getUser(id: number) {
      UserDataService.get(id)
        .then((response: ResponseData) => {
          this.user = response.data;
          this.checked = this.user.isTwoFAuthEnabled;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    uploadFile(event: any) {
      this.file = event.target.files[0];
    },
    handleSubmit() {
      const formData = new FormData();
      formData.append("avatar", this.file);
      UserDataService.uploadAvatar(this.user.id, formData)
        .then(() => {
          this.$router.push("/profile");
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    Handle2FaChange() {
      if (this.user.isTwoFAuthEnabled && !this.checked)
      {
        let data = {
          id: this.user.id,
        };
        UserDataService.turn2FAoff(data)
          .then((response: ResponseData) => {
            // consolee.log
            this.checked = false;
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
      else if (!this.user.isTwoFAuthEnabled && this.checked)
        this.$router.push("/2FAuth")
    },
    updateUserName() {
      if (this.newUserName) {
        let data = {
          newUserName: this.newUserName,
        };
        UserDataService.updateUserName(this.user.id, data)
          .then(() => {
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
    },
  },
  mounted() {
    this.getUser(Number(localStorage.getItem('user-id')));
    this.checked = this.user.isTwoFAuthEnabled;
  },
});
</script>

<style scoped>
.edit-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
}
.change-avatar{
    display: flex;
    flex-direction: column;
}
.other-change {
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  margin: 2%;
}
.file-browsing-div {
  margin: 5%;
}
.discreet-button {
  background-color: #828282;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #21c20c;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
