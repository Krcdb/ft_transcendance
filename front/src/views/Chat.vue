<template>
    <OwnerProfile @getUserSelected="HandleGetUserSelected"/>
    <NavBar v-if="this.userSelected"/>


<!--
    <GlobalChatInfo :nbUsers="nbUsers" :userSelected="userSelected"
    @refreshConnectedUsers="refreshConnectedUsers"/>

    <MenuChat :owner="user"/>
-->

    <!-- TMP TO TEST MSG -->
    <Message :owner="user" :prop_message="Test" v-if="user.userName"/>


</template>

<script lang="ts">
import { defineComponent } from "vue";
import Vue from 'vue';
import http from '@/http-common';

import ChannelDataService from '@/services/ChannelDataService';
import ResponseData from "@/types/ResponseData";

import UserDataService from "@/services/UserDataService";
import User from "@/types/User";

import OwnerProfile from '@/components/chat/OwnerProfile.vue';
import NavBar from "@/components/chat/NavBar.vue";
import ChatMessage from "@/types/ChatMessage";
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
        };
    },
    components: {
        OwnerProfile,
        NavBar,
        //GlobalChatInfo,
        //Message,
        //MenuChat
    },
    methods: {
        HandleGetUserSelected: function(value : User) {
            this.user = value;
            console.log("Handle get user: " + this.user.userName);
            this.userSelected = true;
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
