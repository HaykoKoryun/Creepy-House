import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:
  { blurBackground: true
  , started: false
  },
  mutations:
  { start(state)
    { state.started = true;
    }
  },
  actions: 
  {
  }
})
