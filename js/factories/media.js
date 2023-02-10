//Imports
import { mediaList } from '../utils/domLinker.js';
import { createDomElement } from '../utils/domGenerator.js';

//Return a media object
export function mediaFactory(data) {
    const { title, image, video, likes } = data;

    //console.log(data);
    const type = image == undefined ? 'video' : 'image';
    const displayedTitle = title;
    const displayedLikes = likes;
    const displayedContent = type == 'video' ? `assets/medias/videos/${video}` : `assets/medias/images/${image}`;

    function getContentCardDOM() {
        const domParent = mediaList;
        const domCard = createDomElement('li', domParent);
        domCard.setAttribute('class', 'media_card');

        const domContentContainer = createDomElement('div', domCard);
        domContentContainer.setAttribute('class', 'media_content-container');
        domContentContainer.setAttribute('aria-label', displayedTitle);
        domContentContainer.setAttribute('tabindex', '0');
        domContentContainer.addEventListener('click', () => {
            console.log('MEDIA CLICKED');
        });

        const domContent = createDomElement(type == 'image' ? 'img' : 'video', domContentContainer);
        if (type == 'video') {
            domContent.setAttribute('loop', true);
            domContent.setAttribute('autoplay', true);
            domContent.setAttribute('muted', true);
        }
        domContent.setAttribute('src', displayedContent);
        domContent.setAttribute('draggable', false);

        const domBody = createDomElement('div', domCard);
        domBody.setAttribute('class', 'media_body');

        const domTitle = createDomElement('p', domBody);
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
    return { getContentCardDOM };
}
