const CONSENT_ROOT_ID = 'cookie-consent';

class App {
    #consentManager
    #logger
    #domProvider
    #commitmentUnsubscriber
    #mountConsentUI
    #unmountConsentUI

    constructor(consentManager, logger, domProvider, consentCommitedEventDispatcher, mountConsentUI, unmountConsentUI) {
        this.#consentManager = consentManager;
        this.#logger = logger;
        this.#domProvider = domProvider;
        this.#mountConsentUI = mountConsentUI;
        this.#unmountConsentUI = unmountConsentUI;

        this.#commitmentUnsubscriber = consentCommitedEventDispatcher.subscribe((consents) => {
            this.logCookieConsent(consents);
            this.stopConsentLib();
        });
    }

    run() {
        this.runConsentLib();
    }

    getConsentRoot() {
        return this.#domProvider.getElementById(CONSENT_ROOT_ID);
    }

    runConsentLib() {
        const consentRootElement = this.getConsentRoot();
        this.#mountConsentUI(consentRootElement, this.#consentManager);
    }

    logCookieConsent(consents) {
        for (const consent of consents) {
            const consentText = consent.isAllowed ? 'allowed' : 'forbidden';
            const cookieName = consent.cookie.name;
            const displayMessageText = `Cookie ${cookieName} is ${consentText}`;
            this.#logger(displayMessageText);
        }
    }

    stopConsentLib() {
        const consentRootElement = this.getConsentRoot();
        this.#unmountConsentUI(consentRootElement);
        consentRootElement.textContent = "Your preferences have been saved.";
        this.#commitmentUnsubscriber();
    }
}

export { App };
