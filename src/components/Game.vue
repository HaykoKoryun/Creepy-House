<template>
  <div id="game">
    <canvas
      id="canvas"
      ref="canvas"
      :width="screenDimensions.width"
      :height="screenDimensions.height"
    >
    </canvas>
    <bar>
    </bar>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import * as PIXI from 'pixi.js';
  import Bar from './Bar.vue';

  export default
  { name: 'Game'
  , data: () => (
    { canvas: null
    , pixiApp: null
    , pixiLoader: null
    })
  , computed: mapState(
    { screenDimensions: 'screenDimensions'
    })
  , components:
    { Bar
    }
  , watch:
    { screenDimensions(newScreenDimensions)
      { const instance = this;

        /**
         * TODO: handle this better
         */
        const ratio = newScreenDimensions.width / 1920;

        instance.pixiApp.stage.scale.set(ratio, ratio);
      }
    }
  , async mounted()
    { const instance = this;
      instance.canvas = instance.$refs.canvas;

      const pixiApp = new PIXI.Application(
      { transparent: true
      , width: 1920
      , height: 1080
      , view: instance.canvas
      });

      instance.pixiApp = pixiApp;

      const loader = new PIXI.loaders.Loader();

      instance.pixiLoader = loader;

      loader.add('/assets/images/bg.jpg');
      loader.add('/assets/guests/babushka.png');

      await new Promise((resolve, reject) =>
      { loader.load(() =>
        { const sprite = PIXI.Sprite.fromImage('/assets/images/bg.jpg');
          
          pixiApp.stage.addChild(sprite);

          const bab = PIXI.Sprite.fromImage('/assets/guests/babushka.png');
          pixiApp.stage.addChild(bab);
          resolve();
        });
      });
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