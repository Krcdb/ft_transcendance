<template>
  <div class="game-header">
      <div :class="`player-one ${isYou(player1.id)}`">
         <h1>{{ player1.userName }}</h1> 
          <Avatar :user="player1" />
      </div>
        <h1>VS</h1>
      <div :class="`player-two ${isYou(player2.id)}`">
          <Avatar :user="player2" />
         <h1>{{ player2.userName }}</h1> 

      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import User from "@/types/User";
import Avatar from "../users/Avatar.vue";

export default defineComponent({
  name: "Game Finished",
  components: {
    Avatar,
  },
  props: {
    player1: {
      type: Object as () => User,
      required: true,
    },
    player2: {
      type: Object as () => User,
      required: true,
    },
  },
  methods: {
      isYou(id: number): string | void {
          if (id === Number(localStorage.getItem("user-id")))
            return ("is-you");
      }
  },
  mounted() {
      console.log("game header");
  },
});
</script>

<style scoped>
.game-header {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
    gap: 20px;
}
[class|="player"] {
    display: flex;
}
.game-header img {
    width: 64px;
    height: 64px;
    margin: 5px;
    border: 2px solid #ddd;
    border-radius: 100%;
}
.is-you {
    color: black;
}
.is-you img {
    border: 4px solid  black;
}
</style>