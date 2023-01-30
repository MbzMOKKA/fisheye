//Fetches and returns the datas from the API (sample.json for now)
export async function getData() {
    let data = { photographers: [], media: [] };
    const apiURL = 'data/sample.json';
    let result = await fetch(apiURL);
    if (result.ok) {
        data = await result.json();
    }
    return data;
}

//Fetches and returns the datas of every photographers from the API
export async function getPhotographers() {
    const { photographers } = await getData();
    return photographers;
}

//Fetches and returns the datas of one photographer from the API
export async function getPhotographer(id) {
    const photographers = await getPhotographers();
    for (const p of photographers) {
        if (p.id == id) {
            return p;
        }
    }
    return null;
}

//Fetches and returns the datas of the medias uploaded by one photographer from the API
export async function getMedia(id) {
    const { media } = await getData();
    let photographerMedia = [];
    for (const m of media) {
        if (m.photographerId == id) {
            photographerMedia.push(m);
        }
    }
    return photographerMedia;
}
