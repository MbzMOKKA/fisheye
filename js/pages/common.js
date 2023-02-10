//Imports
import { logo } from '../utils/domLinker.js';
import { interractibleAddEventListener } from '../utils/keyboard.js';

//Init things that are in common in every page
export function initCommon() {
    interractibleAddEventListener(logo, () => {
        const link = logo.getAttribute('href');
        location.href = link;
    });
}
