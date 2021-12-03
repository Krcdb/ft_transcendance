<template>
	<!-- <BurgerMenu /> -->
    
    <!-- FOR USER SELECTION -->
    <!-- <OwnerProfile @getUserSelected="HandleGetUserSelected"/>
    <PublicChannelList :user="user" v-if="this.userSelected"/> -->
    
    <!-- NO USER SELECTION -->
    <div v-if="isloading">
        Loading...
    </div>
    <div v-else>
        <MyProfile :user="user" />
        <PublicChannelList :user="user" />
    </div>

</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import ResponseData from "@/types/ResponseData";

import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import Channel from "@/types/Channel";

import OwnerProfile from '@/components/chat/OwnerProfile.vue';
import NavBar from "@/components/chat/NavBar.vue";
import PublicChannelList from "@/components/chat/NavBarFiles/PublicChannelList.vue";
import ChannelList from "@/components/chat/NavBarFiles/myChannelsList.vue";
import MyProfile from "@/components/chat/MyProfile.vue"

import BurgerMenu from "@/components/chat/BurgerMenu/BurgerMenu.vue";


import io from "socket.io-client";
import SocketServices from "../services/SocketServices"
const socket = io("http://localhost:3000", {
	auth: {
		token: localStorage.getItem('user-token'),
		userId: localStorage.getItem('user-id'),
		page: "chat"
	}
});

export default defineComponent({
    name: "chat",
    data() {
        return {
            user: {} as User,
            userSelected: false,
            nbUsers: 0,
            navBarSelection: -1,
            currentChannel: {} as Channel, // current connected channel
            isloading: {} as boolean,
        };
    },
    components: {
        OwnerProfile,
        NavBar,
        PublicChannelList,
        BurgerMenu,
        ChannelList,
        MyProfile,
    },
    methods: {
        getUser(id: number) {
            this.isloading = true;
            UserDataService.get(id)
            .then((response: ResponseData) => {
                this.user = response.data;
                this.isloading = false;
            })
            .catch((e: Error) => {
                console.log(e);
            });
        },
        HandleGetUserSelected: function(value : User) {
            this.user = value;
            console.log("Handle get user: " + this.user.userName);
            this.userSelected = true;

            console.log("Switch user");

            // TMP debug with user
            localStorage.setItem("user-id", String(this.user.id));
            localStorage.setItem("user-name", this.user.userName);
        },
        SwitchNavBarSelection(value : number) {
            this.navBarSelection = value;
            console.log("Change NavBar Selection to: " + value);
        },
        refreshConnectedUsers() {
            UserDataService.getAll()
            .then((response: ResponseData) => {
                let nb = 0;
                for (let index = 0; index < response.data.length; index++) {
                    if (response.data[index].isActive) {
                        ++nb;
                    }
                }
                this.nbUsers = nb;
            })
            .catch((e: Error) => {
                console.log("Error: " + e);
            });
            console.log("Refresh connected users: " + this.nbUsers);
        },
    },
    setup() {
        console.log("Setup Chat");
    },
    mounted() {
		SocketServices.connectGlobalSocketNotif(socket);
        this.getUser(Number(localStorage.getItem("user-id")));
        // this.refreshConnectedUsers();
        console.log("Mount chat !");
    }
});
</script>
