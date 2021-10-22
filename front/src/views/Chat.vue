<template>
    <br>

    <OwnerProfile @getUserSelected="HandleGetUserSelected"/>

    <GlobalChatInfo :nbUsers="nbUsers" :userSelected="userSelected"
    @refreshConnectedUsers="refreshConnectedUsers"/>

    <MenuChat />


    <!-- TMP TO TEST MSG -->
    <Message :owner="user" :prop_message="Test" v-if="user.userName"/>


</template>

<script lang="ts">
import { defineComponent } from "vue";
import Vue from 'vue';
import http from '@/http-common';

import ChannelDataService from '@/services/ChannelDataService';

import UserDataService from "@/services/UserDataService";
import User from "@/types/User";

import OwnerProfile from '@/components/chat/OwnerProfile.vue';
import ChatMessage from "@/types/ChatMessage";
import GlobalChatInfo from '@/components/chat/GlobalChatInfo.vue';
import Message from '@/components/chat/Message.vue';
import MenuChat from '@/components/chat/MenuChat.vue';


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
        GlobalChatInfo,
        Message,
        MenuChat
    },
    methods: {
        HandleGetUserSelected: function(value : User) {
            this.user = value;
            console.log("Handle get user: " + this.user.userName);
            this.userSelected = true;
        },
        refreshConnectedUsers() {
            console.log("Refresh connected users: " + this.nbUsers);
        },
    },
    setup() {
        console.log("Setup Chat");
    },
    mounted() {
        console.log("Mount chat !");
    }
});
</script>
