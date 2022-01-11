<template id="burger-private-channel">
	<div
	:class="this.displayPrivateMessages == 1 ?
	'private-message' + (this.parentOpened == 1 ? ' opened' : '') :
	'private-message hidden' + (this.parentOpened == 1 ? ' opened' : '') "
	>


	<div class="private-channel-friend-list" v-if="this.FriendList.length">
		<h3>Private Messages</h3>
		<hr>
		<ul class="private-channel-nav-list">
			<li	v-for="friend in FriendList"  :key="friend">
				<div class="private-channel-hb-message">
					<button class="FriendAvatar" :to="'/users/' + friend.id" @click="pushToFriendProfile(friend)">
						<Avatar :user="friend" class="friend_image"/>
						<span class="links_name">{{ friend.userName }}</span>
					</button>
					<button type="button" name="button" class="SendMessageButton" @click="JoinPrivateChannel(friend)">SendMessage</button>
				</div>
			</li>
		</ul>
	</div>

	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ResponseData from "@/types/ResponseData";

import ChannelDataService from '@/services/ChannelDataService';
import Channel from "@/types/Channel";
import CreateChannel from "@/types/CreateChannel";

import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import Avatar from "@/components/users/Avatar.vue";

export default defineComponent({
	name: "private-message",
	data() {
		return {
        	FriendList: [] as User[],
			user: {} as User,

			NewChannel: {} as CreateChannel,
			channel: {} as Channel,

			channelKeys: [] as string[],
		}
	},
	components: {
		Avatar,
	},
	props: {
		userId: {
			type: Number,
			required: true,
		},
		displayPrivateMessages: {
			type: Boolean,
			required: true,
		},
		parentOpened: {
			type: Boolean,
			required: true,
		}
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
		pushToFriendProfile(friend: User) {
			this.$router.push("/users/" + friend.id);
		},
		async addUserChannel(channel : Channel) {
			const data = {
				user: this.userId as number,
				toAdd: true,
			};
			await ChannelDataService.updateChannelUser(this.channel.channelName, data)
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async getChannel(name: string) {
			console.log("getChannels private ");
			await ChannelDataService.getChannel(name)
			.then((response: ResponseData) => {
				this.channel = response.data.channel;
			})
			.catch((e: Error) => {
				console.log(e);
			});
		},
		async CreateChannel(channelName: string, channelPassword: string) {

			this.NewChannel.channelName = channelName;
			this.NewChannel.password = channelPassword;
			this.NewChannel.isPublic = false;

			if (this.NewChannel.channelName !== undefined) {
				let data = {
					channelName: this.NewChannel.channelName as string,
					password: this.NewChannel.password as string,
					isPublic: this.NewChannel.isPublic as boolean,
					owner: this.user.id as number,
				};

				ChannelDataService.createChannel(data)
				.then((response: ResponseData) => {
					localStorage.setItem("channel-pwd", this.NewChannel.password);
					this.$router.push("/Channel/" + this.NewChannel.channelName);
				})
				.catch((e) => {
					console.log("Error");
				});
			}
		},
		async JoinPrivateChannel(friendUser: User) {
			const current_password = "";

			this.channelKeys = [];

			this.channelKeys.push(this.user.id.toString());
			this.channelKeys.push(friendUser.id.toString());
			//this.channelKeys.push(this.user.userName);
			//this.channelKeys.push(friendUser.userName);

			this.channelKeys.sort((a, b) => (a < b ? -1 : 1));
			let channelName = this.channelKeys.toString();
			channelName = channelName.replace(',', '');

			console.log("ChannelName: " + channelName);

			await ChannelDataService.channelExist(channelName)
			.then(async (response : ResponseData) => {
				console.log('Channel exist: ' + response.data);
				if (response.data === false)
					await this.CreateChannel(channelName, "");
			})
			.catch((e) => {
				console.log('Error trying to search channel');
			})


			let data = {
				password: "",
			};

			await this.getChannel(channelName);
			await ChannelDataService.canJoinChannel(channelName, data)
			.then(async (response : ResponseData) => {
				if (this.channel.users.indexOf(this.userId) == -1) {
					await this.addUserChannel(this.channel);
				}
				localStorage.setItem("channel-pwd", current_password);
				this.$router.push("/Channel/" + this.channel.channelName);
			})
			.catch((e) => {
				console.log("Error: " + e.response.data.message + " | new attempt to create channel");
			});
		},
		async getFriends(id: number) {
			await UserDataService.getFriends(id)
			.then((response: ResponseData) => {
				this.FriendList = response.data;
				this.FriendList.sort((a, b) => (a.userName > b.userName ? -1 : 1));
				this.FriendList.sort((a, b) => (a.isActive && !b.isActive ? -1 : 1));
			})
			.catch((e: Error) => {
				console.log(e);
				console.log("Error !");
			});
		},
		async init() {
			this.getUser(Number(localStorage.getItem("user-id")));
			this.getFriends(Number(localStorage.getItem("user-id")));
		},
	},
	mounted() {
		this.init();
	}
})

</script>

<style media="screen">

.private-message {
    transition: all 0.25s ease;
	display: flex;
	position: fixed;
	background: #11101D;
	left: 106px;
	margin-top: 142px;
	z-index: 1;
	width: 270px;
	//height: calc(100% - 48%);
	height: 450px;
	opacity: 1;
	text-align: center;
	scroll-behavior: smooth;
	border-left: 2px solid white;
}

.hidden {
	left: 0px;
	opacity: 0;
    transition: all 0.25s ease;
}

.opened {
    transition: all 0.25s ease;
	margin-left: 172px;
}

.private-channel-nav-list {
	height: 80%;
	width: 100%;
	overflow-y: scroll;
	overflow-x: hidden;
	scroll-behavior: smooth;
	margin-left: -55px;
}

.friend_image {
    border-radius: 12px;
	width: 32px;
	height: 32px;
}

.private-channel-hb-message .FriendAvatar {
	background-color: rgba(0, 0, 0, 0);
}

.private-channel-hb-message .links_name {
	text-align: center;
	margin-left: 15px;
}

.private-channel-hb-message .SendMessageButton {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    background: #1d1b31;
}

.private-channel-friend-list h3, p {
	display: block;
	display: relative;
	color: white;
	font-size: 18px;
	text-align: center;
}

.private-channel-hb-message {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 48px;
	padding-bottom: 16px;
}

</style>
