/* ========== ELEMENTOS DEL DOM ========== */
const btnLogin = document.getElementById("btnLogin");
const btnSalir = document.getElementById("btnSalir");
const inputUsuario = document.getElementById("usuario");
const inputPassword = document.getElementById("password");
const mensaje = document.getElementById("mensaje");
const zonaLogin = document.getElementById("zonaLogin");
const zonaBienvenida = document.getElementById("zonaBienvenida");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const foto = document.getElementById("foto");

/* ========== VERIFICAR TOKEN AL CARGAR ========== */
const tokenGuardado = localStorage.getItem("token");
if (tokenGuardado) {
  obtenerDatosDelUsuario(tokenGuardado);
}

/* ========== LOGIN ========== */
if (btnLogin) {
  btnLogin.addEventListener("click", function (e) {
    e.preventDefault();
    
    if (!inputUsuario.value || !inputPassword.value) {
      mostrarMensaje("Por favor complete todos los campos", "error");
      return;
    }

    const datos = {
      username: inputUsuario.value,
      password: inputPassword.value
    };

    btnLogin.disabled = true;
    btnLogin.textContent = "Cargando...";

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    })
      .then(function (respuesta) {
        if (!respuesta.ok) {
          throw new Error("Usuario o contraseña incorrectos");
        }
        return respuesta.json();
      })
      .then(function (data) {
        if (!data || !data.accessToken) {
          throw new Error("Error en la autenticación");
        }

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("usuario", JSON.stringify(data));
        mostrarMensaje("¡Acceso correcto! Redirigiendo...", "exito");

        setTimeout(() => {
          window.location.href = "admin.html";
        }, 1500);
      })
      .catch(function (error) {
        mostrarMensaje(error.message, "error");
        btnLogin.disabled = false;
        btnLogin.textContent = "Ingresar";
      });
  });
}

/* ========== OBTENER DATOS DEL USUARIO ========== */
function obtenerDatosDelUsuario(token) {
  fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  })
    .then(function (respuesta) {
      if (!respuesta.ok) {
        throw new Error("Token inválido o vencido");
      }
      return respuesta.json();
    })
    .then(function (data) {
      mostrarBienvenida(data);
    })
    .catch(function (error) {
      console.log("Error:", error.message);
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    });
}

/* ========== MOSTRAR BIENVENIDA ========== */
function mostrarBienvenida(data) {
  if (!zonaLogin || !zonaBienvenida) return;

  zonaLogin.hidden = true;
  zonaBienvenida.hidden = false;

  if (nombre) {
    nombre.textContent = data.firstName + " " + data.lastName;
  }
  if (email) {
    email.textContent = data.email;
  }
  if (foto) {
    foto.src = data.image;
  }
}

/* ========== CERRAR SESIÓN ========== */
if (btnSalir) {
  btnSalir.addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    if (zonaLogin) {
      zonaLogin.hidden = false;
    }
    if (zonaBienvenida) {
      zonaBienvenida.hidden = true;
    }
    if (mensaje) {
      mensaje.textContent = "";
    }
    if (inputUsuario) inputUsuario.value = "";
    if (inputPassword) inputPassword.value = "";

    mostrarMensaje("Sesión cerrada correctamente", "exito");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
}

/* ========== FUNCIÓN AUXILIAR: MOSTRAR MENSAJE ========== */
function mostrarMensaje(texto, tipo) {
  if (!mensaje) return;

  mensaje.textContent = texto;
  mensaje.style.color = tipo === "error" ? "#d32f2f" : "#4caf50";
  mensaje.style.fontWeight = "600";

  if (tipo === "exito") {
    setTimeout(() => {
      mensaje.textContent = "";
    }, 3000);
  }
}

/* ========== MODO OSCURO ========== */
const temaGuardado = localStorage.getItem("tema");
if (temaGuardado === "dark") {
  document.body.classList.add("dark-mode");
}

let botonOscuro = document.getElementById("bot-oscuro");
if (botonOscuro) {
  botonOscuro.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("tema", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });
}
