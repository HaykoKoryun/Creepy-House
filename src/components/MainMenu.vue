<template>
  <div id="main-menu">
    <h1>Party 'til Dawn</h1>
    <div
      id="start"
      :on-click="$emit('start')"
    >
      START
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main-menu
  {
    position: absolute;
    font-family: 'Rock Salt', cursive;
    width: 500px;
    height: 500px;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
  }

  h1
  {
    color: #fff;
    font-size: 80px;
    line-height: 100px;
  }

  #start
  {
    font-size: 40px;
    font-weight: bold;
    color: #f0f;
    letter-spacing: 10px;
  }
</style>
