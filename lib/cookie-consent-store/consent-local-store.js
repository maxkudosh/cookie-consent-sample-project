class ConsentLocalStore {
    #localStorage
    #serializer
    #keyGenerator

    constructor(localStorage, serializer, keyGenerator) {
        this.#localStorage = localStorage;
        this.#serializer = serializer;
        this.#keyGenerator = keyGenerator;
    }

    getConsents() {
        const getConsentsSync = () => {
            const localStorageKey = this.#keyGenerator();
            const serializedConsents = this.#localStorage.getItem(localStorageKey);
            const consents = this.#serializer.deserialize(serializedConsents);

            return consents;
        };

        const getConsentsPromise = new Promise(resolve => {
            const consents = getConsentsSync();
            resolve(consents);
        });

        return getConsentsPromise;
    }

    saveConsents(consents) {
        const saveConsentsSync = () => {
            const localStorageKey = this.#keyGenerator();
            const serializedConsents = this.#serializer.serialize(consents);
            this.#localStorage.setItem(localStorageKey, serializedConsents);
        };

        const saveConsentsPromise = new Promise(resolve => {
            saveConsentsSync();
            resolve();
        });

        return saveConsentsPromise;
    }
}

export { ConsentLocalStore };
