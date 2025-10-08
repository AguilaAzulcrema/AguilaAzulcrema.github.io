const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");
let jsonData;
let modoActual = "imagen";

// ================================
// 🔹 UTILIDADES
// ================================
function obtenerParametroUrl(nombre) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(nombre);
}

function obtenerAnchoDesdeUrl() {
  const match = window.location.search.match(/w[-=](\d+)/);
  return match ? parseInt(match[1]) : 1200;
}

function ajustarTamañoCanvas() {
  const nuevoAncho = obtenerAnchoDesdeUrl();
  const nuevaAltura = (627 / 1200) * nuevoAncho;
  canvas.width = nuevoAncho;
  canvas.height = nuevaAltura;
}

// ================================
// 🔹 CARGAR JSON
// ================================
function cargarDatosJSON() {
  fetch("equipos.json")
    .then((res) => res.json())
    .then((data) => {
      jsonData = data;
      procesarURL();
    })
    .catch((err) => console.error("Error cargando JSON:", err));
}

// ================================
// 🔹 PROCESAR URL
// ================================
function procesarURL() {
  modoActual = obtenerParametroUrl("modo") || "imagen";
  if (modoActual === "imagen") generarModoImagen();
  else generarModoColores();
}

// ================================
// 🔹 MODO IMAGEN
// ================================
function generarModoImagen() {
  const fondo = obtenerParametroUrl("fondo") || "azul";
  const eq1 = obtenerParametroUrl("equipo1");
  const eq2 = obtenerParametroUrl("equipo2");

  if (!eq1 || !eq2) {
    console.warn("Faltan parámetros en la URL");
    return;
  }

  const fondoImg = new Image();
  fondoImg.src = "img/fondos/" + fondo + ".jpeg";
  fondoImg.onerror = () => (fondoImg.src = "img/fondos/" + fondo + ".png");

  fondoImg.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fondoImg, 0, 0, canvas.width, canvas.height);
    dibujarLogosImagen(eq1, eq2, fondo);
  };
}

function dibujarLogosImagen(eq1, eq2, fondoSeleccionado) {
  const logo1 = buscarLogoGlobal(eq1);
  const logo2 = buscarLogoGlobal(eq2);

  if (!logo1 || !logo2) return;

  const fondosConMedidasEspeciales = ["fondo5", "fondorosa"];
  const esEspecial = fondosConMedidasEspeciales.includes(fondoSeleccionado);

  const refW = canvas.width / 1200;
  const refH = canvas.height / 627;

  const logo1Pos = esEspecial
    ? { x: 100 * refW, y: 103 * refH, w: 392 * refW, h: 420 * refH }
    : { x: 162 * refW, y: 103 * refH, w: 392 * refW, h: 420 * refH };

  const logo2Pos = esEspecial
    ? { x: 708 * refW, y: 103 * refH, w: 392 * refW, h: 420 * refH }
    : { x: 646 * refW, y: 103 * refH, w: 392 * refW, h: 420 * refH };

  cargarYdibujar(logo1, logo1Pos.x, logo1Pos.y, logo1Pos.w, logo1Pos.h);
  cargarYdibujar(logo2, logo2Pos.x, logo2Pos.y, logo2Pos.w, logo2Pos.h);
}

// ================================
// 🔹 MODO COLORES (con soporte de color en JSON)
// ================================
function generarModoColores() {
  const liga = obtenerParametroUrl("liga") || "";
  const eq1 = obtenerParametroUrl("equipo1");
  const eq2 = obtenerParametroUrl("equipo2");

  if (!eq1 || !eq2) {
    console.warn("Faltan parámetros en la URL");
    return;
  }

  // Buscar datos completos del equipo (logo + color)
  const equipo1Data = buscarEquipoGlobal(eq1);
  const equipo2Data = buscarEquipoGlobal(eq2);

  // Prioridad: color URL > color JSON > blanco/negro
  const color1 =
    "#" +
    (obtenerParametroUrl("color") ||
      (equipo1Data?.color ? equipo1Data.color.replace("#", "") : "ffffff"));

  const color2 =
    "#" +
    (obtenerParametroUrl("color2") ||
      (equipo2Data?.color ? equipo2Data.color.replace("#", "") : "000000"));

  const logoLiga =
    liga && jsonData.logos_ligas[liga] ? jsonData.logos_ligas[liga] : "";
  const logo1 = equipo1Data?.logo || "";
  const logo2 = equipo2Data?.logo || "";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fondo por colores
  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
  ctx.fillStyle = color2;
  ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);

  const refW = canvas.width / 1200;
  const refH = canvas.height / 627;

  cargarYdibujar(logo1, 159 * refW, 176 * refH, 275 * refW, 275 * refH);
  cargarYdibujar(logo2, 766 * refW, 176 * refH, 275 * refW, 275 * refH);

  // En modo colores sí se muestra el logo de la liga (si existe)
  if (logoLiga)
    cargarYdibujar(logoLiga, 500 * refW, 214 * refH, 200 * refW, 200 * refH);
}

// ================================
// 🔹 FUNCIONES AUXILIARES
// ================================
function buscarLogoGlobal(equipoId) {
  if (!jsonData) return "";
  for (const liga in jsonData.ligas) {
    const equipos = jsonData.ligas[liga].equipos || [];
    const eq = equipos.find((e) => e.id === equipoId);
    if (eq) return eq.logo;
  }
  return "";
}

function buscarEquipoGlobal(equipoId) {
  if (!jsonData) return null;
  for (const liga in jsonData.ligas) {
    const equipos = jsonData.ligas[liga].equipos || [];
    const eq = equipos.find((e) => e.id === equipoId);
    if (eq) return eq;
  }
  return null;
}

function cargarYdibujar(src, x, y, w, h) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    const aspectRatio = img.width / img.height;
    let newW = w;
    let newH = h;

    if (aspectRatio > 1) newH = w / aspectRatio;
    else newW = h * aspectRatio;

    const offsetX = x + (w - newW) / 2;
    const offsetY = y + (h - newH) / 2;
    ctx.drawImage(img, offsetX, offsetY, newW, newH);
  };
}

// ================================
// 🔹 INICIO
// ================================
window.addEventListener("load", () => {
  ajustarTamañoCanvas();
  cargarDatosJSON();
});
