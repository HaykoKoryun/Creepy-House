import EventBus from "solutions/event-bus"
import Routine from "solutions/routine"
import store from "store"

export default async function initialize() {
    EventBus.on('useDrink', async index => {
        await Routine();
        console.log('Drink used: ', index);
        console.log(store.state.activeGuest);
        // TODO use drink with index
    });
}
