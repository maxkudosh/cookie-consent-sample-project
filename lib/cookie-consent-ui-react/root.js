import { CookieConsentProvider } from './containers/cookie-consent-provider.js';
import { ToggleableConsents } from './components/toggleable-consents.js';

function mountConsentUI(targetElement, cookieConsentManager) {
    const consentWindow = React.createElement(CookieConsentProvider, {
        consentManager: cookieConsentManager,
        childRenderer: (consents, toggleConsent, allowSelectedCookies) => {
            return React.createElement(ToggleableConsents, { consents, toggleConsent, allowSelectedCookies });
        }
    }, null);
    ReactDOM.render(consentWindow, targetElement);
}

function unmountConsentUI(targetElement) {
    ReactDOM.unmountComponentAtNode(targetElement);
}

export {
    mountConsentUI,
    unmountConsentUI
};
