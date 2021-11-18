<template>
  <div class="matches-wrapper">
    <h3>Match History</h3>
    <div v-if="matches.length && players.length">
      <ul class="matches-list">
        <li
          v-for="(match, index) in matches"
          :key="match.matchId"
          class="matches-item"
        >
            <div class="block-user-one">
              <div class="player-avatar">
                <Avatar v-if="match.playerOne === user.id" :user="user" />
                <Avatar v-else :user="players[index]" />
              </div>
              <div class="player-info-one">
                <p v-if="match.playerOne === user.id">{{ user.userName }}</p>
                <p v-else>{{ players[index].userName }}</p>
                <h4>{{ match.scorePlayerOne }}</h4>
              </div>
            </div>
            <div class="separator">-</div>
            <div class="block-user-two">
              <div class="player-info-two">
                <p v-if="match.playerTwo === user.id">{{ user.userName }}</p>
                <p v-else>{{ players[index].userName }}</p>
                <h4>{{ match.scorePlayerTwo }}</h4>
              </div>
              <div class="player-avatar">
                <Avatar v-if="match.playerTwo === user.id" :user="user" />
                <Avatar v-else :user="players[index]" />
              </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No matches :(</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import Match from "@/types/Match";
import ResponseData from "@/types/ResponseData";
import Avatar from "@/components/users/Avatar.vue";

export default defineComponent({
  name: "users-matches",
  components: {
    Avatar,
  },
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
  },
  data() {
    return {
      matches: [] as Match[],
      players: [] as User[],
    };
  },
  methods: {
    async getMatches(id: number) {
      UserDataService.getMatchHistory(id)
        .then((response: ResponseData) => {
          this.matches = response.data;
          this.getPlayers(id);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    async getPlayers(id: number) {
      UserDataService.getPlayersMatchHistory(id)
        .then((response: ResponseData) => {
          this.players = response.data;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getMatches(this.user.id);
  },
});
</script>

<style scopped>
.matches-wrapper {
  display: flex;
  flex-direction: column;
  width: 300px;
}
.matches-wrapper h3 {
  font-size: 20px;
}
.matches-list {
  list-style: none;
  padding: 0px;
  max-height: 300px;
  overflow-y: auto;
}
.matches-item {
  display: flex;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: space-between;
  margin: 3px;
  width: 98%;
}
.matches-item p {
  margin: 0;
}
.matches-item h4 {
  margin: 0;
  font-size: 1.2em;
}
.player-avatar {
  margin: 5px;
  /* width: 50px; */
}
.matches-item img {
  border: 2px solid #ddd;
  border-radius: 100%;
  width: 50px;
  height: 50px;
}
[class|="block-user"] {
  display: flex;
  width: 100%;
}
.block-user-two {
  display: flex;
  justify-content: flex-end;
}
[class|="player-info"] {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
}
</style>