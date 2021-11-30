<template>
	<BurgerMenu />
    <OwnerProfile @getUserSelected="HandleGetUserSelected"/>
    <NavBar @switchNavBarSelection="SwitchNavBarSelection" v-if="this.userSelected"/>
    <PublicChannelList :user="user" v-if="this.navBarSelection == 0"/>
    <ChannelList :user="user" v-else-if="this.navBarSelection == 1"/>
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
import ChannelList from "@/components/chat/NavBarFiles/ChannelsList.vue";

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
        };
    },
    components: {
        OwnerProfile,
        NavBar,
        PublicChannelList,
        BurgerMenu,
        ChannelList,
    },
    methods: {
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
        this.refreshConnectedUsers();
        console.log("Mount chat !");
    }
});
</script>
