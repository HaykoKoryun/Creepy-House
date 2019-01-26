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
    <speech-bubble
      v-if="activeGuest"
    >
    </speech-bubble>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import * as PIXI from 'pixi.js';
  import Bar from './Bar.vue';
  import SpeechBubble from './SpeechBubble.vue';
  import assets from '../data/assets.js';
  import init from '../solutions/main.js';

  export default
  { name: 'Game'
  , data: () => (
    { canvas: null
    , pixiApp: null
    , pixiLoader: null
    , guestContainer: null
    , drinkContainer: null
    })
  , computed: mapState(
    { screenDimensions: 'screenDimensions'
    , activeGuest: 'activeGuest'
    , dialog: 'dialog'
    , drink: 'drink'
    })
  , components:
    { Bar
    , SpeechBubble
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
    , activeGuest(newGuest)
      { const instance = this;

        if(instance.guestContainer.children.length != 0)
        { instance.guestContainer.removeChildren();
        }

        if(newGuest)
        { const sprite =
            new PIXI.Sprite
            ( instance
              .pixiLoader
              .resources[`${newGuest.image}-normal`]
              .texture
            );

          sprite.scale.set(0.45);

          instance.guestContainer.addChild(sprite);

          instance.guestContainer.position.x = instance.canvas.width / 2;
          instance.guestContainer.position.y = instance.canvas.height - 280;

          instance.guestContainer.pivot = new PIXI.Point
          ( sprite.width / 2,
            sprite.height
          );
        }         
      }
    , drink(newDrink)
      { const instance = this;
        if(newDrink)
        { instance.activeGuest.useDrink(newDrink.name);
        }
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

      assets.forEach((asset) =>
      { loader.add(asset.key, asset.URL);
      });

      await new Promise((resolve, reject) =>
      { loader.load((loader, resources) =>
        { instance.guestContainer = new PIXI.Sprite();
          pixiApp.stage.addChild(instance.guestContainer);

          instance.drinkContainer = new PIXI.Sprite();
          pixiApp.stage.addChild(instance.drinkContainer);
          
          resolve();
        });
      });

      init(instance.$store);
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
  
  #guest-name, #dialog
  {
    position: absolute;
    left: 0px;
    right: 0px;
    font-weight: bold;
    color: #fff;
  }

  #guest-name {
    top: 100px;
  }

  #dialog {
    top: 140px;
  }
</style>