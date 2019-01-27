import Vue from 'vue'
import Vuex from 'vuex'

import Guest from "models/guest"

Vue.use(Vuex)

export default new Vuex.Store({
  state:
  { // TODO: change to false when finished
    started: false
  , dialog: ''
  , drinks: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  , guests: [new Guest(1),new Guest(1),new Guest(1),new Guest(1),new Guest(2),new Guest(2),new Guest(2),new Guest(3)]
  //, guests: [new Guest(1)]
  , activeGuest: null
  , time: 12
  , screenDimensions:
    { width: 0
    , height: 0
    }
  , drink: null
  , gameOver: false
  },
  mutations:
  { start(state)
    { state.started = true;
    }
  , updateSize(state, dimensions)
    { state.screenDimensions = dimensions;
    }
  , activeGuest(state, guest)
    { state.activeGuest = guest;
    }
  , leaveGuest(state, guest)
    { state.guests.splice(state.guests.indexOf(guest), 1);
    }
  , useDrink(state, drink)
    { 
      if(state.drink == null || drink == null) state.drink = drink;
    }
  , dialog(state, dialog)
    { state.dialog = dialog;
    }
  , changeTime(state) 
    { --state.time;
    }
  , gameOver(state)
    { state.gameOver = true;
    }
  },
  actions: 
  {
  }
})
