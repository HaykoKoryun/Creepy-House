<template>
  <div id="bar">
    <div id="bar-striplights-container">
      <div id="bar-striplights">
      </div>
    </div>
    <drinks-menu></drinks-menu>
    <drink-on-bar></drink-on-bar>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import DrinksMenu from './DrinksMenu.vue';
  import DrinkOnBar from './DrinkOnBar.vue';

  export default
  { name: 'Bar'
  , components:
    { DrinksMenu
    , DrinkOnBar
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
    height: 32%;
    background-image: url(../assets/images/bar.png);
  }

  #bar-striplights-container
  {
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 52%;
    overflow: hidden;
  }

  #bar-striplights
  {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 60%;
    animation: bar-striplights 1.5s ease-in-out infinite alternate;
    opacity: 0.3;
  }

  @keyframes bar-striplights
  { from 
    {
      box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #88f9cb, 0 0 70px #88f9cb, 0 0 80px #88f9cb, 0 0 100px #88f9cb, 0 0 150px #FF1177;
    }

    to
    {
      box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #88f9cb, 0 0 35px #88f9cb, 0 0 40px #88f9cb, 0 0 50px #88f9cb, 0 0 75px #88f9cb;
    }
  }
</style>