//Imports
import { photographerFactory } from '../factories/photographer.js';
import { getPhotographer, getMedia } from '../utils/apiCommunication.js';
import { photographerHeader, photographerInfos } from '../utils/domLinker.js';

//Display the photographer's infos on the photographer's profile page
function displayPhotographerInfos(photographer) {
    const photographerModel = photographerFactory(photographer);

    const domName = photographerInfos.querySelector('h2');
    const domLocation = photographerInfos.querySelector('.photographer_location');
    const domTagline = photographerInfos.querySelector('h3');
    const domThumbnail = photographerHeader.querySelector('.photographer_thumbnail-container img');

    domName.textContent = photographerModel.displayedName;
    domLocation.textContent = photographerModel.displayedLocation;
    domTagline.textContent = photographerModel.displayedTagline;
    domThumbnail.setAttribute('src', photographerModel.displayedPortrait);
}

//Initializing the page by loading the photographer's media and infos
async function init() {
    const id = new URL(document.location).searchParams.get('id');
    const photographer = await getPhotographer(id);
    const media = await getMedia(id);
    displayPhotographerInfos(photographer);
}

init();
