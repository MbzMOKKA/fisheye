//Imports
import { sortingList, sortingExpandedList, sortingExpandedIcon, sortingOptions, sortingSelected, sortingSelectedName } from './domLinker.js';
import { displayMedias } from '../pages/photographer.js';

//Open the sorting list
export function sortingsToggle(e) {
    e.preventDefault();
    if (sortingList.getAttribute('aria-expanded') == 'false') {
        sortingList.setAttribute('aria-expanded', 'true');
        sortingExpandedList.setAttribute('aria-hidden', 'false');
        sortingExpandedIcon.setAttribute('src', 'assets/icons/arrow_up.svg');
    } else {
        sortingList.setAttribute('aria-expanded', 'false');
        sortingExpandedList.setAttribute('aria-hidden', 'true');
        sortingExpandedIcon.setAttribute('src', 'assets/icons/arrow_down.svg');
        sortingSelected.focus();
    }
}

//Select a sorting method
export function sortingSelect(e) {
    const prevsortingName = sortingSelectedName.textContent;
    const newsortingName = e.target.textContent;

    //Permute the new selected sorting with the previous one in the list
    sortingSelectedName.textContent = newsortingName;
    sortingOptions.forEach((option) => {
        if (option.textContent == newsortingName) {
            option.textContent = prevsortingName;
        }
    });

    //Apply the changes
    displayMedias();
    sortingsToggle(e);
}
