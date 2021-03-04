class EventDispatcher {
    #subscribers = []

    subscribe(subscriber) {
        this.#subscribers.push(subscriber);

        const unsubscriber = () => {
            this.#subscribers = this.#subscribers.filter(s => s !== subscriber);
        }

        return unsubscriber;
    }

    dispatch(eventArgs) {
        for (const subscriber of this.#subscribers) {
            subscriber(eventArgs);
        }
    }
}

export { EventDispatcher };
