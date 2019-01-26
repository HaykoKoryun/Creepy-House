import store from "store"

const randomFromArray = items => items[Math.floor(Math.random()*items.length)];

export default async function mainRoutin () {
    store.state.activeGuest = 
        randomFromArray(store.state.guests);
}