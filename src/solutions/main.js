import EventBus from "solutions/event-bus"
import store from "store"

export default async function initialize() {
    EventBus.on('useDrink', index => {
        // TODO use drink with index
    });
}
