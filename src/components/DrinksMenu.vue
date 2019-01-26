<template>
  <div id="drinks-menu">
    <div class="edge"></div>
    
    <drink
      v-for="(drink, index) in drinks"
      :key="index"
      :index="index"
    ></drink>

    <div class="edge"></div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Drink from './Drink.vue';

  let startx, starty, diffx, diffy, drag, el;

  function onMouseDown(e) {
    if (!e) { e = window.event; }
    if (e.target && e.target.nodeName === 'IMG') {
        e.preventDefault();
    } else if (e.srcElement && e.srcElement.nodeName === 'IMG') {
        e.returnValue = false;
    }
    startx = e.clientX + el.scrollLeft;
    starty = e.clientY + el.scrollTop;
    diffx = 0;
    diffy = 0;
    drag = true;
  }

  function onMouseMove(e) {
    if (drag === true) {
        if (!e) { e = window.event; }
        diffx = (startx - (e.clientX + el.scrollLeft));
        diffy = (starty - (e.clientY + el.scrollTop));
        el.scrollLeft += diffx;
        el.scrollTop += diffy;
    }
  }

  function onMouseUp (e) {
    drag = false;
    // if (!e) { e = window.event; }
    // var start = 1,
    //     animate = function () {
    //         var step = Math.sin(start);
    //         if (step <= 0) {
    //             window.cancelAnimationFrame(animate);
    //         } else {
    //             el.scrollLeft += diffx * step;
    //             el.scrollTop += diffy * step;
    //             start -= 0.02;
    //             window.requestAnimationFrame(animate);
    //         }
    //     };
    // animate();
  }

  export default
  { name: 'DrinksMenu'
  , components:
    { Drink
    }
  , computed: mapState(
    { drinks: 'drinks'
    })
  , mounted() {
      const root = document.getElementById('drinks-menu');
      el = root;

      root.addEventListener('mousedown', onMouseDown);
      root.addEventListener('mousemove', onMouseMove);
      root.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mouseleave', () => drag = false);
    }
  }
</script>
<style scoped>
  @keyframes fade {
    from {opacity: 0; filter: brightness(0)}
    to {opacity: 1; filter: brightness(1)}
  }

  #drinks-menu
  {
    position: absolute;
    left: 10%;
    top: 43%;
    width: 80%;
    height: 50%;
    display: flex;
    /* justify-content: center; */

    overflow: hidden;

    padding-bottom: 16px;

    animation: fade 2s;
  }

  .edge {
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
</style>