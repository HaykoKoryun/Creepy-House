<template>
  <div id="app">
    <div
      v-if="started"
      id="bg"
    >
    </div>
    <div
      v-if="!started"
      id="start-bg"
    >
    </div>
    <video
      v-if="started && !gameOver"
      id="party-video"
      loop
      autoplay
    >
      <source src="assets/video/bg.webm" type="video/webm">
      <source src="assets/video/bg.mp4" type="video/mp4">
      <source src="assets/video/bg.ogg" type="video/ogg">
    </video>
    <MainMenu
      v-if="!started && !gameOver" 
    >
    </MainMenu>
    <game
      v-if="started && !gameOver"
    >
    </game>
    <div
      v-if="gameOver"
      id="gameOver"
    >
      YOU LOSE!!!
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import MainMenu from './components/MainMenu.vue';
  import Game from './components/Game.vue';

  export default
  { name: 'app'
  , components:
    { MainMenu
    , Game
    }
  , computed: mapState(
    [ 'started'
    , 'gameOver'
    ])
  , mounted()
    { const instance = this;

      instance.$store.commit('updateSize',
      { width: window.innerWidth
      , height: window.innerHeight
      });

      window.addEventListener('resize', () =>
      { instance.$store.commit('updateSize',
        { width: window.innerWidth
        , height: window.innerHeight
        });
      });
    }
  , methods:
    {
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
    font-family: 'Rock Salt', cursive;
  }

  #bg
  {
    position: absolute;
    left: -1%;
    top: -1%;
    width: 102%;
    height: 102%;
    background-image: url(./assets/images/bg.png);
    background-size: cover;
    background-position: 50%;
  }

  #start-bg
  {
    position: absolute;
    left: -1%;
    top: -1%;
    width: 102%;
    height: 102%;
    background-image: url(./assets/images/start.jpg);
    background-size: cover;
    background-position: 50%;
  }

  #party-video
  {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }

  #gameOver
  {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    color: #f00;
    font-family: Creepster;
    font-size: 200px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
