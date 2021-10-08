<template>
  <div id="nav">
    <img class="logo" align="left" src="./assets/pong_logo.png" />
    <router-link to="/">
      <img class="icon" src="./assets/home.png" />
    </router-link>
    <router-link to="/game">
      <img class="icon" src="./assets/game.png" />
    </router-link>
    <router-link to="/chat">
      <img class="icon" src="./assets/chat.png" />
    </router-link>
    <router-link to="/profile">
      <img class="icon" src="./assets/avatar.png" />
    </router-link>
    <router-link to="/users"> Users </router-link>
    <router-link to="/create-user"> Create User </router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo {
  margin: 10px 10px;
  max-width: 15%;
}

#nav {
  padding: 30px;
  overflow: hidden;
}

.icon {
  /* display: inline-block; */
  margin: 10px 10px;
  width: 100px;
  height: 100px;
  border: 2px solid black;
}

.logo {
  display: inline-block;
  margin: 10px 10px;
  max-width: 15%;
}

#nav a {
  /* margin: 10px 10px; */
  font-weight: bold;
  color: #2c3e50;
  float: left;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
