<template>
  <div id="app">
    <div
      id="bg"
      :class="{blur:blurBackground}"
    ></div>
    <MainMenu
      v-if="!started" 
    ></MainMenu>
    <game
      v-if="started"
    >
    </game>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Main from 'solutions/main';
  import MainMenu from './components/MainMenu.vue';
  import Game from './components/Game.vue';

  export default
  { name: 'app'
  , components:
    { MainMenu
    , Game
    }
  , computed: mapState(
    { blurBackground: 'blurBackground'
    , started: 'started'
    })
  , methods:
    {
    }
  , mounted() { Main();
    }
  }
</script>
<style>
  #app
  {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0px;
    top: 0px;
  }

  #bg
  {
    position: absolute;
    left: -1%;
    top: -1%;
    width: 102%;
    height: 102%;
    background-image: url(./assets/images/bg.jpg);
    background-size: cover;
    background-position: 50%;
  }

  #bg.blur
  {
    filter: blur(10px);
  }
</style>
