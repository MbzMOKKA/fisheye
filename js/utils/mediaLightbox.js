//Imports
import { mediaLightbox, mediaPrevious, mediaNext, mediaClose, mediaTitle, pageBody, mediaContainer, mediaList } from './domLinker.js';
import { containerAddKeyboardClamping, interractibleAddEventListener } from '../utils/keyboard.js';
import { createMediaDomElement } from '../utils/domGenerator.js';

let mediaSelectedRef = null;

//Check if the media lightbox is opened or not
function mediaLightboxIsOpened() {
    return mediaLightbox.getAttribute('aria-hidden') == 'false';
}

//Show the media lightbox
export function mediaLightboxOpen(domCard) {
    mediaLightbox.show();
    pageBody.setAttribute('aria-hidden', 'true');
    pageBody.classList.add('no-scroll');
    mediaLightbox.setAttribute('aria-hidden', 'false');
    mediaClose.focus();
    mediaLightboxLoad(domCard);
}

//Load a media in the lightbox
function mediaLightboxLoad(domCard) {
    mediaSelectedRef = domCard;

    //Delete the current content DOM
    let domMedia = mediaContainer.querySelector('.lightbox_media');
    if (domMedia != null) {
        domMedia.parentElement.removeChild(domMedia);
    }
    //Get the new content infos
    const domCardContent = domCard.querySelector('.media_content');
    const domCardTitle = domCard.querySelector('.media_title');
    const src = domCardContent.getAttribute('src');
    const alt = domCardContent.parentElement.getAttribute('aria-label');
    const type = domCardContent.tagName;
    const title = domCardTitle.textContent;

    //Apply the infos to the new content DOM
    domMedia = createMediaDomElement(type, src, mediaContainer, alt, true);
    domMedia.setAttribute('class', 'lightbox_media');

    const domTitle = mediaLightbox.querySelector('.media_title');
    domTitle.textContent = title;
}

//Hide the media lightbox
function mediaLightboxClose() {
    mediaLightbox.close();
    pageBody.setAttribute('aria-hidden', 'false');
    pageBody.classList.remove('no-scroll');
    mediaLightbox.setAttribute('aria-hidden', 'true');
    //mediaSelectedRef.focus();
}

//Go to the previous or next media while using the lightbox
export function mediaNavigate(direction) {
    let domMediaToLoad;
    if (direction == 1) {
        //Next media
        domMediaToLoad = mediaSelectedRef.nextSibling;
        if (domMediaToLoad == null) {
            domMediaToLoad = mediaList.firstChild;
        }
    } else {
        //Previous media
        domMediaToLoad = mediaSelectedRef.previousSibling;
        if (domMediaToLoad == null) {
            domMediaToLoad = mediaList.lastChild;
        }
    }
    mediaLightboxLoad(domMediaToLoad);
}

//Add the event listeners related to the media viewer feature
export function mediaAddListeners() {
    interractibleAddEventListener(mediaClose, mediaLightboxClose);
    interractibleAddEventListener(mediaPrevious, () => {
        mediaNavigate(-1);
    });
    interractibleAddEventListener(mediaNext, () => {
        mediaNavigate(1);
    });
    document.addEventListener('keydown', (e) => {
        //Close the modal if escape is pressed
        const keyEscapeIsPressed = e.key === 'Escape';
        if (keyEscapeIsPressed && mediaLightboxIsOpened()) {
            contactClose.click();
        }
    });
    containerAddKeyboardClamping(mediaLightbox, '#media_prev, #media_next, #media_close');
}
