<template id="">
	<div class="channel-list-page">
		<h2>Public Channels list</h2>
        <button class="reveal-btn" @click="revealElement('join-private'); hideElement('create-channel');">Join Private Channel</button>
        <button class="reveal-btn" @click="revealElement('create-channel'); hideElement('join-private');">Create Channel</button>
        <div id="join-private">
            <JoinPrivateChannel :userId="user.id"/>
        </div>
        <div id="create-channel">
            <CreateChannel :user="user"/>
        </div>
		<div class="no-channel" v-if="this.ChannelList.length <= 0">
			<h6>No channel found...</h6>
		</div>
		<div class="challen-list-container">
			<input type="text"
				placeholder="Search a channel..."
				v-model="search"
				@input="searchhandler"
			>
		</div>
		<div class="channel-list-div">
			<ul class="channel-list">
				<li class="channel-list-item" v-for="(channel, index) in filteredChannelList" :key="channel.channelName">
					<div class="channel-name">
						<h3>{{ channel.channelName }}</h3>
						<img :src="`https://avatars.dicebear.com/api/jdenticon/${channel.channelName}.svg`">
					</div>
					<div class="channel-owner" v-if="getOwnerByID(channel.owner)">
                        <div class="mini-user-info">
                            <p>Owner</p>
                            <Avatar :user="getOwnerByID(channel.owner)" />
                            <router-link class="profile-link" :to="'/users/' + channel.owner">
                                <h4>{{ getOwnerByID(channel.owner).userName }}</h4>
                            </router-link>
                        </div>
					</div>
                    <div v-else class="channel-owner">
                        <h4>No Owner</h4>
                        <p>The original owner left the channel</p>
					</div>
                    <div class="property-tag">
                        <p class="public-tag" v-if="channel.isPublic">Public</p>
                    </div>
					<div class="pass-btn-div">
						<!-- PASSWORD -->
                        <form class="password-input">
                            <input 
                                v-model="password[index]" 
                                :id="`password-${index}`" 
                                placeholder="password" 
                                type="password" 
                                autocomplete="off"
                            > <!-- v-if="channel.password != null" -->
                                <p>{{ errorMSG[index] }}</p>
                        </form>
						<div class="btn-div">
                            <button
                                v-if="channel.users.indexOf(user.id) != -1"
                                class="open-btn"
							    type="button" 
                                name="button"
							    @click="joinChannel(channel, this.password[index], index)"
                            >
							    Open
                            </button>
							<button
                                v-else
                                class="joined-btn"
							    type="button" 
                                name="button"
							    @click="joinChannel(channel, this.password[index], index)"
                            >
							    Join
                            </button>
                            <button 
                                v-if="channel.users.indexOf(user.id) != -1"
                                class="delete-btn"
							    type="button" 
                                name="button"
							    @click="leaveChannel(channel)"
                            >
							    Leave
                            </button>
								<button type="button" name="button" class="delete-btn" v-if="channel.owner === this.curenntUserId"
								    @click="deleteChannel(channel, index)">Delete
                                </button>
						</div>
					</div>
                    <div id="loader">
                        <div v-if="isLoading[index] === true" id="loader-wheel"></div>
                    </div>
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
import Avatar from "@/components/users/Avatar.vue";
import JoinPrivateChannel from "@/components/chat/NavBarFiles/JoinPrivateChannel.vue";
import CreateChannel from "@/components/chat/NavBarFiles/CreateChannel.vue";

export default defineComponent({
    name: "channel-list",
    data() {
        return {
            OwnersList: [] as User[],
            ChannelList: [] as Channel[],
			filteredChannelList: [] as Channel[],
            curenntUserId: {} as number,
            // isDeletingChannel: false,
			search: "",
			errorMSG: [] as string[],
			password: [] as string[],
			isLoading: [] as boolean[],
        };
    },
    components: {
        Avatar,
        JoinPrivateChannel,
        CreateChannel,
    },
    props: {
      user: {
          type: Object as () => User,
          required: true,
      },
    },
    methods: {
        async refreshChannelList() {
            await ChannelDataService.getAllPublicChannels()
            .then((response : ResponseData) => {
                this.ChannelList = response.data.channels;
                this.OwnersList = response.data.owners;
				this.filteredChannelList = this.ChannelList.filter((channel) => channel.banList.indexOf(this.user.id) == -1);
            })
            .catch((e: Error) => {
                console.log("Error: " + e);
            });
        },
        async delay(ms: number) {
            return new Promise( resolve => setTimeout(resolve, ms) );
        },
        async deleteChannel(channel: Channel, index: number) {
            this.isLoading[index] = true;
			await this.delay(500);
            ChannelDataService.deleteChannel(channel.channelName)
            .then((response : ResponseData) => {
                console.log("Channel Successfully deleted");
                this.refreshChannelList();
                this.isLoading[index] = false;
            })
            .catch((e: Error) => {
                console.log("Error: " + e);
                this.isLoading[index] = false;
            });
        },
		async searchhandler() {
			this.filteredChannelList = await this.ChannelList.filter((channel) =>
			  channel.channelName.toLowerCase().includes(this.search.toLowerCase()));
		},
        async joinChannel(channel : Channel, current_password: string, index: number) {
            this.errorMSG[index] = "";
			this.isLoading[index] = true;
			await this.delay(1000);
			console.log("Try to join channel, password: " + channel.password + " | current password: " + current_password);

			let data = {
                password: current_password,
			};

			ChannelDataService.canJoinChannel(channel.channelName, data)
			await ChannelDataService.getChannel(channel.channelName)
			.then((response : ResponseData) => {
                console.log("Can join channel: " + response.data.password);
				console.log("Password Match ?: " + response.data.password + " " + current_password);

				this.delay(1000);

				if (response.data.password == current_password) {
                    localStorage.setItem("channel-name", channel.channelName);
					this.$router.push("/Channel/" + channel.channelName);
				} else {
                    //
					if (response.data.password == null)
						this.errorMSG[index] = "This channel has no password";
					else
						this.errorMSG[index] = "Invalid password";
					this.isLoading[index] = false;
				}
			})
            .catch((e: Error) => {
                console.log("Error: " + e);
				this.errorMSG[index] = "Error: " + e;
				this.isLoading[index] = false;
            });
        },
        async leaveChannel(channel : Channel) {
            if (channel.users.indexOf(this.user.id) != -1) {
                const data = {
                    user: this.user.id as number,
                    toAdd: false,
                };
                await ChannelDataService.updateChannelUser(channel.channelName, data)
                .then((response: ResponseData) => {
                    console.log(response.data.message);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
            }
        },
        getOwnerByID(ownerId: number): User {
           return (this.OwnersList[this.OwnersList.map(x => x.id).indexOf(ownerId)]);
        },
        revealElement(id: string) {
            var x = document.getElementById(id);
            if (x && x.style.display === "none") {
                x.style.display = "block";
            } else if (x) {
                x.style.display = "none";
            }
        },
        hideElement(id:string) {
            var x = document.getElementById(id);
            if (x && x.style.display === "block") {
                x.style.display = "none";
            } 
        },
    },
    mounted() {
        this.curenntUserId = Number(localStorage.getItem("user-id"));
        this.refreshChannelList();
        this.revealElement('create-channel');
        this.revealElement('join-private');
    },
});
</script>

<style media="screen" scoped>
.mini-user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10%;
}
.mini-user-info.profile-link {
  color: black;
  text-decoration: none;
}

.mini-user-info img {
    border: 2px solid #ddd;
    border-radius: 100%;
    width: 50px;
    height: 50px;
}
.public-tag {
  background-color: #4bbd4b;
  font-weight: bold;
  color: white;
  padding: 5px;
  border-radius: 10px;
}
.channel-info {
    border: 0;
}
.channel-list {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.channel-list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border: 2px solid #ddd;
    border-radius: 10px;
    margin: 5px;
    padding: 10px;
    width: 70%;
}
.channel-name img {
    width: 100px;
}
.channel-name h3,
.channel-owner p,
.channel-owner h4,
.mini-user-info h4  {
    margin: 0;
}
.channel-owner {
    width: 100px;
}
.mini-user-info p{
    margin: 10px;
}
.channel-list-page input[type="text"],
.channel-list-page input[type="password"] {
  padding: 6px;
}
.password-input p {
    margin: 0;
    color: red;
}
.profile-link {
  color: black;
  text-decoration: none;
  font-size: 18px;
  align-content: center;
}
.delete-btn {
  background-color: #f44336;
}
#join-private {
  display: none;
  width: 70%;
  padding: 20px 0;
  text-align: center;
  background-color: lightgray;
  margin-inline: auto;
  margin-block: 20px;
}
#create-channel {
  display: none;
  width: 70%;
  padding: 20px 0;
  text-align: center;
  background-color: lightgray;
  margin-inline: auto;
  margin-block: 20px;
}
.reveal-btn, .joined-btn {
    color:black;
    background-color: lightgray;
    margin-bottom: 20px;
}
.pass-btn-div {
    width: 240px;
}
</style>
