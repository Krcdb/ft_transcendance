<template id="">
	<div class="channel-list-page">
		<h2>Public Channels list</h2>
		<div class="no-channel" v-if="this.ChannelList.length <= 0">
			<h6>You haven't joined any channels</h6>
		</div>
		<div class="channel-list-container">
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
					<div class="channel-owner">
                        <p>Owner</p>
                        <div class="mini-user-info" v-if="getOwnerByID(channel.owner)">
                            <Avatar :user="getOwnerByID(channel.owner)" />
                            <router-link class="profile-link" :to="'/users/' + channel.owner">
                                <h4>{{ getOwnerByID(channel.owner).userName }}</h4>
                            </router-link>
                        </div>
					</div>
                    <div class="property-tag">
                        <p class="public-tag" v-if="channel.isPublic">Public</p>
						<p v-else class="private-tag">Private</p>
                    </div>
					<div class="pass-btn-div">
						<!-- PASSWORD -->
                        <form class="password-input">
                            <input v-model="password[index]" :id="`password-${index}`" placeholder="password" type="password" autocomplete="off"> <!-- v-if="channel.password != null" -->
                            <p>{{ errorMSG[index] }}</p>
                        </form>
						<div class="btn-div">
							<button 
                                class="joined-btn"
							    type="button"
                                name="button"
							    @click="joinChannel(channel, this.password[index], index)"
                            >
							Open
                            </button>
                            <button 
                                class="delete-btn"
							    type="button" 
                                name="button"
							    @click="leaveChannel(channel)"
                            >
							    Leave
                            </button>
							<button type="button" name="button" class="delete-btn" v-if="channel.owner === user.id"
							@click="deleteChannel(channel, index)">Delete</button>
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

export default defineComponent({
    name: "channel-list",
    data() {
        return {
            OwnersList: [] as User[],
            ChannelList: [] as Channel[],
			filteredChannelList: [] as Channel[],
			search: "",
			errorMSG: [] as string[],
			password: [] as string[],
			isLoading: [] as boolean[],
        };
    },
    props: {
        user: {
            type: Object as () => User,
            required: true,
        },
    },
    components: {
        Avatar,
    },
    methods: {
        async refreshChannelList() {
            await ChannelDataService.getAllUserChannel(this.user.id)
            .then((response : ResponseData) => {
                this.ChannelList = response.data.channels;
                this.OwnersList = response.data.owners;
				this.filteredChannelList = response.data.channels;
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
    },
    mounted() {
        // this.curenntUserId = Number(localStorage.getItem("user-id"));
        this.refreshChannelList();
    },
});
</script>

<style media="screen">
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
.mini-user-info h4 {
    margin: 0;
}
.public-tag {
  background-color: #4bbd4b;
  font-weight: bold;
  color: white;
  padding: 5px;
  border-radius: 10px;
}
.private-tag {
  background-color: black;
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
.channel-name h3 {
    margin: 0;
}
.channel-name img {
    width: 100px;
}
.channel-owner p {
    margin: 0;
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
.channel-owner {
    width: 100px;
}
.pass-btn-div {
    width: 240px;
}
</style>