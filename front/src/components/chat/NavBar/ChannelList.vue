<template id="">
    <div class="channl-list">
        <h1>List des salons créés</h1>

        <ul>
            <li class="channel-list" v-for="channel in ChannelList" :key="channel.id">
                {{ channel.channelName }}
                {{ channel.isPublic }}
                {{ channel.password }}
                {{ channel.owner }}
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import User from "@/types/User";
import Channel from "@/types/Channel";


import ChannelDataService from '@/services/ChannelDataService';
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: "channel-list",
    data() {
        return {
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
                //console.log("Channel [0]" + response.data[0].channelName);
            })
            .catch((e: Error) => {
                console.log("Error: " + e);
            });
        }
    },
    mounted() {
        this.refreshChannelList();
    },
});
</script>

<style media="screen">

</style>
