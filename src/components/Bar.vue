<template>
  <div id="bar">
    <div id="bar-striplights">
    </div>
    <drinks-menu>
    </drinks-menu>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import DrinksMenu from './DrinksMenu.vue';

  export default
  { name: 'Bar'
  , components:
    { DrinksMenu
    }
  }
</script>
<style scoped>
  #bar
  {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 20%;
    background-color: #5a2b00;
    overflow: hidden;
  }

  #bar-striplights
  {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 35%;
    animation: bar-striplights 1.5s ease-in-out infinite alternate;
  }

  @keyframes bar-striplights
  { from 
    {
      box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #FF1177, 0 0 70px #FF1177, 0 0 80px #FF1177, 0 0 100px #FF1177, 0 0 150px #FF1177;
    }

    to
    {
      box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #FF1177, 0 0 35px #FF1177, 0 0 40px #FF1177, 0 0 50px #FF1177, 0 0 75px #FF1177;
    }
  }
</style>