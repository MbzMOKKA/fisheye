//Imports
import { photographerFactory } from '../factories/photographer.js';
import { getPhotographers } from '../utils/apiCommunication.js';

//Fills the photographer list with its content
async function displayData(photographers) {
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        photographerModel.getUserCardDOM();
    });
}

//Initializing the page by loading the photographers
async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();
