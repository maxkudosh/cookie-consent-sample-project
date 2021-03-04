import { Cookie } from '../lib/cookie-consent-domain/cookie.js';

const firstCookie = new Cookie('De ce îl folosim', true);
const secondCookie = new Cookie('De unde pot sa-l iau şi eu', false);
const thirdCookie = new Cookie('Ce este Lorem Ipsum', false);
const appCookies = [
    firstCookie,
    secondCookie,
    thirdCookie
];

export { appCookies };
