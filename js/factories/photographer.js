//Imports
import { photographerList } from '../utils/domLinker.js';
import { createDomElement } from '../utils/domGenerator.js';
import formatPrice from '../utils/formatPrice.js';

//Returns a photographer object
export function photographerFactory(data) {
    const { name, portrait, city, country, id, price, tagline } = data;

    const displayedName = name;
    const displayedPortrait = `assets/photographers/${portrait}`;
    const displayedLocation = `${city}, ${country}`;
    const displayedTagline = tagline;
    const displayedPrice = formatPrice(price);

    function getUserCardDOM() {
        const domParent = photographerList;
        const domCard = createDomElement('li', domParent);
        domCard.setAttribute('class', 'photographer_card');

        const domLink = createDomElement('a', domCard);
        domLink.setAttribute('href', 'photographer.html?id=' + id);
        domLink.setAttribute('aria-label', name);

        const domPortraitContainer = createDomElement('div', domLink);
        domPortraitContainer.setAttribute('class', 'photographer_thumbnail-container');

        const domPortrait = createDomElement('img', domPortraitContainer);
        domPortrait.setAttribute('src', displayedPortrait);

        const domName = createDomElement('h2', domLink);
        domName.textContent = displayedName;

        const domLocation = createDomElement('p', domCard);
        domLocation.setAttribute('class', 'photographer_location');
        domLocation.textContent = displayedLocation;

        const domTagline = createDomElement('h3', domCard);
        domTagline.textContent = displayedTagline;

        const domPrice = createDomElement('p', domCard);
        domPrice.setAttribute('class', 'photographer_price');
        domPrice.textContent = displayedPrice;
    }
    return { getUserCardDOM, displayedName, displayedPortrait, displayedLocation, displayedTagline, displayedPrice };
}
