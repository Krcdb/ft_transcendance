<template>
    <div class="user-user-list">
        <ul class="user">
            <li class="user-list" v-for="user in usersList" :key="user.id">
                <div class="user-list-element">
                    <img :src="`https://avatars.dicebear.com/api/avataaars/${user.id}.svg`"/>
                    <div class="list-user-info">
                        <div class="user-top">
                            <h4>{{ user.userName }}</h4>
                            <div class="user-status">
                                <div v-if="user.isActive" id="online-circle"></div>
                                <div v-else id="offline-circle"></div>
                            </div>
                        </div>
                        <button class="button" :class="user.isActive? 'btn-actif' : 'btn-inactif'" type="button" name="button">Envoyer un message privé</button>
                    </div>
                </div>
                <hr>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

import UserDataService from "@/services/UserDataService";
import ResponseData from "@/types/ResponseData";
import User from "@/types/User";

export default defineComponent({
    name: "user-menu",
    data() {
        return {
            currentIndex: -1,
            usersList: [] as User[],
        }
    },
    props: {
        owner: {
            type: Object as () => User,
            required: true,
        },
    },
    methods: {
        refreshList() {
            //let tmpList: [] as User[];
            let tmpList: Array<User>;

            UserDataService.getAll()
            .then((response : ResponseData) => {

                for (let index = 0; index < response.data.length; index++) {
                    if (response.data[index].id != this.owner.id){
                        this.usersList.push(response.data[index]);
                    }

                }
                //this.usersList = response.data;
                console.log("BURGER MENU | Refresh List");
            })
            .catch((e: Error) => {
                console.log("Burger Error: " + e);
            });
        }
    },
    mounted() {
        this.refreshList();
        console.log("Mount user list");
    },
});

</script>

<style media="screen">
.user-user-list {
    display: block;
    position: relative;
    margin: 0 auto;
    padding: 0 auto;
    width: 25%;
    max-width: 100%;
    animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

.user-user-list ul {
    list-style: none;
}

.user-user-list ul li {
    font-size: 24px;
    color: black;
    max-width: 512px;
}

.user-list-element {
    display: flex;
    flex-direction: row;
    text-align: left;
    width: 512px;
    height: 128px;
    margin: 12px;
    font-size: 14px;
}

.user-list-element img {
    width: 128px;
    border: 4px solid lightgreen;
    border-radius: 5px;
    background-color: rgb(40,40,40);
}

.user-list-element .list-user-info h4 {
    font-size: 24px;
    width: auto;
}

.user-list-element .list-user-info {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    position: relative;
    font-size: 16px;
}

.user-list-element .list-user-info .user-top {
    display: flex;
    flex-direction: row;
    height: auto;
    float: left;
}
.user-list-element .list-user-info .user-top .user-status {
    transform: translateY(45%);
    margin-left: 10px;
}

.user-list-element .list-user-info button {
    transform: translateY(-45%);
    width: 256px;
    font-size: 80%;
}

.btn-actif {
    background-color: lightgreen;
}

.btn-inactif {
    background-color: red;
}

</style>
