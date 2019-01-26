<template>
  <div id="drink">
    <div class="icon">
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default
  { name: 'Drink'
  }
</script>
<style scoped>
  #drink
  {
    border: solid 2px #fff;
    width: 100px;
    height: 130px;
    box-sizing: border-box;
    cursor: pointer;
    margin: 0px 5px;
  }

  #drink .icon
  {
    width: 96px;
    height: 100px;
    background-image: url(../assets/images/drink.jpg);
    background-size: contain;
  }
</style>