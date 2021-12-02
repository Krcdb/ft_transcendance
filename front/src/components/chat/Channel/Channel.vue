<template>
    <div class="channel-component" v-if="!isLoading">
        <div class="player-list">
            <button 
                class="leave-btn"
			    type="button" 
                name="button"
			    @click="leaveChannel()"
            >
			    Leave
            </button>
            <router-link to="/Chat"><button 
                class="back-btn"
			    type="button" 
                name="button"
            >
			     Back to channels list <i class='bx bx-exit'></i>
            </button></router-link>
            <div class="ban-list" v-if="channel.banList.length && channel.admins.indexOf(user.id) !== -1">
                <select id="mon_select"  @change="onChange">
                    <option>Banned users</option>
                    <option
                        class="blocked-item"
                        v-for="banuser in banList"
                        :key="banuser.id"
                        :value="banuser.id"
                    >
                     {{ banuser.userName }}
                    </option>
                </select>
            </div>
            <ul>
                <li class="player-list-item" v-for="player in filteredPlayerList" :key="player.id">
                    <div class="user-state">
                        <div v-if="player.isActive" id="online-circle"></div>
                        <div v-else id="offline-circle"></div>
                    </div>
                    <Avatar :user="player" />
                    <div class="list-item-content">
                        <router-link class="profile-link" :to="'/users/' + player.id">
                            <h4>{{ player.userName }}</h4>
                        </router-link>
                    </div>
                    <div class="status-div">
                        <div class="status-owner" v-if="player.id == channel.owner">
                            Owner
                        </div>
                        <button
                            class="add-admin-btn"
                            v-if="user.id !== player.id && channel.admins.indexOf(user.id) !== -1 && channel.admins.indexOf(player.id) == -1 && player.id != channel.owner"
                            @click="updateAdmin(player.id, true)"
                        >
                            + Admin
                        </button>
                        <button
                            class="remove-admin-btn"
                            v-else-if="user.id !== player.id && channel.admins.indexOf(user.id) !== -1 && channel.admins.indexOf(player.id) !== -1 && player.id != channel.owner"
                            @click="updateAdmin(player.id, false)"
                        >
                            - Admin
                        </button>
                        <div class="status-admin" v-else-if="channel.admins.indexOf(player.id) !== -1 && player.id != channel.owner">
                            Admin
                        </div>
                        <button
                            class="mute-btn"
                            v-if="user.id != player.id && channel.admins.indexOf(user.id) !== -1 && player.id != channel.owner && channel.muteList.indexOf(player.id) == -1"
                            @click="updateMute(player.id, true)"
                        >
                            Mute
                        </button>
                        <button
                            class="mute-btn"
                            v-else-if="channel.admins.indexOf(user.id) !== -1 && player.id != channel.owner && channel.muteList.indexOf(player.id) != -1"
                            @click="updateMute(player.id, false)"
                        >
                            Unmute
                        </button>
                        <button
                            class="ban-btn"
                            v-if="user.id != player.id && channel.admins.indexOf(user.id) !== -1 && player.id != channel.owner && channel.banList.indexOf(player.id) == -1"
                            @click="updateBan(player.id, true)"
                        >
                            Ban
                        </button>
                        <div class="status-mute" v-if="channel.muteList.indexOf(player.id) != -1 && channel.admins.indexOf(user.id) == -1">
                            Muted
                        </div>
                        <div class="status-me" v-if="player.id == user.id">
                            Me
                        </div>
                        <div class="status-friend" v-if="user.friends.indexOf(player.id) !== -1">
                            Friend
                        </div>
                    </div>
                    <div class="start-game">
                        <button v-if="player.id != user.id && player.isActive" class="match-btn" @click="startMatch(player.id)">
                            <i class='bx bx-joystick'></i>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="message-box">
            <div class="box-name">
                <h4>{{ channel.channelName }}</h4>
            </div>
            <div class="messages">
                <ul ref="ScrollBar">
                    <li class="Plist-group-item" v-for="message in Messages" :key="message.id">
                        <!-- v-if="user.blockedUsers.indexOf(message.owner) == -1" -->
                    <MessageComponent  :message="message" :user="user" />
                </li>
            </ul>
        </div>
        <!-- v-if="channel.muteList.indexOf(user.id) == -1" -->
        <div v-if="channel.muteList && channel.muteList.indexOf(user.id) == -1" class="send-message-area">
            <textarea
            placeholder="Type your message here ..."
            v-model="currentMessage.message"
            ></textarea>
            <button
                type="button"
                name="button"
                class="send-btn"
                style="width: 75%"
                @click="SendMessage"
            >
            Send
            </button>
        </div>
        <div v-else class="mute-message-box">
            <h3>You have been muted by an Admin, you can't chat until unmuted</h3>
        </div>
    </div>
    </div>
    <div v-else>
        Loading...
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
import SocketServices from "../../../services/SocketServices"

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
            playerList: [] as User[],
            filteredPlayerList: [] as User[],
            banList: [] as User[],
            user: {} as User,
            channel: {} as Channel,
            Messages: [] as Message[],
            currentMessage: {} as Message,
            isLoading: {} as boolean,
        };
    },
    components: {
        MessageComponent,
        Avatar,
    },
    watch : {
		'$route': {
			handler: function() {
				socket.offAny();
			},
			deep: true,
			immediate: true,
		},
	},
    methods: {
        onChange(e: any) {
            if(e.target.options.selectedIndex > -1) {
                const value = Number((e.target.options[e.target.options.selectedIndex].value));
                this.updateBan(value, false);
        }
        },
        async startMatch(id: number) {
            socket.emit("matchUser", id);
        },
        async getAllPlayersInChannel() {
            await ChannelDataService.getAllUsersInChannel(this.channel.channelName)
            .then((response: ResponseData) => {
                this.playerList = response.data;
                this.filteredPlayerList = this.playerList.filter((player) => this.user.blockedUsers.indexOf(player.id) == -1);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        },
        async getBanList() {
            await ChannelDataService.getBanListUsers(this.channel.channelName)
            .then((response: ResponseData) => {
                this.banList = response.data;
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
            console.log("getChannels");
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
            if (this.channel.banList.indexOf(this.user.id) != -1) {
                this.$router.push("/chat");
            }
            else if (this.channel.users.indexOf(this.user.id) == -1) {
                const data = {
                    user: this.user.id as number,
                    toAdd: true,
                };
                await ChannelDataService.updateChannelUser(this.channel.channelName, data)
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
                    this.checkMessages(false);
                })
                .catch((e: Error) => {
                    console.log(e);
                    this.checkMessages(false);
                });
            }
        },
        async leaveChannel() {
            const data = {
                user: this.user.id as number,
                toAdd: false,
            };
            await ChannelDataService.updateChannelUser(this.channel.channelName, data)
            .then((response: ResponseData) => {
                console.log(response.data.message);
                this.$router.push("/Chat");
            })
            .catch((e: Error) => {
                console.log(e);
            });
        },
        async updateAdmin(playerId: number, toAdd: boolean) {
            const data = {
                user: playerId as number,
                toAdd: toAdd as boolean,
            };
            console.log("update admin");
            console.log("data = ", data);
            return await ChannelDataService.updateAdmin(this.channel.channelName, data)
            .then((response: ResponseData) => {
                console.log("Admin updated");
            })
            .catch((e: Error) => {
                // console.log(e);
                console.log("error update admin");
            });
        },
        async updateMute(playerId: number, toAdd: boolean) {
            const data = {
                user: playerId as number,
                toAdd: toAdd as boolean,
            };
            console.log("update mute");
            console.log("data = ", data);
            return await ChannelDataService.updateMuteList(this.channel.channelName, data)
                .then((response: ResponseData) => {
                    console.log("Mute updated");
                    console.log("response = ", response.data);
                    // this.$router.go(0);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        async updateBan(playerId: number, toAdd: boolean) {
            const data = {
                user: playerId as number,
                toAdd: toAdd as boolean,
            };
            console.log("update ban");
            console.log("data = ", data);
            return await ChannelDataService.updateBanList(this.channel.channelName, data)
                .then((response: ResponseData) => {
                    console.log("Ban updated");
                    console.log("response = ", response.data);
                })
                .catch((e: Error) => {
                    console.log("error ban");
                    console.log(e);
                });
        },
        async delay(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        async checkMessages(init: boolean) {
            this.isLoading = true;
            await this.getMessages();
            if (!init) {
                await this.getChannel(String(localStorage.getItem("channel-name")));
            }

            let scrollBar = (this.$refs.ScrollBar) as any;
            if (scrollBar)
                scrollBar.scrollTop = scrollBar.scrollHeight;

            console.log("Refresh messages");
            this.isLoading = false;
        },
        // async refreshChannel() {
        //     // this.$router.go(0);
        //     console.log("refresh...");
        // },
        async init() {
            this.isLoading = true;
            await this.getUser(Number(localStorage.getItem("user-id")));
            await this.getChannel(String(localStorage.getItem("channel-name")));
            await this.initChannel();
            await this.getMessages();
            await this.getAllPlayersInChannel();
            await this.checkMessages(true);
            await this.getBanList();
            this.isLoading = false;

            socket.emit('JoinChannel', this.channel.channelName);
            socket.on('refreshChannelMessages', (uuid: string) => {
                console.log('Init Socket ON: ' + uuid);
                this.checkMessages(true);
            });
        },
    },
    mounted() {
		SocketServices.connectGlobalSocketNotif(socket);
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
    margin-left: 10px;
    text-align: initial;
    width: 105px;
    margin-right: auto;
}
[class|="status"] {
    font-size: 15px;
    padding: 3px;
    margin-block: 2px;
    font-weight: bold;
}
.status-me {
    border: black solid 2px;
}
.status-owner {
    background-color: black;
    color: white;
}
.status-admin {
    background-color: gray;
    color: white;
}
.status-friend {
    background-color: #4bbd4b;
    color: white;
}
.status-mute {
    border: gray solid 2px;
    color: gray;
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
.messages {
    border-bottom: solid black 1px;
}
.user-state {
    margin-inline: 5px;
}
.message-box {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-block: 2px;
}
.message-box h4 {
    font-size: 20px;
    margin: 5px;
}
.send-message-area {
    width: 100%;
}
.send-message-area textarea {
    width: 95%;
    padding: 12px 20px;
    margin: 5px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 10px;
    background-color: #f8f8f8;
    font-size: 15px;
    resize: none;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
.send-btn {

}
.match-btn {
    background-color: white;
    color: black;
    margin: 0;
    padding: 0;
}
.match-btn i {
    border: solid black 2px;
    border-radius: 100%;
    padding: 5px;
    margin-right: 5px;
    font-size: 25px;
    /* width: 25px; */
    /* height: 25px; */
}
.start-game {
    width: 50px;
}
.status-div {
    width: 100px;
    margin: 0;
}
.status-div button {
    margin: 0;
    font-size: 15px;
    font-weight: bold;
    padding: 3px;
    width: 100%;
    border-radius: 10px;
    margin-block: 2px;
}
.add-admin-btn {
    color: grey;
    background-color: lightgray;
}
.remove-admin-btn {
    color: lightgray;
    background-color: grey;
}
.leave-btn,
.ban-btn {
    background-color: #f44336;
}
.mute-message-box {
    width: 350px;
    word-break: break-word;
}
.box-name {
    border-bottom:  1px solid black;
    width: 100%;
}
</style>
