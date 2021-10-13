<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <OwnerProfile />
    <GlobalChatInfo />
</template>

<script type="text/typescript">
import { defineComponent } from "vue";
import OwnerProfile from '@/components/chat/OwnerProfile.vue';
import GlobalChatInfo from '@/components/chat/GlobalChatInfo.vue';

export default defineComponent({
    name: "chat",
    components: {
        OwnerProfile,
        GlobalChatInfo
    },
});
</script>
