<template>
  <div class="game">
    <h1>This will be the Game page</h1>
    <br />
    <img src="../assets/pong_img.png" />
  </div>
  <div id="bar"></div>
</template>

// <script lang="js">
// export default {
//   const userBar = document.querySelector('#bar');

//   document.addEventListener('mousemove', ($event, userBar) => {
//     userBar.style.top = $event.y / window.innerHeight * 100 + "%";
//     console.log($event.y / window.innerHeight * 100 + "%");
//   });
// }


</script>

<style scoped>
img {
  max-width: 50%;
  height: auto;
}

#bar {
  background-color: grey;
  width: 20px;
  height: 150px;
  border: 3px solid black;
  border-color : black;
  position: absolute;
  left: 10%;
  top: 50%;
  /* text-align: center; */
}
</style>
