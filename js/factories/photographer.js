//Returns a photographer object
function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const container = document.createElement( 'li' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        container.appendChild(img);
        container.appendChild(h2);
        return (container);
    }
    return { name, picture, getUserCardDOM }
}