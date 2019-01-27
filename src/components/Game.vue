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
    , ticker: null
    , store: store
    })
  , computed: mapState(
    [ 'screenDimensions'
    , 'activeGuest'
    , 'dialog'
    , 'drink'
    , 'guests'
    ])
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

            sprite.scale.set(newGuest.size);

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
            instance.guestContainer.fadeInTween._object.brightness = 0.05;
            instance.guestContainer.alpha = 1;

            if(newGuest != oldGuest)
            { instance.guestContainer.fadeInTween.start();
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

              instance.guestContainer.fadeOutTween._object.brightness = 1;
              instance.guestContainer.fadeOutTween._object.alpha = 1;
              instance.guestContainer.fadeOutTween.start();
            }
          }
          , 2000
          );
        }
      }
    , guests(newGuests)
      { const instance = this;
        
        if(newGuests.length == 0)
        { instance.$store.commit('gameOver');
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

            const fadeInProps =
            { brightness: 0.05
            };

            const fadeOutProps =
            { brightness: 1
            , alpha: 1
            };
          
            const fadeInTween = new TWEEN.Tween(fadeInProps).to({brightness: 1}, 1500)
            .onUpdate(() =>
            { filter.brightness(fadeInProps.brightness, false);
            });

            guestContainer.fadeInTween = fadeInTween;

            const fadeOutTween = new TWEEN.Tween(fadeOutProps).to({brightness: 0.05, alpha: 0}, 1000)
            .onUpdate(() =>
            { filter.brightness(fadeOutProps.brightness, false);
              guestContainer.alpha = fadeOutProps.alpha;
            })
            .onComplete(guestLeave);

            guestContainer.fadeOutTween = fadeOutTween;
          }
          
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