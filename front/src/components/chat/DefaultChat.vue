<template>

    <div class="chat">

        <h3>Bienvenue: {{ username }} </h3>
        <div class="nb-users-connected">{{ nb_users }} users are curently connected !</div>

        <div id="counter">
            Counter: {{ counter }}
        </div>

    </div>



</template>

<script lang="ts">
import UserDataService from "@/services/UserDataService";

export default {

    // Default Data //
    data() {
        return {
            username: "Vintz"
        }
    },



    // Methods //
    methods: {
        confirmUser() {
            let data = {
                username: this.username,
            };
        UserDataService.get(data)
        .then((response) => {
            console.log(response);
            this.confirmUser = true;
        })
        },
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
