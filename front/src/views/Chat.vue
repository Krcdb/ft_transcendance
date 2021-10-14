<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">


    <OwnerProfile @getUserSelected="HandleGetUserSelected"/>
    <GlobalChatInfo />


    <!-- TMP TO TEST MSG -->
    <Message />
    
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
    },
    setup() {
        console.log("Setup Chat");
    },
});
</script>
