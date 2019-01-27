<template>
  <div id="game">
    <div id="status-panel">
      {{ store.state.status }}
    </div>
    
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
  import Howler from 'howler';
  import TWEEN from '@tweenjs/tween.js';

  import Bar from './Bar.vue';
  import SpeechBubble from './SpeechBubble.vue';
  import assets from '../data/assets.js';
  import {init, guestLeave} from '../solutions/main.js';
  import store from 'store'

  export default
  { name: 'Game'
  , data: () => (
    { canvas: null
    , pixiApp: null
    , pixiLoader: null
    , guestContainer: null
    , drinkContainer: null
    , ticker: null
    , store: store
    })
  , computed: mapState(
    { screenDimensions: 'screenDimensions'
    , activeGuest: 'activeGuest'
    , dialog: 'dialog'
    , drink: 'drink'
    // , status: 'status'
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
    , activeGuest:
      { deep: true
      , handler(newGuest, oldGuest)
        { const instance = this;

          if(instance.guestContainer.children.length != 0)
          { instance.guestContainer.removeChildren();
          }

          if(newGuest)
          { const sprite =
              new PIXI.Sprite
              ( instance
                .pixiLoader
                .resources[`${newGuest.image}-${newGuest.mood}`]
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

            /**
             * Nasty hack!
             */
            instance.guestContainer.tween._object.brightness = 0.05;

            if(newGuest != oldGuest)
            { instance.guestContainer.tween.start();
            }
          }         
        }
      }
    , drink(newDrink)
      { const instance = this;
        if(newDrink)
        { instance.activeGuest.useDrink(newDrink.name);
          setTimeout(() =>
          { if(instance.activeGuest)
            { if(instance.activeGuest.satisfaction <= 0)
              { instance.$store.commit('leaveGuest', instance.activeGuest);
              }
              guestLeave();
            }
          }
          , 2000
          );
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

      instance.ticker = PIXI.ticker.shared;

      instance.ticker.add((time) =>
      { 
        TWEEN.update(instance.ticker.total); 
        store.state.status = `${store.state.time}AM. ${store.state.guests.length} Guests left`;
      });

      instance.pixiApp = pixiApp;

      const loader = new PIXI.loaders.Loader();

      instance.pixiLoader = loader;

      assets.forEach((asset) =>
      { loader.add(asset.key, asset.URL);
      });

      await new Promise((resolve, reject) =>
      { loader.load((loader, resources) =>
        { const guestContainer = new PIXI.Sprite();
          instance.guestContainer = guestContainer;

          pixiApp.stage.addChild(guestContainer);

          const filters = [];

          { const filter = new PIXI.filters.ColorMatrixFilter();
            filters.push(filter);
            filter.brightness
            (
              0.1,
              false
            );

            guestContainer.filters = filters;
            const props =
            { brightness: 0.05
            };
          
            const tween = new TWEEN.Tween(props).to({brightness: 1}, 1500)
            .onUpdate(() =>
            { filter.brightness(props.brightness, false);
            });

            guestContainer.tween = tween;
          }

          instance.drinkContainer = new PIXI.Sprite();
          pixiApp.stage.addChild(instance.drinkContainer);
          
          resolve();
        });
      })
      .then(() =>
      { const barMusic = new Howl
        ({
          src: '/assets/audio/bar-music.mp3'
        , format: ['mp3']
        });

        barMusic.on('load', function()
        {
          barMusic.play();
          barMusic.loop(true);
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

  #status-panel {
    color: #fff;
    position: absolute;
    left: 16px;
    top: 16px;
  }

  #guest-name {
    top: 100px;
  }

  #dialog {
    top: 140px;
  }
</style>