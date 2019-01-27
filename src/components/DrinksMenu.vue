<template>
  <div id="drinks-menu">  
    <drink
      v-for="(drink, index) in drinks"
      :key="index"
      :drink="drink"
    ></drink>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import Drink from './Drink.vue'

  import drinks from 'data/drinks'

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
        // el.scrollTop += diffy;
    }
  }

  function onMouseUp (e) {
    if(drag) e.preventDefault();
    drag = false;
    if (!e) { e = window.event; }
    var start = 1,
        animate = function () {
            var step = Math.sin(start);
            if (step <= 0) {
                window.cancelAnimationFrame(animate);
            } else {
                el.scrollLeft += diffx * step;
                el.scrollTop += diffy * step;
                start -= 0.02;
                window.requestAnimationFrame(animate);
            }
        };
    animate();
  }

  export default
  { name: 'DrinksMenu'
  , components:
    { Drink
    }
  , data() {
      return {
        drinks
      }
    }
  , mounted() {
      const root = document.getElementById('drinks-menu');
      el = root;

      root.addEventListener('mousedown', onMouseDown);
      root.addEventListener('mousemove', onMouseMove);
      root.addEventListener('mouseup', onMouseUp);
      root.addEventListener('mouseleave', () => drag = false);
      window.addEventListener('mouseup', () => drag = false);
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
</style>