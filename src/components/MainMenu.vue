<template>
  <div id="main-menu">
    <div
      id="start"
      @click="$store.commit('start');"
    >
      START
    </div>
  </div>
</template>
<script>
  export default
  { name: 'MainMenu'
  }
</script>
<style scoped>
  #main-menu
  {
    position: absolute;
    width: 500px;
    height: 500px;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
  }

  #start
  {
    font-size: 100px;
    font-weight: bold;
    color: #f00;
    letter-spacing: 10px;
    cursor: pointer;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;
    font-family: Creepster;
  }
</style>
