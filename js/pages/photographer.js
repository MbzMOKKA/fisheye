//Imports
import { photographerFactory } from '../factories/photographer.js';
import { mediaFactory } from '../factories/media.js';
import { contactAddListeners } from '../utils/contactForm.js';
import { getPhotographer, getMedias } from '../utils/apiCommunication.js';
import { mediaAddListeners } from '../utils/mediaLightbox.js';
import { sortingSelected, sortingOptions, sortingSelectedName, mediaList } from '../utils/domLinker.js';
import { initCommon } from './common.js';
import { interractibleAddEventListener } from '../utils/keyboard.js';
import { sortingsToggle, sortingSelect } from '../utils/sortingList.js';

let medias = [];

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
export function displayMedias() {
    //Sort the medias
    let sortedMedias = JSON.parse(JSON.stringify(medias));
    switch (sortingSelectedName.textContent) {
        case 'Date':
            sortedMedias.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            break;
        case 'Popularité':
            sortedMedias.sort((a, b) => {
                return b.likes - a.likes;
            });
            break;
        case 'Titre':
            sortedMedias.sort((a, b) => {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
            break;
    }
    //Replace the content of the media list
    mediaList.textContent = '';
    sortedMedias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        mediaModel.getCardDOM();
    });
}

//Initializing the page by loading the photographer's media and infos, and adding the proper event listener
async function initPhotographerPage() {
    const id = new URL(document.location).searchParams.get('id');
    const photographer = await getPhotographer(id);
    medias = await getMedias(id);
    const photographerModel = photographerFactory(photographer);
    displayPhotographerInfos(photographerModel);
    photographerModel.displayTotalLikes(medias);
    displayMedias();
    contactAddListeners();
    mediaAddListeners();
    interractibleAddEventListener(sortingSelected, sortingsToggle);
    sortingOptions.forEach((option) => {
        interractibleAddEventListener(option, sortingSelect);
    });
}

initCommon();
initPhotographerPage();
