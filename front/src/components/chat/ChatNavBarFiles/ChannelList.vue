<template id="">
    <div class="container-fluid">
        <hr>
        <h4>Channel list</h4>

        <div class="no-channel" v-if="this.ChannelList.length <= 0">
            <h6>No channel found...</h6>
        </div>

        <div class="input-group mb-3 justify-content-center">
            <p>Rechercher un salon: <input type="text"
				placeholder="Search a channel..."
				v-model="this.search"
		        @input="searchhandler"
		        @change="searchhandler"
			></p>
        </div>

        <hr>

        <div class="container justify-content-center">
            <ul class="list-group">
                <li class="list-group-item" v-for="channel in filteredChannelList" :key="channel.id">

                    <div class="d-flex align-items-center" v-if="channel.isPublic">

                        <div class="row col-sm-2">
                            <p>{{ channel.channelName }}</p>
                            <img :src="`https://avatars.dicebear.com/api/jdenticon/${channel.channelName}.svg`" alt="" width="128">
                        </div>

                        <div class="row col-sm-4">
                            <p>Owner: {{ this.getUserByID(channel.owner).userName }} </p>
                            <!-- <p>Public Channel: {{ channel.isPublic ? "Yes" : "No"}}</p> -->
                        </div>

                        <div class="row col-sm-4">
                            <div v-if="!channel.password" class="password" >
                                <p>Password: <input id="password" type="password" name="password" value=""></p>
                            </div>
                            <!--    <router-link class="channel-link" :to="'/chat/channel/' + channel.channelName"> -->
                            <!-- <router-link class="channel-link" :to="{name: 'Channel',
                            params: {channel: channel, owner: this.owner}}"> -->
                            <button class="btn btn-secondary" style="margin: 15px;" :class="channel.isPublic ? 'btn-green' : 'btn-red'"
                            type="button" name="button"
                            @click="joinChannel(channel)">
                            Rejoindre</button>
                    <!--    </router-link> -->

                        <div class="col col-sm-12" v-if=" this.getUserByID(channel.owner).id === this.owner.id">
                            <button type="button" name="button" class="btn btn-danger"
                            @click="deleteChannel(channel)">Supprimer le salon</button>
                            <div class="p-auto mx-auto" style="margin: 15px;" v-if="this.isDeletingChannel">
                                <div class="spinner-border" role="status">
                                    <span class="sr-only"></span>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <br>
            <hr>
            <br>
        </li>
    </ul>
</div>

</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueRouter from 'vue-router'

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
			filteredChannelList: [] as Channel[],
            isDeletingChannel: false,
			search: "",
        };
    },
    props: {
        owner: {
            type: Object as () => User,
            required: true,
        },
    },
    methods: {
        async refreshChannelList() {
            ChannelDataService.getAllChannels()
            .then((response : ResponseData) => {
                this.ChannelList = response.data;
				this.filteredChannelList = response.data;
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
        async delay(ms: number) {
            return new Promise( resolve => setTimeout(resolve, ms) );
        },
        async deleteChannel(channel: Channel) {
            this.isDeletingChannel = true;
			await this.delay(500);
            ChannelDataService.deleteChannel(channel.channelName)
            .then((response : ResponseData) => {
                console.log("Channel Successfully deleted");
                this.refreshChannelList();
                this.isDeletingChannel = false;
            })
            .catch((e: Error) => {
                console.log("Error: " + e);
                this.isDeletingChannel = false;
            });
        },
		searchhandler() {
			this.filteredChannelList = this.ChannelList.filter((channel) =>
			channel.channelName.toLowerCase().includes(this.search.toLowerCase()));
		},
        joinChannel(channel : Channel) {
			let data = {
				password: channel.password,
			};
			ChannelDataService.canJoinChannel(channel.channelName, data)
			.then((response : ResponseData) => {
				console.log("Can join channel !");
				localStorage.setItem("channel-name", channel.channelName);
				this.$router.push("/Channel/" + channel.channelName);

				// todo ! nouvelle page channel avec en url le nom du channel et l'id de l'owner
				// puis dans le channel récupérer le nom et le channel en entier et le User avec l'owner
				// (voir code servane)

			})
            .catch((e: Error) => {
                console.log("Error: " + e);

            });
        },
    },
    mounted() {
        this.refreshChannelList();
    },
});
</script>

<style media="screen">
/*
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
*/

</style>
