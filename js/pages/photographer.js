//Imports
import { photographerFactory } from '../factories/photographer.js';
import { mediaFactory } from '../factories/media.js';
import { contactAddListeners } from '../utils/contactForm.js';
import { getPhotographer, getMedias } from '../utils/apiCommunication.js';
import { mediaAddListeners } from '../utils/mediaLightbox.js';
import { initCommon } from './common.js';

//Display the photographer's infos on the photographer's profile page
function displayPhotographerInfos(photographerModel) {
    const domName = document.querySelector('.photographer_name');
    const domLocation = document.querySelector('.photographer_location');
    const domTagline = document.querySelector('.photographer_tagline');
    const domPrice = document.querySelector('.photographer_price');
    const domThumbnail = document.querySelector('.photographer_thumbnail-container img');
    const domContactName = document.querySelector('#contact_modal header h1');

    domName.textContent = photographerModel.displayedName;
    domLocation.textContent = photographerModel.displayedLocation;
    domTagline.textContent = photographerModel.displayedTagline;
    domPrice.textContent = photographerModel.displayedPrice;
    domThumbnail.setAttribute('src', photographerModel.displayedPortrait);
    domThumbnail.setAttribute('aria-label', photographerModel.displayedName);
    domContactName.textContent = `Contactez-moi ${photographerModel.displayedName}`;
}

//Display the media uploaded by a photographer on his page
function displayMedias(medias) {
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        mediaModel.getCardDOM();
    });
}

//Initializing the page by loading the photographer's media and infos, and adding the proper event listener
async function initPhotographerPage() {
    const id = new URL(document.location).searchParams.get('id');
    const photographer = await getPhotographer(id);
    const medias = await getMedias(id);
    const photographerModel = photographerFactory(photographer);
    displayPhotographerInfos(photographerModel);
    photographerModel.displayTotalLikes(medias);
    displayMedias(medias);
    contactAddListeners();
    mediaAddListeners();
}

initCommon();
initPhotographerPage();
