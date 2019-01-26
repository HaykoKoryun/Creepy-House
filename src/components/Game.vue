<template>
  <div id="game">
    <canvas id="canvas">
    </canvas>
    <bar>
    </bar>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Bar from './Bar.vue';

  export default
  { name: 'Game'
  , components:
    { Bar
    }
  }
</script>
<style scoped>
  #game
  {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }
</style>