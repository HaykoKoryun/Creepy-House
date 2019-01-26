import Vue from 'vue'
import Vuex from 'vuex'

import Guest from "models/guest"

Vue.use(Vuex)

export default new Vuex.Store({
  state:
  { blurBackground: true
  , started: false
  , drinks: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  , guests: [new Guest(1),new Guest(1),new Guest(1),new Guest(1),new Guest(1),new Guest(1),new Guest(1),new Guest(1),new Guest(1)]
  , activeGuest: null
  , time: 12
  , screenDimensions:
    { width: 0
    , height: 0
    }
  },
  mutations:
  { start(state)
    { state.started = true;
    }
  , updateSize(state, dimensions)
    { state.screenDimensions = dimensions;
    }
  },
  actions: 
  {
  }
})
