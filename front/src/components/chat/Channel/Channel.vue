<template>
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
    />
    <div class="d-flex container">
        <div class="container">
            <div class="d-flex player-list">
                <div class="align-items-center">
                    <ul class="list">
                        <li class="list-item" v-for="player in PlayerList" :key="player.id">
                            <Avatar :user="player" />
                            <div class="list-item-content">
                                <router-link class="profile-link" :to="'/users/' + player.id">
                                    <h4>{{ player.userName }}</h4>
                                </router-link>
                                <div class="me-status" v-if="player.id == user.id">Me</div>
                                <div class="owner-status" v-if="player.id == channel.owner">
                                    Owner
                                </div>
                                <div class="friend-status" v-if="user.friends.indexOf(player.id) !== -1">
                                    Friend
                                </div>
                        </div>
                        <div class="user-status">
                            <div v-if="player.isActive" id="online-circle"></div>
                            <div v-else id="offline-circle"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="message-box container d-flex flex-column" id="my-message-box">
        <h4 class="mt-4">{{ channel.channelName }}</h4>
        <hr />
        <div class="Messages">
            <ul class="list-group" style="height: 512px" ref="ScrollBar">
                <li class="Plist-group-item" v-for="message in Messages" :key="message.id">
                <MessageComponent :message="message" :userId="user.id" />
            </li>
        </ul>
    </div>
    <div class="bottom">
        <hr />
        <textarea
        placeholder="Type your message here ..."
        v-model="currentMessage.message"
        ></textarea>
        <button
        type="button"
        name="button"
        class="btn btn-secondary m-2"
        style="width: 75%"
        @click="SendMessage"
        >
        Envoyer
    </button>
</div>
</div>
</div>
</template>

<script lang="ts">
//import Vue from "vue";
import { defineComponent } from "vue";
import User from "@/types/User";
import ChannelDataService from "@/services/ChannelDataService";
import UserDataService from "@/services/UserDataService";
import ResponseData from "@/types/ResponseData";
import Channel from "@/types/Channel";
import Message from "@/types/ChatMessage";
import MessageComponent from "./Message.vue";
// import VueSocketIO from "vue-socket.io";
import Avatar from "@/components/users/Avatar.vue";


import VueSocketIO from 'vue-socket.io';
import io from "socket.io-client";

const socket = io("http://localhost:3000", {
	auth: {
		token: localStorage.getItem('user-token'),
		userId: localStorage.getItem('user-id'),
		page: 'channel'
	}
});

export default defineComponent({
    data() {
        return {
            PlayerList: [] as User[],
            user: {} as User,
            channel: {} as Channel,
            Messages: [] as Message[],
            currentMessage: {} as Message,
        };
    },
    components: {
        MessageComponent,
        Avatar,
    },
    methods: {
        async getAllPlayersInChannel() {
            await ChannelDataService.getAllUsersInChannel(this.channel.channelName)
            .then((response: ResponseData) => {
                this.PlayerList = response.data;
            })
            .catch((e: Error) => {
                console.log(e);
            });
        },
        async getUser(id: number) {
            await UserDataService.get(id)
            .then((response: ResponseData) => {
                this.user = response.data;
            })
            .catch((e: Error) => {
                console.log(e);
            });
        },
        async getChannel(name: string) {
            await ChannelDataService.getChannel(name)
            .then((response: ResponseData) => {
                console.log("response = ", response.data);
                this.channel = response.data;
            })
            .catch((e: Error) => {
                console.log(e);
            });
        },
        async getMessages() {
            await ChannelDataService.getMessagesFromChannel(this.channel.channelName)
            .then((response: ResponseData) => {
                this.Messages = response.data;
            })
            .catch((e: Error) => {
                console.log(e);
            });
        },
        async initChannel() {
            console.log("name: " + this.channel.channelName);
            console.log("user ID: " + this.user.id);
            if (this.channel.users.indexOf(this.user.id) == -1) {
                const data = {
                    newUser: this.user.id as number,
                };
                await ChannelDataService.addChannelUser(this.channel.channelName, data)
                .then((response: ResponseData) => {
                    console.log(response.data.message);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
            }
            this.currentMessage.id = 0;
            this.currentMessage.owner = this.user.id;
            this.currentMessage.message = "";
        },
        async SendMessage() {
            console.log("Message = ", this.currentMessage);
            const data = {
                owner: this.currentMessage.owner as number,
                message: this.currentMessage.message as string,
            };
            if (this.currentMessage.message != "") {
                await ChannelDataService.sendMessageToChannel(
                    this.channel.channelName,
                    data
                )
                .then((response: ResponseData) => {
                    console.log("SendMessage: " + response.data);
                    socket.emit('sendMessage', this.channel.channelName);
                    this.currentMessage.message = "";
                    this.checkMessages();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
            }
        },
        async delay(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        async checkMessages() {

            await this.getMessages();

            let scrollBar = (this.$refs.ScrollBar) as any;
            scrollBar.scrollTop = scrollBar.scrollHeight;

            console.log("Refresh CHannel");


            // solution temporaire, utiliser les websockets, ça... c'est vraiment de la giga merde !
            //await this.getMessages();
            //this.delay(10000);
            //await this.checkMessages();
        },
        async init() {
            await this.getUser(Number(localStorage.getItem("user-id")));
            await this.getChannel(String(localStorage.getItem("channel-name")));
            await this.initChannel();
            await this.getMessages();
            await this.getAllPlayersInChannel();
            await this.checkMessages();

            socket.emit('JoinChannel', this.channel.channelName);
            socket.on('refreshChannelMessages', (uuid: string) => {
                console.log('Init Socket ON: ' + uuid);
                this.checkMessages();
            });
        },
    },
    mounted() {
        this.init();
    },
});
</script>

<style media="screen" scoped>
.container img {
    width: 64px;
    height: 64px;
    object-fit: contain;
}
.list {
    background-color: white;
    border-radius: 2px;
    list-style: none;
}
.player-list {
    position: relative;
    overflow-x: hidden;
}
.list-item-content {
    margin-left: 20px;
    margin-right: auto;
}
.me-status {
    border: black solid 2px;
    font-weight: bold;
    font-size: 12px;
    padding: 5px;
}
.owner-status {
    background-color: black;
    font-weight: bold;
    font-size: 12px;
    color: white;
    padding: 5px;
}
.friend-status {
    background-color: #4bbd4b;
    font-weight: bold;
    font-size: 12px;
    color: white;
    padding: 5px;
}
.profile-link {
    color: black;
    text-decoration: none;
    align-content: center;
}
.profile-link h4 {
    font-size: 18px;
}
.list-item {
    display: flex;
    align-content: center;
    padding-bottom: 5px;
    padding-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    align-items: center;
}
.user-status {
    margin-left: 5%;
    margin-right: 0%;
}

.list-group {
    overflow-y: auto;
    scroll-behavior: smooth;
}

.message-box {
    border: 1px solid black;
}
textarea {
    width: 95%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 10px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
}
</style>
