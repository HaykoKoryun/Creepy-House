import EventBus from "solutions/event-bus"

import randomFromArray from '../common/randomFromArray';

const sec = x => x * 1000;
const TIMEOUT_OF_GUESTS_WAIT_TIME = sec(10);

const ONE_HOUR = sec(60);

let store;
let timeoutID = -1;

export function init(_store)
{ store = _store;

  chooseGuest();
}

function chooseGuest()
{ const guest = randomFromArray(store.state.guests);
  store.commit('activeGuest', guest);
  guest.activate();

  cancelTimeout();
  timeoutID = setTimeout(guestLeave, TIMEOUT_OF_GUESTS_WAIT_TIME);
}

export function guestLeave()
{ if(store.state.drink === null) {
    store.state.activeGuest.yourNotGonnaGetIt();
    cancelTimeout();
    timeoutID = setTimeout(() => {
      store.commit('useDrink', -1);
      guestLeave();
    }, sec(4));
  } 
  else {
    store.commit('activeGuest', null);
    store.commit('useDrink', null);
    cancelTimeout();
    timeoutID = setTimeout(chooseGuest, 1000);
  }
}

function cancelTimeout()
{ if(timeoutID != -1)
  { clearTimeout(timeoutID);
    timeoutID = -1;
  }
}

setInterval(() => {
  store.commit('changeTime');
}, ONE_HOUR);