// Función para crear la estructura HTML de un libro, necesita recibir un objeto "libro"
function crearElementoLibro(libro) {
    const divLibro = document.createElement('div');
    divLibro.className = 'libro';

    const titulo = document.createElement('h2');
    titulo.className = 'titulo';
    titulo.textContent = libro.titulo;

    // const autor = document.createElement('p');
    // autor.className = 'autor';
    // autor.textContent = `Autor: ${libro.autor}`;

    // const genero = document.createElement('p');
    // genero.className = 'genero';
    // genero.textContent = `Género: ${libro.genero}`;

    const sinopsis = document.createElement('p');
    sinopsis.textContent = libro.sinopsis;

    // const precio = document.createElement('p');
    // precio.className = 'precio';
    // precio.textContent = `$${libro.precio.toFixed(2)}`;

    divLibro.appendChild(titulo);
    // divLibro.appendChild(autor);
    // divLibro.appendChild(genero);
    divLibro.appendChild(sinopsis);
    // divLibro.appendChild(precio);

    // Retorna un elemento div libro
    return divLibro;
}

// Función asincrona recoger todos los datos del JSON
async function obtenerDatosJSON() {
    try {
        const respuesta = await fetch("./libros.json"); //await para esperar la respuesta del fetch, la ruta es relativa al html, no a este documento
        //const respuesta = await fetch("./../data/libros.json"); //await para esperar la respuesta del fetch, la ruta es relativa al html, no a este documento
        return await respuesta.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error al cargar los datos');
    }
}

// Función asíncrona para cargar cada libro en la lista
async function cargarLibros() {
    try {
        // Selecciona el contenedor de los libros
        const contenedor = document.getElementById("lista-libros");

        // Recoge la respuesta de obtenerDatosJSON
       const datosLibros = await obtenerDatosJSON();

        // Por cada uno de los elementos del JSON, genera un elemento con crearElementoLibro()
        datosLibros.forEach(libro => {
            const elementoLibro = crearElementoLibro(libro);
            // Lo añade al contenedor principal
            contenedor.appendChild(elementoLibro);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

// Cargar los libros cuando se cargue la página
window.addEventListener('load', cargarPersonajes);