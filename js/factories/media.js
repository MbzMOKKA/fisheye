//Imports
import { mediaList } from '../utils/domLinker.js';
import { interractibleAddEventListener } from '../utils/keyboard.js';
import { createDomElement, createMediaDomElement } from '../utils/domGenerator.js';
import { mediaLightboxOpen } from '../utils/mediaLightbox.js';

//Return a media object
export function mediaFactory(data) {
    const { title, image, video, likes } = data;

    //console.log(data);
    const type = image == undefined ? 'video' : 'image';
    const displayedTitle = title;
    const displayedLikes = likes;
    const displayedSrc = type == 'video' ? `assets/medias/videos/${video}` : `assets/medias/images/${image}`;

    function getCardDOM() {
        const domParent = mediaList;
        const domCard = createDomElement('li', domParent);
        domCard.setAttribute('class', 'media_card');

        const domContentContainer = createDomElement('div', domCard);
        domContentContainer.setAttribute('class', 'media_content-container');
        domContentContainer.setAttribute('aria-label', displayedTitle);
        domContentContainer.setAttribute('tabindex', '0');
        interractibleAddEventListener(domContentContainer, () => {
            mediaLightboxOpen(domCard);
        });

        const domContent = createMediaDomElement(type == 'image' ? 'img' : 'video', displayedSrc, domContentContainer);
        domContent.setAttribute('class', 'media_content');

        const domBody = createDomElement('div', domCard);
        domBody.setAttribute('class', 'media_body');

        const domTitle = createDomElement('p', domBody);
        domTitle.setAttribute('class', 'media_title');
        domTitle.textContent = displayedTitle;

        const domLikes = createDomElement('div', domBody);
        domLikes.setAttribute('class', 'like_count');

        const domLikeCounter = createDomElement('p', domLikes);
        domLikeCounter.textContent = displayedLikes;

        const domLikeImg = createDomElement('img', domLikes);
        domLikeImg.setAttribute('src', 'assets/icons/like.svg');
        domLikeImg.setAttribute('alt', "J'aimes");
        domLikeImg.setAttribute('tabindex', '0');
    }
    return { getCardDOM, displayedTitle };
}
