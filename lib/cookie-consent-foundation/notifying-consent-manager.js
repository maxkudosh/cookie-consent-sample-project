class NotifyingConsentManager {
    #decoratedManager
    #eventDispatcher

    constructor(decoratedManager, eventDispatcher) {
        this.#decoratedManager = decoratedManager;
        this.#eventDispatcher = eventDispatcher;
    }

    getConsents() {
        return this.#decoratedManager.getConsents();
    }

    toggleConsent(targetConsent) {
        return this.#decoratedManager.toggleConsent(targetConsent);
    }

    async allowSelectedCookies() {
        const consent = await this.#decoratedManager.allowSelectedCookies();

        this.#eventDispatcher.dispatch(consent);

        return consent;
    }

    async allowAllCookies() {
        const consent = await this.#decoratedManager.allowAllCookies();

        this.#eventDispatcher.dispatch(consent);

        return consent;
    }

    async allowRequiredCookies() {
        const consent = await this.#decoratedManager.allowRequiredCookies();

        this.#eventDispatcher.dispatch(consent);

        return consent;
    }
}

export { NotifyingConsentManager };
