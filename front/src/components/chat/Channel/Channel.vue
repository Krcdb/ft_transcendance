<template>
    <div class="channel-component">
        <div class="player-list">
            <ul>
                <li class="player-list-item" v-for="player in PlayerList" :key="player.id">
                    <Avatar :user="player" />
                    <div class="list-item-content">
                        <router-link class="profile-link" :to="'/users/' + player.id">
                            <h4>{{ player.userName }}</h4>
                        </router-link>
                    </div>
                    <div>
                        <div class="status-me" v-if="player.id == user.id">Me</div>
                        <div class="status-owner" v-if="player.id == channel.owner">
                            Owner
                        </div>
                        <div class="status-friend" v-if="user.friends.indexOf(player.id) !== -1">
                            Friend
                        </div>
                    </div>
                    <div class="user-state">
                        <div v-if="player.isActive" id="online-circle"></div>
                        <div v-else id="offline-circle"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="message-box">
            <h4>{{ channel.channelName }}</h4>
            <hr />
            <div class="messages">
                <ul ref="ScrollBar">
                    <li class="Plist-group-item" v-for="message in Messages" :key="message.id">
                    <MessageComponent :message="message" :userId="user.id" />
                </li>
            </ul>
        </div>
        <div class="send-messge-area">
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
            Send
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
            if (scrollBar)
                scrollBar.scrollTop = scrollBar.scrollHeight;

            console.log("Refresh CHannel");
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

<style scoped>
.channel-component {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
}
.player-list-item img {
    width: 64px;
    height: 64px;
    margin: 5px;
    border: 2px solid #ddd;
    border-radius: 100%;
}
.player-list ul {
    list-style: none;
    max-height: 800px;
    overflow-y: auto;
    margin: 0;
    padding: 0;
}
.player-list-item {
    display: flex;
    align-items: center;
    width: 350px;
    border: 2px solid #ddd;
    border-radius: 10px;
    margin: 5px;
}
.list-item-content {
    margin-left: 20px;
    margin-right: auto;
}
[class|="status"] {
    font-size: 15px;
    padding: 3px;
    margin-block: 2px;
    margin-inline: 10px;
    font-weight: bold;
}
.status-me {
    border: black solid 2px;
}
.status-owner {
    background-color: black;
    color: white;
}
.status-friend {
    background-color: #4bbd4b;
    color: white;
}
.profile-link {
    color: black;
    text-decoration: none;
}
.profile-link h4 {
    font-size: 18px;
    margin: 0;
}
.messages ul {
    height: 600px;
    width: 500px;
    padding: 0;
    list-style: none;
    margin-left: 3px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scroll-behavior: smooth;
}
.user-state {
    margin-inline: 5px;
}
.message-box {
    border: 1px solid black;
}
.message-box h4 {
    font-size: 20px;
    margin: 5px;
}
textarea {
    width: 95%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 10px;
    background-color: #f8f8f8;
    font-size: 15px;
    resize: none;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
