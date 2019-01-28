<template>
  <div
    v-if="drink" 
    id="drink-on-bar"
    :style="iconStyle"
  >
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default
  { name: 'drink-on-bar'
  , computed:
    { iconStyle()
      { return `background-image: url("assets/drinks-on-bar/${this.drink.image}.png")`;
      }
    , ...mapState(
      [ 'drink'
      ])
    }
  }
</script>
<style scoped>
  #drink-on-bar
  {
    position: absolute;
    left:0px;
    right: 0px;
    top: -350px;
    margin: auto;
    width: 445px;
    height: 509px;
    transform: scale3d(0.7, 0.7, 0.7);
  }
</style>