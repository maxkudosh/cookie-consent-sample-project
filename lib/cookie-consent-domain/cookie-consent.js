class CookieConsent {
    #cookie
    #isAllowed

    get cookie() {
        return this.#cookie;
    }

    get isAllowed() {
        return this.#isAllowed;
    }

    constructor(cookie, isAllowed) {
        if (!isAllowed && cookie.isRequired) {
            throw new Error('Required cookie cannot be disabled');
        }

        this.#cookie = cookie;
        this.#isAllowed = isAllowed;
    }

    toJSON() {
        return {
            cookie: this.#cookie,
            isAllowed: this.#isAllowed
        };
    }
}

export { CookieConsent };
