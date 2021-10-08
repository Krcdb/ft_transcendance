<template>
  <nav class="navbar">
    <img class="logo" align="left" src="@/assets/pong_logo.png" />
    <ul class="main-nav">
      <li><router-link class="active" to="/">Home</router-link></li>
      <li><router-link to="/game">Game</router-link></li>
      <li><router-link to="/chat">Chat</router-link></li>
      <li><router-link to="/users">Users</router-link></li>
      <li class="push">
        <router-link class="right" to="/create-user">Create User</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  font-size: 2vmin;
}
.logo {
  display: inline-block;
  vertical-align: top;
  max-width: 15%;
  height: auto;
  margin-right: 20px;
  margin-top: 15px;
}
.navbar > a {
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

ul {
  list-style-type: none;
}

li {
  float: left;
  font-weight: bold;
}

li a {
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a.router-link-exact-active {
  background-color: black;
  border-radius: 10px;
  color: white;
}
</style>
