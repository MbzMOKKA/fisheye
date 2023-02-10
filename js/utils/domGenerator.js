//Create a new DOM element and adds it to the page
export function createDomElement(type, parent) {
    const elem = document.createElement(type);
    parent.appendChild(elem);
    return elem;
}

//Create a new DOM element (either an IMG or VIDEO) and adds it to the page
export function createMediaDomElement(type, src, parent, alt = '', showControlsOnVideo = false) {
    const elem = document.createElement(type);
    parent.appendChild(elem);
    elem.setAttribute('src', src);
    elem.setAttribute('alt', alt);
    elem.setAttribute('draggable', false);
    if (type.toLowerCase() == 'video') {
        elem.setAttribute('loop', true);
        elem.setAttribute('autoplay', true);
        elem.setAttribute('muted', true);
        if (showControlsOnVideo) {
            elem.setAttribute('controls', 'true');
        }
    }
    return elem;
}
