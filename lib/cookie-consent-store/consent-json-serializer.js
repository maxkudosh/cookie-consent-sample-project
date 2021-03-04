import { Cookie } from '../cookie-consent-domain/cookie.js';
import { CookieConsent } from '../cookie-consent-domain/cookie-consent.js';

class ConsentJsonSerialzier {
    #jsonApi

    constructor(jsonApi) {
        this.#jsonApi = jsonApi;
    }

    serialize(consents) {
        const jsonConsents = this.#jsonApi.stringify(consents);

        return jsonConsents;
    }

    deserialize(jsonString) {
        const deserializedConsents = this.#jsonApi.parse(jsonString);

        if(!deserializedConsents) {
            return [];
        }

        const domainConsents = deserializedConsents.map(dc => {
            const cookie = new Cookie(dc.cookie.name, dc.cookie.isRequired);
            const consent = new CookieConsent(cookie, dc.isAllowed);

            return consent;
        });

        return domainConsents;
    }
}

export { ConsentJsonSerialzier };
