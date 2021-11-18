<template>
  <div class="matches-wrapper">
    <h3>Match History</h3>
    <div v-if="matches.length">
      <ul class="matches-list">
        <li
          v-for="matches in matches"
          :key="matches.matchId"
          class="matches-item"
        >
          <div class="matches-info">
            <div class="player-avatar">
              <Avatar :user="user" />
            </div>
            <div class="player-one">
              <p>{{ user.userName }}</p>
              <h4>{{ matches.scorePlayerOne }}</h4>
            </div>
            <p>-</p>
            <div class="player-two">
                <p>{{ user.userName }}</p>
                <h4>{{ matches.scorePlayerTwo }}</h4>
            </div>
            <div class="player-avatar">
              <Avatar :user="user" />
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
    };
  },
  methods: {
    getMatches(id: number) {
      UserDataService.getMatchHistory(id)
        .then((response: ResponseData) => {
          this.matches = response.data;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    console.log("user = ", this.user.userName);
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
[class|="matches-item"] {
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  margin: 3px;
}
.matches-info {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 60px;
}
[class|="player"] {
  display:flex;
  flex-direction: column;
  /* width: 90%; */
}
.matches-info p {
  margin: 0;
}
.matches-info h4 {
  margin: 0;
  font-size: 1.2em;
}
.player-avatar {
  width: 50px;
}
.matches-info img {
  border: 2px solid #ddd;
  border-radius: 100%;
  width: 50px;
  height: 50px;
}
</style>