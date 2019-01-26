<template>
  <div id="app">
    <div
      id="bg"
      :class="{blur:blurBackground}"
    ></div>
    <MainMenu
      
    ></MainMenu>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MainMenu from './components/MainMenu.vue';

export default
{ name: 'app'
, components:
  { MainMenu
  }
, computed: mapState(
  { blurBackground: 'blurBackground'
  })
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
