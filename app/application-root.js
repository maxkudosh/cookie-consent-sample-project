import { EventDispatcher } from '../lib/event-dispatcher/event-dispatcher.js';

import { ConsentJsonSerialzier } from '../lib/cookie-consent-store/consent-json-serializer.js';
import { ConsentLocalStore } from '../lib/cookie-consent-store/consent-local-store.js';

import { ConsentManager } from '../lib/cookie-consent-foundation/consent-manager.js';
import { NotifyingConsentManager } from '../lib/cookie-consent-foundation/notifying-consent-manager.js';

import { mountConsentUI, unmountConsentUI } from '../lib/cookie-consent-ui-react/root.js';

import { App } from './app.js';
import { appCookies } from './app-cookies.js';

const localStorageKeyGenerator = () => 'this could be a user ID';
const jsonSerializer = new ConsentJsonSerialzier(window.JSON);
const consentStore = new ConsentLocalStore(window.localStorage, jsonSerializer, localStorageKeyGenerator);
const manager = new ConsentManager(appCookies, consentStore);
const consentCommitedEventDispatcher = new EventDispatcher();
const notifyingManager = new NotifyingConsentManager(manager, consentCommitedEventDispatcher);

const app = new App(notifyingManager, console.log, document, consentCommitedEventDispatcher, mountConsentUI, unmountConsentUI);

app.run();
