<template>
    <div :class="`you-${state}`">
        <img :src="`@/assets/${state}-icon.png`" />
        <img src="@/assets/loser-icon.png" />
        <img src="@/assets/winner-icon.png" />
        <div :class="`player-${state}`">
            <Avatar class="player-winner-img" :user="you" />
        </div>
    </div>
    <h1 v-if="state === 'winner'"> You Won !</h1>
    <h1 v-else> You Lost :(</h1>
    <div :class="`other-${state}`"> 
        <Avatar :user="other" />
        <p>{{other.userName}}</p>
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
    winner: {
      type: Object as () => User,
      required: true,
    },
    loser: {
      type: Object as () => User,
      required: true,
    },
  },
  data() {
    return {
        state: "" as string,
        you: {} as User,
        other: {} as User,
    }
  },
  mounted() {
      if (this.winner.id === Number(localStorage.getItem("user-id"))) {
        this.state = "winner";
        this.you = this.winner;
        this.other = this.loser;
      }
      else {
          this.state = "loser";
          this.you = this.loser;
          this.other = this.winner;
      }
  },
});
</script>

<style scoped>
.winner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.player-winner-img {
    width: 100px;
  height: 100px;
  border: 5px solid #11bf1d;
  border-radius: 100%;
}
.player-loser img {
  width: 100px;
  height: 100px;
  border: 5px solid red;
  border-radius: 100%;
}

[class|="other"] img {
  width: 50px;
  height: 50px;
  border: 5px solid;
  border-radius: 100%;
}
.other-winner img {
  border-color: red;
}
.other-loser img {
  border-color:  #11bf1d;
}
</style>
