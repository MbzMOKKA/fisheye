//Imports
import { contactButton, contactModal, contactClose, contactSend, pageBody } from '../utils/domLinker.js';
import { containerAddKeyboardClamping, interractibleAddEventListener } from '../utils/keyboard.js';

//Checks if the contact modal is opened or not
function contactModalIsOpened() {
    return contactModal.parentElement.getAttribute('aria-hidden') == 'false';
}

//Prints the contact inputs to the console
function contactResultPrint(e) {
    e.preventDefault();
    const domInputFirstName = contactModal.querySelector('#contact_input_first-name');
    const domInputLastName = contactModal.querySelector('#contact_input_last-name');
    const domInputEmail = contactModal.querySelector('#contact_input_email');
    const domInputMessage = contactModal.querySelector('#contact_input_message');
    console.log(`Prénom : ${domInputFirstName.value}`);
    console.log(`Nom : ${domInputLastName.value}`);
    console.log(`Email : ${domInputEmail.value}`);
    console.log(`Message : ${domInputMessage.value}`);
}

//Shows the contact modal
function contactModalOpen() {
    contactModal.show();
    pageBody.setAttribute('aria-hidden', 'true');
    pageBody.classList.add('no-scroll');
    contactModal.parentElement.setAttribute('aria-hidden', 'false');
    contactClose.focus();
}

//Hides the contact modal
function contactModalClose() {
    contactModal.close();
    pageBody.setAttribute('aria-hidden', 'false');
    pageBody.classList.remove('no-scroll');
    contactModal.parentElement.setAttribute('aria-hidden', 'true');
    contactButton.focus();
}

//Adds the event listeners related to the contact feature
export function contactAddListeners() {
    interractibleAddEventListener(contactButton, contactModalOpen);
    interractibleAddEventListener(contactClose, contactModalClose);
    interractibleAddEventListener(contactSend, contactResultPrint);
    document.addEventListener('keydown', (e) => {
        //Closes the modal if escape is pressed
        const keyEscapeIsPressed = e.key === 'Escape';
        if (keyEscapeIsPressed && contactModalIsOpened()) {
            contactClose.click();
        }
    });
    containerAddKeyboardClamping(contactModal, '.contact_input, #contact_send, #contact_close');
}
