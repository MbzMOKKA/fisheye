//Imports

//Prevents the keyboard focus to leave a container
function keyboardClampInputsInContainer(e, firstFocusableElement, lastFocusableElement) {
    const keyTabIsPressed = e.key === 'Tab';
    const keyShiftIsPressed = e.key === 'Shift';

    if (keyTabIsPressed) {
        if (keyShiftIsPressed) {
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

//Adds an event listener for clicking, pressing space, pressing enter
export function interractibleAddEventListener(domElement, callback) {
    domElement.addEventListener('click', callback);
    domElement.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            callback(e);
        }
    });
}

//Ajoute un event listener pour contenir le focus au clavier dans la modale de contact
export function containerAddKeyboardClamping(domContainer, focusableElements) {
    const focusableContent = domContainer.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];
    document.addEventListener('keydown', (e) => {
        keyboardClampInputsInContainer(e, firstFocusableElement, lastFocusableElement);
    });
    firstFocusableElement.focus();
}
