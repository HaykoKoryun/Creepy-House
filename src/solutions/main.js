import EventBus from "solutions/event-bus"
import store from "store"

export default async function initialize() {
    EventBus.on('useDrink', index => {
        console.log('Drink used: ', index);
        // TODO use drink with index
    });
}
