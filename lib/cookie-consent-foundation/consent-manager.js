import { replaceArrayItem } from '../immutable-utils/array-utils.js';

import { createFailedResult, createSuccessfulResult } from '../operation-result/operation-result.js'

import { CookieConsent } from '../cookie-consent-domain/cookie-consent.js';

import { ToggleConsentErrorTypes } from './toggle-consent-error-types.js';

class ConsentManager {
    #cookies
    #store
    #consents

    constructor(cookies, store) {
        this.#cookies = cookies;
        this.#store = store;
        this.#consents = [];
    }

    async getConsents() {
        const storedConsents = await this.#store.getConsents();
        this.#consents = storedConsents.length ? storedConsents : this.generateDefaultConsents();

        return this.#consents;
    }

    toggleConsent(targetConsent) {
        const desiredIsAllowed = !targetConsent.isAllowed;
        const isTogglingOffRequiredCookie = targetConsent.cookie.isRequired && !desiredIsAllowed;
        if (isTogglingOffRequiredCookie) {
            return createFailedResult(ToggleConsentErrorTypes.CANNOT_DISALLOW_REQUIRED_COOKIE);
        }

        const newCookieConsent = new CookieConsent(targetConsent.cookie, desiredIsAllowed);
        const replaceSelector = consent => consent === targetConsent;
        const updatedConsents = replaceArrayItem(this.#consents, replaceSelector, newCookieConsent);
        this.#consents = updatedConsents;
        const changedConsentResult = createSuccessfulResult(this.#consents);

        return changedConsentResult;
    }

    async allowSelectedCookies() {
        const selectedCookies = this.#consents;
        await this.#store.saveConsents(selectedCookies);

        return selectedCookies;
    }

    async allowAllCookies() {
        const allCookiesAllowed = this.#consents.map(consent => new CookieConsent(consent.cookie, true));
        await this.#store.saveConsents(allCookiesAllowed);
        this.#consents = allCookiesAllowed;

        return this.#consents;
    }

    async allowRequiredCookies() {
        const requiredCookiesAllowed = this.#consents.map(consent => new CookieConsent(consent.cookie, consent.cookie.isRequired));
        await this.#store.saveConsents(requiredCookiesAllowed);
        this.#consents = requiredCookiesAllowed;

        return this.#consents;
    }

    generateDefaultConsents() {
        return this.#cookies.map(cookie => {
            const defaultConsent = cookie.isRequired;
            const cookieConsent = new CookieConsent(cookie, defaultConsent);

            return cookieConsent;
        });
    }
}

export { ConsentManager };
