<template id="">
	<div class="container-fluid">
		<hr>
		<h4>Channel list</h4>

		<div class="no-channel" v-if="this.ChannelList.length <= 0">
			<h6>No channel found...</h6>
		</div>

		<div class="input-group mb-3 justify-content-center">
			<input type="text"
				placeholder="Search a channel..."
				v-model="search"
				@input="searchhandler"
			>
			</div>
			<div class="channel-info container justify-content-center">
				<ul class="channel-info list-group">
					<li class="list-group-item" v-for="(channel, index) in filteredChannelList" :key="channel.id">
						<div class="d-flex align-items-center" v-if="channel.isPublic">
							<div class="row col-sm-2">
								<h4>{{ channel.channelName }}</h4>
								<img :src="`https://avatars.dicebear.com/api/jdenticon/${channel.channelName}.svg`" alt="" width="128">
							</div>
							<div class="row col-sm-4">
                                <p>Owner</p>
                                <div class="mini-user-info" v-if="getOwnerByID(channel.owner)">

                                    <Avatar :user="getOwnerByID(channel.owner)" />
                                      <h4>{{ getOwnerByID(channel.owner).userName }}</h4>
								    <p class="public-tag" v-if="channel.isPublic">Public</p>
								    <p v-else class="private-tag">Private</p>
                                </div>
							</div>

							<div class="d-flex flex-column">

								<!-- PASSWORD -->
								<div class="d-flex flex-row">
                                    <form class="password-input">
                                        <input v-model="password[index]" :id="`password-${index}`" placeholder="password" type="password" autocomplete="on"> <!-- v-if="channel.password != null" -->
                                        <div class="alert alert-danger" role="alert" v-if="errorMSG[index]" style="height:52px;margin-left:12px;transform:translate(0, -20%)">
                                            <p>{{ errorMSG[index] }}</p>
                                        </div>
                                    </form>
								</div>

								<div class="d-flex flex-row">

									<button class="btn btn-secondary m-2" :class="channel.isPublic ? 'btn-green' : 'btn-red'"
									type="button" name="button"
									@click="joinChannel(channel, this.password[index], index)">
									Rejoindre</button>

									<div class="m-2" v-if="channel.owner === this.curenntUserId">
										<button type="button" name="button" class="btn btn-danger"
										@click="deleteChannel(channel)">Supprimer le salon</button>
										<div class="p-auto mx-auto" style="margin: 15px;" v-if="this.isDeletingChannel">
											<div class="spinner-border" role="status">
												<span class="sr-only"></span>
											</div>
										</div>
									</div>
									<div class="d-flex justify-content-center m-4" v-if="isLoading[index] === true">
										<div class="spinner-border" role="status">
											<span class="sr-only"></span>
										</div>
									</div>
								</div>
							</div>
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
            curenntUserId: {} as number,
            isDeletingChannel: false,
			search: "",
			errorMSG: [] as string[],
			password: [] as string[],
			isLoading: [] as boolean[],
        };
    },
    components: {
        Avatar,
    },
    methods: {
        async refreshChannelList() {
            await ChannelDataService.getAllPublicChannels()
            .then((response : ResponseData) => {
                this.ChannelList = response.data;
				this.filteredChannelList = response.data;
            })
            .catch((e: Error) => {
                console.log("Error: " + e);
            });
            await this.refreshOwnerList();
        },
        async refreshOwnerList() { 
            await ChannelDataService.getAllPublicChannelsOwners()
                .then((response : ResponseData) => {
                    this.OwnersList = response.data;
                })
                .catch((e: Error) => {
                    console.log("Error: " + e);
                });
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
        getOwnerByID(ownerId: number): User {
           return (this.OwnersList[this.OwnersList.map(x => x.id).indexOf(ownerId)]);
        },
    },
    mounted() {
        this.curenntUserId = Number(localStorage.getItem("user-id"));
        this.refreshChannelList();
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
}
.channel-info {
    border: 0;
}
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
