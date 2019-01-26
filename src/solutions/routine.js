import store from "store"

const sec = x => x * 1000;

const TIMEOUT_OF_GUESTS_WAIT_TIME = sec(10);

const randomFromArray = items => items[Math.floor(Math.random()*items.length)];

let timeout;

export async function chooseGuest () {
    store.state.activeGuest = randomFromArray(store.state.guests);
    store.state.activeGuest.activate();

    console.log('New guest entered: ', store.state.activeGuest);

    timeout = setTimeout(() => {
        store.state.activeGuest.yourNotGonnaGetIt();
        chooseGuest();
    }, TIMEOUT_OF_GUESTS_WAIT_TIME);
}

export async function cancelTimeout() {
    clearTimeout(timeout);
}