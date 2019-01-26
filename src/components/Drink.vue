<template>
  <div id="drink" @click="use">
    <div class="icon" :style="iconStyle">
    </div>
    <p class="title">
      {{ drink.name }}
    </p>
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
    methods:
    { use()
      { const instance = this;
        instance.$store.commit('useDrink', instance.drink);
      }
    },
    computed: {
      iconStyle() {
        return `background-image: url("/assets/drinks-icons/${this.drink.image}.png")`;
      }
    }
  }
</script>
<style scoped>

  #drink
  {
    /* --drink-border-color: #757575;
    border-right: 2px solid var(--drink-border-color);
    border-left: 2px solid var(--drink-border-color);
    border-bottom: 4px solid var(--drink-border-color); */
    width: 180px;
    height: 150px;
    box-sizing: border-box;
    cursor: pointer;
    margin: 6px 12px;

    border-radius: 2px;
  }

  #drink .icon
  {
    width: 144px;
    height: 140px;
    background-size: cover;
  }

  .title {
    color: #fff;
    font-size: 12px;
  }
</style>