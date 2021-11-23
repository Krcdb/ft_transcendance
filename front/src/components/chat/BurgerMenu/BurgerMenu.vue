<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="burger-menu">
        <div class="container-fluid">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <button type="button" name="button">
                        <img src="@/assets/Chat/envelop-solid.svg" alt="" width="32">
                    </button>
                    <hr>
                </li>
                <li class="nav-item">
                    <button type="button" name="button">
                        <img src="@/assets/Chat/comment-alt-solid.svg" alt="" width="32">
                    </button>
                    <hr>
                </li>
                <h6>Friend List:</h6>
                <li class="nav-item" v-for="friend in this.FriendList" :key="friend.id">
                    {{ friend.userName }}
                    <hr>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import User from "@/types/User";
import ChannelDataService from "@/services/ChannelDataService";
import UserDataService from "@/services/UserDataService";
import ResponseData from "@/types/ResponseData";
import Avatar from "@/components/users/Avatar.vue";

export default defineComponent({
    name: "burger-menu",
    data() {
        return {
            user: {} as User,
            FriendList: [] as User[],
        };
    },
    methods: {
        async getUser(id: number) {
            await UserDataService.get(id)
            .then((response: ResponseData) => {
                this.user = response.data;
            })
            .catch((e: Error) => {
                console.log(e);
                console.log("Error !");
            });
        },
        async getFriends(id: number) {
            await UserDataService.getFriends(id)
            .then((response: ResponseData) => {
                this.FriendList = response.data;
            })
            .catch((e: Error) => {
                console.log(e);
                console.log("Error !");
            });
        },
        async init() {
            console.log("UserID: " + Number(localStorage.getItem("user-id")));
            await this.getUser(Number(localStorage.getItem("user-id")));
            await this.getFriends(Number(localStorage.getItem("user-id")));
            console.log("Friend list: " + this.FriendList);
        },
        mounted() {
            console.log("Mount BurgerMenu");

            this.init();
        },
    },
});
</script>

<style media="screen">

.burger-menu {
    position: fixed;
    top: 0;
    right: 0;
    background-color: rgb(33, 36, 46);
    height: 100%;
    width: 100px;
}

.burger-menu ul {
    margin-top: 15px;
}

.burger-menu ul li {
    margin: 5px;
}

.burger-menu ul li img {
    filter: invert();
    filter: contrast(25%);
    transition: 0.2s;
}

.burger-menu ul li img:hover {
    filter: contrast(0%);
    transition: 0.2s;
}

.burger-menu button {
    background-color: rgba(13, 16, 26);
    border: 2px solid white;
    border-radius: 12px;
}

.burger-menu h6 {
    color: white;
}


</style>
