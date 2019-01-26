<template>
  <div id="drink" @click="use">
    <div class="icon">
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import EventBus from 'solutions/event-bus'

  export default
  { 
    name: 'Drink',
    props: {
      drink: {
        type: Object,
        default: () => {return {}}
      }
    },
    methods: {
      use() {
        EventBus.emit('useDrink', this.drink.name);
      }
    }
  }
</script>
<style scoped>

  #drink
  {
    --drink-border-color: #757575;
    border-right: 2px solid var(--drink-border-color);
    border-left: 2px solid var(--drink-border-color);
    border-bottom: 4px solid var(--drink-border-color);
    width: 120px;
    height: 100px;
    box-sizing: border-box;
    cursor: pointer;
    margin: 6px 12px;

    border-radius: 2px;
  }

  #drink .icon
  {
    width: 96px;
    height: 100px;
    background-image: url(../assets/images/drink.jpg);
    background-size: contain;
  }
</style>