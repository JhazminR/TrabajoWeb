// ===================
// Catálogo de libros
// ===================
const libros = [
    {
        id: 1,
        titulo: "Cien Años de Soledad",
        autor: "Gabriel García Márquez",
        genero: "Realismo mágico",
        precio: 39.90,
        disponible: true,
        imagen: "img/cien-anos-de-soledad.jpg",
        wikipedia: "https://es.wikipedia.org/wiki/Cien_a%C3%B1os_de_soledad"
    },
    {
        id: 2,
        titulo: "1984",
        autor: "George Orwell",
        genero: "Distopía",
        precio: 29.90,
        disponible: true,
        imagen: "img/1984.jpg",
        wikipedia: "https://es.wikipedia.org/wiki/1984_(novela)"
    },
    {
        id: 3,
        titulo: "Orgullo y Prejuicio",
        autor: "Jane Austen",
        genero: "Romance",
        precio: 24.90,
        disponible: false,
        imagen: "img/orgulloyprejuicio.jpg",
        wikipedia: "https://es.wikipedia.org/wiki/Orgullo_y_prejuicio"
    },
    {
        id: 4,
        titulo: "El Hobbit",
        autor: "J. R. R. Tolkien",
        genero: "Fantasía",
        precio: 35.90,
        disponible: true,
        imagen: "img/El Hobbit.jpg",
        wikipedia: "https://es.wikipedia.org/wiki/El_hobbit"
    },
    {
        id: 5,
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        genero: "Fábula",
        precio: 19.90,
        disponible: true,
        imagen: "img/El Principito.jpg",
        wikipedia: "https://es.wikipedia.org/wiki/El_principito"
    },
    {
        id: 6,
        titulo: "La Sombra del Viento",
        autor: "Carlos Ruiz Zafón",
        genero: "Misterio",
        precio: 34.90,
        disponible: false,
        imagen: "img/La Sombra del Viento.jpg",
        wikipedia: "https://es.wikipedia.org/wiki/La_sombra_del_viento"
    }
];

// ==========================
// Mostrar libros en pantalla
// ==========================
function mostrarLibros(lista) {
    const contenedor = document.querySelector(".fila-libros");
    contenedor.innerHTML = "";

    lista.forEach(libro => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "columna columna-33";
        tarjeta.innerHTML = `
            <div class="tarjeta-libro">
                <img src="${libro.imagen || 'img/no-disponible.png'}" alt="${libro.titulo}">
                <h3>${libro.titulo}</h3>
                <p><strong>${libro.autor}</strong></p>
                <p>${libro.genero}</p>
                <p><strong>Precio:</strong> S/ ${libro.precio.toFixed(2)}</p>
                <p><strong>${libro.disponible ? "Disponible" : "No disponible"}</strong></p>
                <a href="${libro.wikipedia}" target="_blank" class="boton">Más detalles</a>
                ${libro.disponible ? `<a href="comprar.html?libro=${libro.id}" class="boton">Comprar</a>` : ""}
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// ==========================
// Estado actual de filtros
// ==========================
let textoBusqueda = "";
let tipoOrden = "";

// ==========================
// Función para filtrar y ordenar
// ==========================
function actualizarVista() {
    let resultados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(textoBusqueda) ||
        libro.autor.toLowerCase().includes(textoBusqueda) ||
        libro.genero.toLowerCase().includes(textoBusqueda)
    );

    switch (tipoOrden) {
        case "precioMayor":
            resultados.sort((a, b) => b.precio - a.precio);
            break;
        case "precioMenor":
            resultados.sort((a, b) => a.precio - b.precio);
            break;
        case "tituloAZ":
            resultados.sort((a, b) => a.titulo.localeCompare(b.titulo));
            break;
        case "tituloZA":
            resultados.sort((a, b) => b.titulo.localeCompare(a.titulo));
            break;
    }

    mostrarLibros(resultados);
}

// ==========================
// Eventos
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    mostrarLibros(libros); // Mostrar todos al inicio

    document.getElementById("inputBusqueda").addEventListener("input", function () {
        textoBusqueda = this.value.toLowerCase();
        actualizarVista();
    });

    document.getElementById("ordenar").addEventListener("change", function () {
        tipoOrden = this.value;
        actualizarVista();
    });
});
