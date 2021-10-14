<template>
  <nav class="navbar">
    <img class="logo" align="left" src="@/assets/pong_logo.png" />
    <ul class="main-nav">
      <li><router-link class="active" to="/">Home</router-link></li>
      <li><router-link to="/game">Game</router-link></li>
      <li><router-link to="/chat">Chat</router-link></li>
      <li><router-link to="/users">Users</router-link></li>
      <!-- <li ><router-link class="right" to="/create-user">Create User</router-link></li> -->
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  position: fixed;
  background-color: white;
  top: 0;
}
.logo {
  display: inline-block;
  object-fit: contain;
  max-width: 15%;
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
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: rgb(206, 206, 206);
  border-radius: 10px;
}

li a.router-link-exact-active {
  background-color: black;
  border-radius: 10px;
  color: white;
}
</style>
