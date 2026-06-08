/* ========== MODO OSCURO ========== */
let botonOscuro = document.getElementById("bot-oscuro");
if (botonOscuro) {
  botonOscuro.addEventListener("click", (e) => {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
      botonOscuro.textContent = "☀️ Modo Claro";
      localStorage.setItem("tema", "dark");
    } else {
      botonOscuro.textContent = "🌙 Modo Oscuro";
      localStorage.setItem("tema", "light");
    }
  });
}

// Cargar tema guardado
const temaGuardado = localStorage.getItem("tema");
if (temaGuardado === "dark") {
  document.body.classList.add("dark-mode");
  if (botonOscuro) botonOscuro.textContent = "☀️ Modo Claro";
}

/* ========== BOTÓN LOGIN ========== */
let btnLoguearse = document.getElementById("btnLoguearse");
if (btnLoguearse) {
  btnLoguearse.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

/* ========== CARGAR DÓLAR HOY ========== */
async function cargarDolar() {
  try {
    const response = await fetch("https://api.bluelytics.com.ar/json/blue");
    const data = await response.json();
    const dolarDiv = document.querySelector(".dolarhoy");
    
    if (dolarDiv && data.blue) {
      dolarDiv.innerHTML = `💵 Dólar: $${data.blue.value_buy} (Compra) / $${data.blue.value_sell} (Venta)`;
    }
  } catch (error) {
    console.log("Error al cargar dólar:", error);
    const dolarDiv = document.querySelector(".dolarhoy");
    if (dolarDiv) {
      dolarDiv.innerHTML = "💵 Dólar: No disponible";
    }
  }
}

cargarDolar();
setInterval(cargarDolar, 300000); // Actualizar cada 5 minutos

/* ========== CARGAR Y MOSTRAR NOTICIAS ========== */
function cargarNoticias() {
  const noticiasGuardadas = JSON.parse(localStorage.getItem("noticias")) || [];
  const noticiasDefault = [
    {
      id: 1,
      titulo: "Revelaron el gesto que tuvo Messi con los empleados del predio de AFA tras ganar el Mundial 2022",
      descripcion: "Gerardo Salorio, ex preparador físico de la Selección, contó la actitud que tuvo el astro rosarino con los premios por conseguir la tercera estrella",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd8VKLFdHxJrP7NOCtlP8OaY3s9utrUao1iA&s"
    },
    {
      id: 2,
      titulo: "Las entradas para el Mundial 2026 son las más caras de la historia",
      descripcion: "Las cifras para conseguir un lugar en los estadios de la Copa del Mundo superan todos los registros anteriores, según una investigación de The Economist",
      imagen: "https://www.infobae.com/resizer/v2/BI42W7HBPVHOFMQZ4AJFNTXNI4.jpg?auth=22450d54598fa6d9c1a34ee9a74dccfe7d4f2a2176bd7bc1974c9e92b153e42f&smart=true&width=992&height=558&quality=85"
    },
    {
      id: 3,
      titulo: "El Banco Central acumuló 90 jornadas consecutivas con compras de dólares",
      descripcion: "La autoridad monetaria compró USD 144 millones este martes y superó el 83% del piso de la meta anual de adquisición de divisas",
      imagen: "https://www.infobae.com/resizer/v2/FZIRB5AB5JCOJDWXZH3QII2UWA.JPG?auth=8b0f85374ce99d85f7d31e54fc37cd1462b8a4e9f88980a86ce564721c1275bb&smart=true&width=992&height=659&quality=85"
    },
    {
      id: 4,
      titulo: "Disparidad regional: cuánto pagan de luz y gas los usuarios de cada provincia",
      descripcion: "Las tarifas varían considerablemente entre las diferentes jurisdicciones, incluso dentro de un mismo segmento de hogares",
      imagen: "https://www.infobae.com/resizer/v2/5WEEJ7CX3ZB25GXZSVWXI3ZMUQ.jpg?auth=9d82882bed26811dd99dd22f7e7b1c991d34965d23875a5f546e5e50f9803815&smart=true&width=992&height=558&quality=85"
    },
    {
      id: 5,
      titulo: "Tomar más de tres tazas de café al día podría triplicar el riesgo de daño renal",
      descripcion: "La investigación identificó que el riesgo aumenta especialmente en personas con una variante genética que ralentiza el metabolismo de la cafeína",
      imagen: "https://www.infobae.com/resizer/v2/EU3PVM2CUFBNRI2CBXEHUREXJY.png?auth=09fe9ce4dcbf7492d44a1e841e87dab135073b75b32a06ea9618c8813fc75900&smart=true&width=992&height=543&quality=85"
    },
    {
      id: 6,
      titulo: "EEUU alertó sobre un golpe de Estado en marcha en Bolivia",
      descripcion: "El vicesecretario de Estado estadounidense, Christopher Landau, respaldó al presidente Rodrigo Paz frente a las protestas",
      imagen: "https://www.infobae.com/resizer/v2/NNHGH34EWVE7JNI5PWQ2B35V3E.JPG?auth=ae65c55ea24f0a44e0c7a053df95de08a762e94db9c88a519ca4fe0a0616e10e&smart=true&width=992&height=660&quality=85"
    }
  ];

  const noticias = noticiasGuardadas.length > 0 ? noticiasDefault.concat(noticiasGuardadas) : noticiasDefault;
  const contenedor = document.getElementById("noticias-container");

  if (!contenedor) return;

  contenedor.innerHTML = "";

  noticias.forEach(noticia => {
    const article = document.createElement("article");
    article.innerHTML = `
      <h2>${noticia.titulo}</h2>
      <img src="${noticia.imagen}" alt="${noticia.titulo}" onerror="this.src='https://via.placeholder.com/600x400?text=Imagen+no+disponible'">
      <p>${noticia.descripcion}</p>
    `;
    contenedor.appendChild(article);
  });
}

// Cargar noticias cuando se carga la página
if (document.getElementById("noticias-container")) {
  cargarNoticias();
}

// Escuchar cambios en localStorage para actualizar noticias
window.addEventListener("storage", () => {
  cargarNoticias();
});
