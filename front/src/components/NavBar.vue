<template>
  <nav class="navbar">
    <div class="logo-wrapper">
      <img class="logo" src="@/assets/pong_logo.png" height="60" width="140" />
    </div>
    <div class="nav-wrapper">
      <ul>
        <li><router-link class="active" to="/">Home</router-link></li>
        <li><router-link to="/game">Game</router-link></li>
        <li><router-link to="/chat">Chat</router-link></li>
        <li><router-link to="/users">Users</router-link></li>
        <li><router-link to="/profile">My Profile</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* .navbar {
  display: flex;
  align-content: center;
  position: fixed;
  background: white;
  object-fit: contain;
  top: 0;
  height: 10%;
  width: 100%;
  left: 0;
} */
.navbar div {
  display: flex;
}

.logo-wrapper {
  float: left;
}

.nav-wrapper ul {
  list-style-type: none;
  display: flex;
  align-items: center;
}

.nav-wrapper li {
  float: left;
  font-weight: bold;
}

.nav-wrapper li a {
  /* display: block; */
  color: black;
  padding: 14px 16px;
  text-decoration: none;
}

.nav-wrapper li a:hover {
  background-color: rgb(206, 206, 206);
  border-radius: 10px;
}

.nav-wrapper li a.router-link-exact-active {
  background-color: black;
  border-radius: 10px;
  color: white;
}
</style>
