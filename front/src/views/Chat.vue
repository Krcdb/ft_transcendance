<template>
    <br>


    <OwnerProfile @getUserSelected="HandleGetUserSelected"/>
    <GlobalChatInfo :nbUsers="nbUsers" :userSelected="userSelected"/>


    <!-- TMP TO TEST MSG -->
    <Message :owner="user" :prop_message="Test" v-if="user.userName"/>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import Vue from 'vue';
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ChatMessage from "@/types/ChatMessage";

import OwnerProfile from '@/components/chat/OwnerProfile.vue';
import GlobalChatInfo from '@/components/chat/GlobalChatInfo.vue';
import Message from '@/components/chat/Message.vue';

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
        Message
    },
    methods: {
        HandleGetUserSelected: function(value : User) {
            this.user = value;
            console.log("Handle get user: " + this.user.userName);
            this.userSelected = true;
        },
        refreshConnectedUsers() {
            console.log("1");
        },
    },
    setup() {
        console.log("Setup Chat");
    },
});
</script>
