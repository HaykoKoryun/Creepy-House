import EventBus from "solutions/event-bus"
import {chooseGuest, cancelTimeout} from "solutions/routine"
import store from "store"

export default async function initialize() {
    chooseGuest();

    EventBus.on('useDrink', async drink => {
        console.log('Drink used: ', drink);

        store.state.activeGuest.useDrink(drink);
        
        await cancelTimeout();
        await chooseGuest();
    });
    
}
