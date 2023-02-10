//Create a new DOM element and adds it to the page
export function createDomElement(type, parent) {
    const elem = document.createElement(type);
    parent.appendChild(elem);
    return elem;
}
