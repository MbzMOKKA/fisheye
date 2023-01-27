//Fetches and returns the photographers data from the API (sample.json for now)
async function getPhotographers() {
    const apiURL = 'data/sample.json';
    let photographers = await fetch(apiURL);
    console.log(photographers)
    return photographers;
}

//Fills the photographer list with its content
async function displayData(photographers) {
    const photographersSection = document.querySelector("#photographer_list");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const photographerCardDOM = photographerModel.getUserCardDOM();
        console.log(photographerCardDOM)
        photographersSection.appendChild(photographerCardDOM);
    });
};

//
async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
};

init();

