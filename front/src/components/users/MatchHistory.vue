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
            <h4>{{ matches.playerOne }}</h4>
            <p>{{ matches.playerTwo }}</p>
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

export default defineComponent({
  name: "users-matches",
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
[class|="achievement-img"] {
  width: 20%;
  max-width: 50px;
  padding: 15px 10px;
  display: flex;
  align-items: center;
}
[class|="achievement-img"] img {
  width: 40px;
  height: 40px;
}

.achievement-img-user {
  background-color: #e6c7ff;
}

.achievement-img-relation {
  background-color: #b3f4ff;
}
.achievement-img-game {
  background-color: #faffb3;
}
.achievement-img-chat {
  background-color: #bdffb3;
}

.matches-info {
  text-align: initial;
  width: 100%;
  margin-left: 10px;
}
.matches-info p {
  margin: 0.1em;
  font-size: 0.8em;
  color: #999;
}
.matches-info h4 {
  margin: 0;
  font-size: 1.2em;
  /* font-size: 17px;; */
}
</style>