import Vue from 'vue'

const EventBus = new Vue();

EventBus.on = (event, handler) => {
    EventBus.$off(event);
    EventBus.$on(event, handler);
}

EventBus.emit = EventBus.$emit;

export default EventBus