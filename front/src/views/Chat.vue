<template>
    <OwnerProfile @getUserSelected="HandleGetUserSelected"/>

    <NavBar @switchNavBarSelection="SwitchNavBarSelection" v-if="this.userSelected"/>

    <CreateChannel :owner="user" v-if="this.navBarSelection == 0"/>
    <ChannelList :owner="user" v-if="this.navBarSelection == 1"/>
    <UserList :owner="user" v-if="this.navBarSelection == 2"/>


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
import NavBar from "@/components/chat/NavBar.vue";
import ChatMessage from "@/types/ChatMessage";
import UserList from "@/components/chat/NavBar/UserList.vue";
import CreateChannel from "@/components/chat/NavBar/CreateChannel.vue";
import ChannelList from "@/components/chat/NavBar/ChannelList.vue";

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
    }
});
</script>
