function mostrarNoticiasAdmin() {

    const lista = document.getElementById("listaNoticias");

    if (!lista) return;

    lista.innerHTML = "";

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    noticias.forEach(function (noticia, index) {

        lista.innerHTML += `
        <article>
            <h3>${noticia.titulo}</h3>
            <p>${noticia.descripcion}</p>
            <img src="${noticia.imagen}" width="200">

            <br><br>

            <button type="button" onclick="editarNoticia(${index})">
                Editar
            </button>

            <button type="button" onclick="eliminarNoticia(${index})">
                Eliminar
            </button>

            <hr>
        </article>
        `;
    });
}

function mostrarNoticiasIndex() {

    const contenedor = document.getElementById("noticiasNuevas");

    if (!contenedor) return;

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    noticias.forEach(function(noticia) {

        contenedor.innerHTML += `
            <article>
                <h2>${noticia.titulo}</h2>
                <img src="${noticia.imagen}" width="300">
                <p>${noticia.descripcion}</p>
            </article>
        `;
    });
}

function eliminarNoticia(index) {

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    noticias.splice(index, 1);

    localStorage.setItem("noticias", JSON.stringify(noticias));

    mostrarNoticiasAdmin();
}

function editarNoticia(index) {

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    let noticia = noticias[index];

    document.getElementById("titulo").value = noticia.titulo;
    document.getElementById("descripcion").value = noticia.descripcion;
    document.getElementById("imagen").value = noticia.imagen;

    noticias.splice(index, 1);

    localStorage.setItem("noticias", JSON.stringify(noticias));

    mostrarNoticiasAdmin();
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}

document.getElementById("formNoticia").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];
    
    let noticia = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value
    };
    
    noticias.push(noticia);
    localStorage.setItem("noticias", JSON.stringify(noticias));
    
    document.getElementById("formNoticia").reset();
    mostrarNoticiasAdmin();
});

mostrarNoticiasIndex();
mostrarNoticiasAdmin();