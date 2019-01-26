import EventBus from "solutions/event-bus"

import randomFromArray from '../common/randomFromArray';

const sec = x => x * 1000;
const TIMEOUT_OF_GUESTS_WAIT_TIME = sec(10);

let store;
let timeoutID = -1;

export default function init(_store)
{ store = _store;

  chooseGuest();

  // EventBus.on('useDrink', async drink => {
  //   console.log('Drink used: ', drink);

  //   store.state.activeGuest.useDrink(drink);
    
  //   await cancelTimeout();
  //   await chooseGuest();
  // });
}

function chooseGuest()
{ const guest = randomFromArray(store.state.guests);
  store.commit('activeGuest', guest);
  guest.activate();

  cancelTimeout();
  timeoutID = setTimeout(guestLeave, TIMEOUT_OF_GUESTS_WAIT_TIME);
}

function guestLeave()
{ store.commit('activeGuest', null);
  cancelTimeout();
  timeoutID = setTimeout(chooseGuest, 1000);
}

function cancelTimeout()
{ if(timeoutID != -1)
  { clearTimeout(timeoutID);
    timeoutID = -1;
  }
}