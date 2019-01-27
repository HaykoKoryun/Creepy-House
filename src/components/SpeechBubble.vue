<template>
  <div
    id="speech-bubble"
  >
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="triangle"></div>
    <div class="name">
      {{ activeGuest.name }}
    </div>
    <div class="bubble">
      {{ dialog }}
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default
  { name: 'speech-bubble'
  , computed: mapState(
    [ 'activeGuest'
    , 'dialog'
    ])
  }
</script>
<style scoped>
  #speech-bubble
  {
    position: absolute;
    right: 200px;
    top: 100px;
    width: 500px;
    height: 100px;
  }

  .top
  {
    border-right: 0px solid transparent;
    border-left: 500px solid transparent;
    border-bottom: 60px solid #fff;
    position: absolute;
    top: -60px;
  }

  .bottom
  {
    border-left: 0px solid transparent;
    border-right: 505px solid transparent;
    border-top: 22px solid #fff;
    position: absolute;
    bottom: -62px;
  }

  .triangle
  {
    border-left: 0px solid transparent;
    border-right: 90px solid transparent;
    border-top: 50px solid #fff;
    position: absolute;
    bottom: -108px;
  }

  .bubble
  {
    background-color: #fff;
    height: 100%;
    text-align: center;
    padding: 20px;
  }

  .name
  {
    position: absolute;
    bottom: -160px;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    left: -100px;
    width: 200px;
    text-align: center;
  }
</style>