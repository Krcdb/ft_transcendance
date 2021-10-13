<template>
    <div class="chat">

        <div class="Init-UserName">
            <input id="text-box-userName" type="text" name="" value="Default">
            <button class="btn btn-success" type="button" name="button" @click="updateUserName()">Confirmer</button>
        </div>

        <div class="Welcome-User">
            <br>
            <h3>Bienvenue: {{ username }} </h3>
            <br>
            <hr>
        </div>

    </div>
</template>

<script lang="ts">
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

export default {
    // temporaire, ecrire son pseudo avec un text box et pouvoir envoyer des messages avec se pseudo

    name: "owner-profile",
    data() {
        return {
            //username: "Vintz" // todo, recuperer l utilisateur connecté avec l API 42
            username: "" as User
        }
    },
    methods:{
        updateUserName(name: User) {
            this.username = name;
        }
    }
}
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
</style>
