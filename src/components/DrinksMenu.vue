<template>
  <div id="drinks-menu">
    <drink
      v-for="(drink, index) in drinks"
      :key="index"
    >
    </drink>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Drink from './Drink.vue';

  export default
  { name: 'DrinksMenu'
  , components:
    { Drink
    }
  , computed: mapState(
    { drinks: 'drinks'
    })
  }
</script>
<style scoped>
  #drinks-menu
  {
    position: absolute;
    left: 0px;
    top: 35%;
    width: 100%;
    height: 75%;
    display: flex;
    justify-content: center;
  }
</style>