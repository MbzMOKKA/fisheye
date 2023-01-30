//Imports

import { getPhotographer, getMedia } from '../utils/apiCommunication.js';

//Initializing the page by loading the photographer's media and infos
async function init() {
    const id = new URL(document.location).searchParams.get('id');
    const photographer = await getPhotographer(id);
    const media = await getMedia(id);
}

init();
