//Imports
import { createDomElement } from '../utils/domGenerator.js';
import formatPrice from '../utils/formatPrice.js';

//Returns a photographer object
export function photographerFactory(data) {
    const { name, portrait, city, country, id, price, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM(domParent) {
        const domCard = createDomElement('li', domParent);
        domCard.setAttribute('class', 'photographer_card');

        const domLink = createDomElement('a', domCard);
        domLink.setAttribute('href', 'photographer.html?id=' + id);
        domLink.setAttribute('aria-label', name);

        const domImgContainer = createDomElement('div', domLink);
        domImgContainer.setAttribute('class', 'image-container');

        const domImage = createDomElement('img', domImgContainer);
        domImage.setAttribute('src', picture);

        const domName = createDomElement('h2', domLink);
        domName.textContent = name;

        const domLocation = createDomElement('p', domCard);
        domLocation.setAttribute('class', 'photographer_location');
        domLocation.textContent = `${city}, ${country}`;

        const domTagline = createDomElement('h3', domCard);
        domTagline.textContent = `${tagline}`;

        const domPrice = createDomElement('p', domCard);
        domPrice.setAttribute('class', 'photographer_price');
        domPrice.textContent = formatPrice(price);
    }
    return { name, picture, getUserCardDOM };
}
