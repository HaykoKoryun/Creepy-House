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
    <template
      v-if="waitingGuest"
    >
      <div id="guest-name">
        {{ waitingGuest.name }}
      </div>
    </template>
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
    , guestContainer: null
    })
  , computed: mapState(
    { screenDimensions: 'screenDimensions'
    , waitingGuest: 'waitingGuest'
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

      loader.add('/assets/images/bg.png');
      loader.add('/assets/guests/babushka.png');
      loader.add('/assets/guests/zombie.png');

      await new Promise((resolve, reject) =>
      { loader.load((loader, resources) =>
        { const bg = new PIXI.Sprite(resources['/assets/images/bg.png'].texture);
          
          pixiApp.stage.addChild(bg);

          const bab = new PIXI.Sprite(resources['/assets/guests/babushka.png'].texture)

          instance.guestContainer = new PIXI.Sprite();
          instance.guestContainer.addChild(bab);

          instance.guestContainer.position.x = instance.pixiApp.stage.width / 2;
          instance.guestContainer.position.y = instance.pixiApp.stage.height - 300;

          instance.guestContainer.pivot = new PIXI.Point
          ( bab.width / 2,
            bab.height
          );

          pixiApp.stage.addChild(instance.guestContainer);
          
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
  
  #guest-name
  {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 100px;
    font-weight: bold;
    color: #fff;
  }
</style>