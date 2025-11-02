// Función para crear la estructura HTML de un personaje, necesita recibir un objeto "personaje"
function crearElementoPersonaje(Personaje) {
    const divPersonaje = document.createElement('div');
    divPersonaje.className = 'Personaje';

    const titulo = document.createElement('h2');
    titulo.className = 'titulo';
    titulo.textContent = Personaje.titulo;

    const sinopsis = document.createElement('p');
    sinopsis.textContent = Personaje.sinopsis;

    divPersonaje.appendChild(titulo);
    divPersonaje.appendChild(sinopsis);

    // Retorna un elemento div personaje
    return divPersonaje;
}

// Función asincrona recoger todos los datos del JSON
async function obtenerDatosJSON() {
    try {
        const respuesta = await fetch("./Personajes.json"); //await para esperar la respuesta del fetch, la ruta es relativa al html, no a este documento
        //const respuesta = await fetch("./../data/Personajes.json"); //await para esperar la respuesta del fetch, la ruta es relativa al html, no a este documento
        return await respuesta.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error al cargar los datos');
    }
}

// Función asíncrona para cargar cada pesonaje en la lista
async function cargarPersonajes() {
    try {
        // Selecciona el contenedor de los personajes
        const contenedor = document.getElementById("ListaPersonajess");

        // Recoge la respuesta de obtenerDatosJSON
       const datosPersonajes = await obtenerDatosJSON();

        // Por cada uno de los elementos del JSON, genera un elemento con crearElementoPersonaje()
        datosPersonajes.forEach(Personaje => {
            const elementoPersonaje = crearElementoPersonaje(Personaje);
            // Lo añade al contenedor principal
            contenedor.appendChild(elementoPersonaje);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

// Cargar los personajes cuando se cargue la página
window.addEventListener('load', cargarPersonajes);
