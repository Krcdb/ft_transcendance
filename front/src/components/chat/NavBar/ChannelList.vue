<template id="">
    <div class="channel-list">
        <h1>List des salons créés</h1>

        <div class="no-channel" v-if="this.ChannelList.length <= 0">
            <h4>Aucun salon créé...</h4>
        </div>

        <h4>Rechercher un salon: <input type="text" name="" value=""></h4>

        <ul class="channel-list-list">
            <li class="channel-list-element" v-for="channel in ChannelList" :key="channel.id">
                <!-- todo, v-if channel public -->
                <div class="channel-info-left">
                    <h4>{{ channel.channelName }}</h4>
                    <img :src="`https://avatars.dicebear.com/api/jdenticon/${channel.channelName}.svg`" alt="">
                </div>

                <div class="channel-info-center">

                    <h4>Propriétaire: {{ this.getUserByID(channel.owner).userName }} </h4>
                    <h5>Salon publique: {{ channel.isPublic ? "OUI" : "NON"}}</h5>
                    <!--{{ channel.password }}-->
                </div>


                <div class="channel-info-right">
                    <div class="buttons-join-channel">
                        <button class="btn" :class="channel.isPublic ? 'btn-green' : 'btn-red'"
                        type="button" name="button">Rejoindre</button>
                    </div>
                    <h5>Mot de passe: <input id="password" type="password" name="password" value=""> </h5>
                </div>
            </li>
        </ul>

        <h1>info !</h1>
        <ul>

            <li class="tmp" v-for="user in UserList" :key="user.id">
                <p>
                    {{ user.userName }} : {{ user.id }}
                </p>
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import User from "@/types/User";
import Channel from "@/types/Channel";


import UserDataService from '@/services/UserDataService';
import ChannelDataService from '@/services/ChannelDataService';
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: "channel-list",
    data() {
        return {
            UserList: [] as User[],
            ChannelList: [] as Channel[],
        };
    },
    props: {
        owner: {
            type: Object as () => User,
            required: true,
        },
    },
    methods: {
        refreshChannelList() {
            ChannelDataService.getAllChannels()
            .then((response : ResponseData) => {
                this.ChannelList = response.data;
            })
            .catch((e: Error) => {
                console.log("Error: " + e);
            });

            UserDataService.getAll()
            .then((response : ResponseData) => {
                this.UserList = response.data;
            })
            .catch((e: Error) => {
                console.log("Error: " + e);
            });
        },
        getUserByID(tosearch: number) {
            let user =  this.UserList.find(x => x.id == tosearch);
            return user;
        },
    },
    mounted() {
        this.refreshChannelList();
    },
});
</script>

<style media="screen">
.channel-list {
    display: block;
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 auto;
    animation: fadeIn 0.5s;
}

@keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
}

.channel-list-list {
    display: inline-block;
    width: 50%;
    margin: 0 auto;
}

.channel-list .no-channel {
    display: block;
    width: 25%;
    margin: 0 auto;
    background-color: orangered;
    color: white;
}

.channel-list .no-channel h4 {
    padding: 15px;
    text-transform: uppercase;
}

.channel-list-list .channel-list-element {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 25px;
    border-bottom: 3px solid black;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 192px;
}


.channel-list-list .channel-list-element .channel-info-left {
    display: flex;
    flex-direction: column;
    color: black;
    //background-color: yellow;
    margin: 0 auto;
    position: relative;
    text-align: center;
    height: 100%;
    justify-content: center;
    align-items: left;
}

.channel-list-list .channel-list-element .channel-info-center {
    display: flex;
    flex-direction: column;
    color: black;
    //background-color: red;
    margin: 0 auto;
    position: relative;
    text-align: left;
    height: 100%;
    justify-content: center;
    align-items: left;
}

.channel-list-list .channel-list-element .channel-info-right {
    display: flex;
    flex-direction: column;
    color: black;
    //background-color: blue;
    margin: 0 auto;
    position: relative;
    text-align: left;
    height: 100%;
    justify-content: center;
    align-items: left;
}

.channel-list-list .channel-list-element img {
    width: 128px;
    border: 4px solid lightgreen;
    border-radius: 5px;
    background-color: rgb(40,40,40);
}
.channel-list-list .channel-list-element h4 {
    font-size: 24px;
    width: auto;
    color: black;
}


.btn-green {
	background-color: lightgreen;
}
.btn-red {
    background-color: darkred;
}


</style>
