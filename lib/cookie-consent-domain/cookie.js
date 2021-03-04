class Cookie {
    #name
    #isRequired

    get name() {
        return this.#name;
    }

    get isRequired() {
        return this.#isRequired;
    }

    constructor(name, isRequired) {
        this.#name = name;
        this.#isRequired = isRequired;
    }

    toJSON() {
        return {
            name: this.#name,
            isRequired: this.#isRequired
        };
    }
}

export { Cookie };
