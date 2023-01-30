//Imports
import { contactButton, contactClose, contactModal } from './domLinker';

//Event listeners to open and close the contact modal
contactButton.addEventListener('click', toogleModal);
contactClose.addEventListener('click', toogleModal);

//Opens or closes the contact photographer modal depending on the current state
function toogleModal() {
    if (contactModal.style.display === 'none') {
        contactModal.style.display = 'block';
    } else {
        contactModal.style.display = 'none';
    }
}
