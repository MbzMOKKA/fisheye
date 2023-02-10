//Imports

//Prevent the keyboard focus to leave a container
function keyboardClampInputsInContainer(e, firstFocusableElement, lastFocusableElement) {
    const keyTabIsPressed = e.key === 'Tab';
    if (keyTabIsPressed) {
        if (e.shiftKey) {
            //Précédent (shift+tab)
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else {
            //Suivant (tab)
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }
}

//Add an event listener for clicking, pressing space, pressing enter
export function interractibleAddEventListener(domElement, callback) {
    domElement.addEventListener('click', (e) => {
        e.preventDefault();
        callback(e);
    });
    domElement.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            callback(e);
        }
    });
}

//Add an event listener to keep the focus inside of a container
export function containerAddKeyboardClamping(domContainer, focusableElements) {
    const focusableContent = domContainer.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];
    document.addEventListener('keydown', (e) => {
        keyboardClampInputsInContainer(e, firstFocusableElement, lastFocusableElement);
    });
    firstFocusableElement.focus();
}
