<template>
  <div class="list row">
    <div class="list-wrapper">
      <h3>Channels List</h3>
      <p> <i class="fas fa-eye"></i> Public / Private <i class="far fa-eye-slash"></i> </p>
      <p> <i class="fas fa-lock"></i> Protected / Not Protected <i class="fas fa-lock-open"></i> </p>
      <input
        type="text"
        placeholder="Search an channel..."
        v-model="keyword"
        @input="searchhandler"
      />
      <ul class="channel-list">
        <li class="channel-list-item" v-for="channel in channels" :key="channel.channelName">
          <div class="list-item-content">
            <router-link class="channel-link" :to="'/Channel/' + channel.channelName">
              <h4>{{ channel.channelName }}</h4>
              <img :src="`https://avatars.dicebear.com/api/jdenticon/${channel.channelName}.svg`">
            </router-link>
          </div>
          <button class="deletebtn" type="button" @click="deleteChannel(channel.channelName)"> Delete </button>
          <div class="public-status" v-if="channel.isPublic"> <i class="fas fa-eye"></i> </div>
          <div class="private-status" v-else> <i class="far fa-eye-slash"></i> </div>
          <div class="protected-status" v-if="channel.isProtected"> <i class="fas fa-lock"></i> </div>
          <div class="public-status" v-else> <i class="fas fa-lock-open"></i> </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChannelDataService from "@/services/ChannelDataService";
import Channel from "@/types/Channel";
import ResponseData from "@/types/ResponseData";
// import Avatar from "@/components/channels/Avatar.vue";

export default defineComponent({
  name: "admin-channels-list",
  components: {
    // Avatar,
  },
  data() {
    return {
      channels: [] as Channel[],
      // admins: [] as Channel[],
    //   owner: {} as Channel,
      filteredChannels: [] as Channel[],
      keyword: "",
    };
  },
  methods: {
    async retrieveChannels() {
      ChannelDataService.getAllChannels().then((response: ResponseData) => {
        this.channels = response.data;
        this.channels.sort((a, b) => (a.channelName > b.channelName ? 1 : -1));
        // if (localStorage.getItem("channel-name"))
        //   localStorage.removeItem("channel-name");
      })
      .catch((e: Error) => {
        console.log(e);
      });
    },
    searchhandler() {
      this.filteredChannels = this.channels.filter((channel) =>
        channel.channelName.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
    deleteChannel(channelName: string) {
      ChannelDataService.deleteChannel(channelName);
    }
  },
  async mounted() {
    await this.retrieveChannels();
  },
});
</script>

<style scopped>
.list-img img {
  width: 64px;
  height: 64px;
}
h3 {
  font-size: 30px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.list-wrapper {
  max-width: 400px;
  margin: auto;
}
.list-wrapper input[type="text"] {
  padding: 6px;
  font-size: 17px;
}
.profile-link {
  color: black;
  text-decoration: none;
  font-size: 18px;
  align-content: center;
}
.list {
  background-color: white;
  border-radius: 2px;
  list-style: none;
}
.list-item {
  display: flex;
  align-content: center;
  margin: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
}
.list-item-content {
  display: flex;
  margin-left: 20px;
  margin-right: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.channel-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.channel-list-item {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    border: 2px solid #ddd;
    border-radius: 10px;
    margin: 5px;
    padding: 10px;
    width: 100%;
}
.channel-status {
  margin-left: 5%;
  margin-right: 10%;
}
.channel-status .online {
  color: green;
}
.channel-status .offline {
  background-color: red;
}
.friend-status {
  background-color: #4bbd4b;
  font-weight: bold;
  color: white;
  padding: 5px;
  border-radius: 10px;
}
.me-status {
  background-color: black;
  font-weight: bold;
  color: white;
  padding: 5px;
  border-radius: 10px;
}
.admin-status {
  background-color: #2d9feb;
  font-weight: bold;
  color: white;
  padding: 5px;
  border-radius: 10px;
}
.owner-status {
  background-color: darkblue;
  font-weight: bold;
  color: white;
  padding: 5px;
  border-radius: 10px;
}
</style>
