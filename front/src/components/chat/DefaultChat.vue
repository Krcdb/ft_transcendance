<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  
    <div class="chat">
        <h3>Bienvenue: {{ username }} </h3>

    <div class="nb-users-connected">{{ nb_users }} users are curently connected !</div>

    <input class="fs-5 fw-semibold" v-model="username"/>

    </div>
</template>

<script lang="ts">
import {ref} from "vue";
import Chat from "@/types/Chat";

export default {
    name: "chat", 
    setup() {
    return {
        messages: "";
        };
    },

    methods: {
        getMessages() {
          let data =  {
              userName: this.chat.currentMessage,
          }
        }
    }

}
</script>