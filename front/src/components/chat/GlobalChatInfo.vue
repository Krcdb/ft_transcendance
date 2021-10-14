<template>

    <div class="chat" v-if="userSelected">

        <br>
        <hr>

        <button type="btn btn-success" name="button" @click="refreshConnectedUsers">
            Refresh Connected Users
        </button>
        <div class="nb-users-connected">{{ nb_users }} users are currently connected !</div>

        <hr>
        <br>
    </div>

</template>

<script type="text/typescript">
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

//import OwnerProfile from "./OwnerProfile";

export default defineComponent ({

    // Recuperer le profile selectionné d un autre component
    // recuperer le nombre de profile actuellement connectés


    // Default Data //
    name: "global-chat-info",
    data() {
        return {
            nb_users: 0,
            userSelected: false,
        };
    },

    methods: {
        init() {
            console.log("Selected Profile: ");
        },
        refreshConnectedUsers() {
            console.log("test");
        }
    },

    mounted() {
        console.log("Selected Profile: ");
    },
});
</script>

<style media="screen">

</style>
