<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
    >

    <OwnerProfile @getUserSelected="HandleGetUserSelected"/>

    <NavBar @switchNavBarSelection="SwitchNavBarSelection" v-if="this.userSelected"/>

    <CreateChannel :owner="user" v-if="this.navBarSelection == 0"/>
    <ChannelList :owner="user" v-if="this.navBarSelection == 1"/>
    <JoinPrivateChannel :owner="user" v-if="this.navBarSelection == 2"/>
    <UserList :owner="user" v-if="this.navBarSelection == 3"/>

    <BurgerMenu />

    <!--
    <ChannelElement :owner="user" :channel="currentChannel"/>

    <GlobalChatInfo :nbUsers="nbUsers" :userSelected="userSelected"
    @refreshConnectedUsers="refreshConnectedUsers"/>

    <MenuChat :owner="user"/>
-->


</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import Vue from 'vue';
import http from '@/http-common';

import ChannelDataService from '@/services/ChannelDataService';
import ResponseData from "@/types/ResponseData";

import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import Channel from "@/types/Channel";

import OwnerProfile from '@/components/chat/OwnerProfile.vue';
import NavBar from "@/components/chat/ChatNavBar.vue";
import ChatMessage from "@/types/ChatMessage";
import UserList from "@/components/chat/ChatNavBarFiles/UserList.vue";
import CreateChannel from "@/components/chat/ChatNavBarFiles/CreateChannel.vue";
import ChannelList from "@/components/chat/ChatNavBarFiles/ChannelList.vue";
import JoinPrivateChannel from "@/components/chat/ChatNavBarFiles/JoinPrivateChannel.vue";

import BurgerMenu from "@/components/chat/BurgerMenu/BurgerMenu.vue";

//import ChannelElement from "@/components/chat/Channel/Channel.vue";

//import GlobalChatInfo from '@/components/chat/GlobalChatInfo.vue';
//import Message from '@/components/chat/Message.vue';
//import MenuChat from '@/components/chat/MenuChat.vue';


export default defineComponent({
    name: "chat",
    data() {
        return {
            user: {} as User,
            userSelected: false,

            nbUsers: 0,
            message: {} as ChatMessage,

            navBarSelection: -1,

            currentChannel: {} as Channel, // current connected channel
        };
    },
    components: {
        OwnerProfile,
        NavBar,
        UserList,
        ChannelList,
        CreateChannel,
        JoinPrivateChannel,
        BurgerMenu,
//        ChannelElement, // tmp

        //GlobalChatInfo,
        //Message,
        //MenuChat
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
        this.refreshConnectedUsers();
        console.log("Mount chat !");

        let bootstrapScript = document.createElement('script');
        bootstrapScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js');
        bootstrapScript.setAttribute('integrity', 'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM');
        bootstrapScript.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(bootstrapScript);

        let awesomeFontScript = document.createElement('script');
        awesomeFontScript.setAttribute('src', 'https://kit.fontawesome.com/e575a33b19.js');
        awesomeFontScript.setAttribute('crossorigin', 'anonymous');
    }
});
</script>
