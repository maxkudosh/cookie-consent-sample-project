import { CookieConsent as CookieConsentModel } from '../../cookie-consent-domain/cookie-consent.js';

function ToggleableConsent(props) {
    const targetCookie = props.consent.cookie;
    const elementId = `${targetCookie.name}-consent`;

    const checkbox = React.createElement('input', {
        type: 'checkbox',
        id: elementId,
        name: elementId,
        checked: props.consent.isAllowed,
        disabled: targetCookie.isRequired,
        onChange: () => props.toggleConsent(props.consent)
    });

    const label = React.createElement('label', {
        htmlFor: elementId,
    }, targetCookie.name);

    return React.createElement(React.Fragment, null, checkbox, label);
}

ToggleableConsent.propTypes = {
    consent: PropTypes.instanceOf(CookieConsentModel).isRequired,
    toggleConsent: PropTypes.func.isRequired
};

export { ToggleableConsent };
