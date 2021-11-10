<template>
    <div class="chat">
        <div class="select-user" v-if="!userSelected">
            <h3>Seclectionnez votre profile</h3>
            <div class="no-user-created">
                <h4 class="warning" v-if="this.users.length <= 0">No user found, create user first</h4>
            </div>

            <button class="" name="button"
            :class="{ active: index == currentIndex} "
            v-for="(user, index) in users"
            :key="index"
            @click="selectUser(user)"
            >
            <img :src="`https://avatars.dicebear.com/api/avataaars/${user.id}.svg`" alt="">
            {{ user.userName }}
        </button>
    </div>

    <div class="welcome-User" v-else>
        <h3>Bienvenue: <strong> {{ this.currentUser.userName }} </strong> </h3>
        <img :src="`https://avatars.dicebear.com/api/avataaars/${this.currentUser.id}.svg`" alt="">
    </div>

</div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";

import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    // 1: selectionner son utilisateur parmi la liste des user crées.

    name: "owner-profile",
    data() {
        return {
            users: [] as User[],
            currentUser: {} as User,
            currentIndex: -1,
            userSelected: false,
        };
    },
    props: {
        method: { type: Function },
    },
    methods: {
        getUsers() {
            UserDataService.getAll()
            .then((response: ResponseData) => {
                this.users = response.data;
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        },
        refreshList() {
            this.currentUser = {} as User;
            this.currentIndex = -1;
            this.userSelected = false;
        },
        selectUser(user : User) {
            console.log("Select User: " + user.userName);
            this.currentUser = user as User;
            this.userSelected = true;
            this.$emit('getUserSelected', user);
        },
    },

    // Component Loaded
    mounted() {
        this.getUsers();
    },
});
</script>

<style>
.userChatInput {
    display: inline-block;
    width: 0 auto;
    height: 0 auto;
    margin: 2px black auto;
}
.userChatInput .btn {
    margin: 15px;
}
.userChatInput .btn-default {
    border: 2px solid black;
}
.select-user {
    display: inline-block;
    text-align: center;


    width: auto;
    height: auto;

    margin: 0 auto;
    padding: 0 auto;
}
.select-user button {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 42px;
    margin-top: 10px;
}

button img{
    width: 24px;
}
.welcome-User {
    position: relative;
    display: inline-block;
    margin: 0 auto;
    padding: 0 auto;
    width: 30em;
    text-align: center;
}
.welcome-User img {
    width: 12em;
}

.welcome-User strong {
    color: lightgreen;
}

.warning {
    color: orange;
}
</style>
