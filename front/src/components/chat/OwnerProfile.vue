<template>
    <div class="chat">

        <div class="select-user" v-if="!userSelected">
            <h3>Seclectionnez votre profile</h3>

            <button class="btn btn-success" name="button"
            :class="{ active: index == currentIndex} "
            v-for="(user, index) in users"
            :key="index"
            @click="selectUser(user)"
            >
            {{ user.userName }}
        </button>
    </div>

    <div class="Welcome-User" v-else>
        <h3>Bienvenue: {{ this.currentUser.userName }} </h3>
    </div>

</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

import Chat from "@/types/ChatMessage";

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
</style>
