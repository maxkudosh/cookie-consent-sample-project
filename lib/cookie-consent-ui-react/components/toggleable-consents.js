import { CookieConsent } from '../../cookie-consent-domain/cookie-consent.js';

import { Button } from './button.js';
import { List } from './list.js';
import { ToggleableConsent } from './toggleable-consent.js';

function ToggleableConsents(props) {
    const itemRenderer = consent => React.createElement(ToggleableConsent, {
        consent,
        toggleConsent: props.toggleConsent
    });
    const keySelector = consent => consent.cookie.name;

    const consents = React.createElement(List, {
        itemRenderer,
        keySelector,
        items: props.consents
    });

    const commitButton = React.createElement(Button, { text: 'Allow selected cookies', onClick: props.allowSelectedCookies });

    return React.createElement(React.Fragment, null, consents, commitButton);
}

ToggleableConsents.propTypes = {
    consents: PropTypes.arrayOf(PropTypes.instanceOf(CookieConsent)).isRequired,
    toggleConsent: PropTypes.func.isRequired,
    allowSelectedCookies: PropTypes.func.isRequired
};

export { ToggleableConsents };
