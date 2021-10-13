<template>
    <button type="btn btn-success" name="button">Get Connected Users</button>
    <div class="nb-users-connected">{{ nb_users }} users are currently connected !</div>

</template>

<script type="text/typescript">
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

export default {
    // Default Data //
    name: "connected-users",
    data() {
        return {
            nb_users: 0
        };
    }
}
</script>

<style media="screen">

</style>
