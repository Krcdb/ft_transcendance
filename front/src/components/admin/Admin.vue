<template>
  <div class="administration flex-container">
    <AdminUsersList class="flex-child" />
    <AdminChannelsList class="flex-child" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Avatar from "@/components/users/Avatar.vue";
import AdminChannelsList from "@/components/admin/AdminChannelsList.vue";
import AdminUsersList from "@/components/admin/AdminUsersList.vue";

export default defineComponent({
  name: "administration",
  components: {
    // Avatar,
    AdminChannelsList,
    AdminUsersList,
  },
});
</script>

<style scopped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.flex-child {
  flex: 1;
}
</style>
