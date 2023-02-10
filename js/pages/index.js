//Imports
import { photographerFactory } from '../factories/photographer.js';
import { getPhotographers } from '../utils/apiCommunication.js';
import { initCommon } from './common.js';

//Fill the photographer list with its content
async function displayPhotographers(photographers) {
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        photographerModel.getCardDOM();
    });
}

//Initializing the page by loading the photographers
async function initIndexPage() {
    const photographers = await getPhotographers();
    displayPhotographers(photographers);
}

initCommon();
initIndexPage();
