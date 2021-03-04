class CookieConsentProvider extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = new CookieConsentProviderState([]);
    }

    componentDidMount() {
        const getConsentPromise = this.props.consentManager.getConsents();
        getConsentPromise.then(consents => this.setState(() => new CookieConsentProviderState(consents)));
    }

    allowSelectedCookies = async () => {
        const selectedCookies = await this.props.consentManager.allowSelectedCookies();
        this.setState(() => new CookieConsentProviderState(selectedCookies));
    }

    toggleConsent = (consent) => {
        const toggleConsentResult = this.props.consentManager.toggleConsent(consent);

        if (toggleConsentResult.isSuccessful) {
            const updatedConsents = toggleConsentResult.data;
            this.setState(() => new CookieConsentProviderState(updatedConsents));
        }
        else {
            this.setState((state) => new CookieConsentProviderState(state.consents));
        }
    }

    render() {
        const consentProvidedChild = this.props.childRenderer(this.state.consents, this.toggleConsent, this.allowSelectedCookies);

        return consentProvidedChild;
    }
}

CookieConsentProvider.propTypes = {
    consentManager: PropTypes.shape({
        getConsents: PropTypes.func.isRequired,
        toggleConsent: PropTypes.func.isRequired,
        allowSelectedCookies: PropTypes.func.isRequired
    }),
    childRenderer: PropTypes.func.isRequired
};

class CookieConsentProviderState {
    constructor(consents) {
        this.consents = consents;
    }
}

export { CookieConsentProvider };
