const SIMBOLOS = ["circulo", "cuadrado", "triangulo", "estrella"];

let mazo = [];
let cartasVolteadas = [];
let bloqueado = false;
let movimientos = 0;
let paresEncontrados = 0;
let segundos = 0;
let temporizador = null;
let juegoIniciado = false;

const tablero = document.getElementById("tableroJuego3");
const contadorMovimientos = document.getElementById("movimientosJuego3");
const contadorTiempo = document.getElementById("tiempoJuego3");
const mensajeJuego3 = document.getElementById("mensajeJuego3");
const btnReiniciarJuego3 = document.getElementById("btnReiniciarJuego3");

function mezclar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function crearSvgSimbolo(simbolo) {
  const svgs = {
    circulo: `<svg viewBox="0 0 40 40" width="34" height="34"><circle cx="20" cy="20" r="14" fill="#2451c4"/></svg>`,
    cuadrado: `<svg viewBox="0 0 40 40" width="34" height="34"><rect x="7" y="7" width="26" height="26" fill="#17a673"/></svg>`,
    triangulo: `<svg viewBox="0 0 40 40" width="34" height="34"><polygon points="20,6 34,34 6,34" fill="#d9782d"/></svg>`,
    estrella: `<svg viewBox="0 0 40 40" width="34" height="34"><polygon points="20,4 24,16 37,16 26,24 30,36 20,28 10,36 14,24 3,16 16,16" fill="#d1435b"/></svg>`
  };
  return svgs[simbolo] || "";
}

function iniciarCronometro() {
  detenerCronometro();
  segundos = 0;
  contadorTiempo.textContent = "0s";
  temporizador = setInterval(() => {
    segundos++;
    contadorTiempo.textContent = `${segundos}s`;
  }, 1000);
}

function detenerCronometro() {
  if (temporizador) {
    clearInterval(temporizador);
    temporizador = null;
  }
}

function crearTablero() {
  tablero.innerHTML = "";
  mazo = mezclar([...SIMBOLOS, ...SIMBOLOS]);

  mazo.forEach((simbolo, indice) => {
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.dataset.simbolo = simbolo;
    carta.dataset.indice = indice;

    carta.innerHTML = `
      <div class="carta-interior">
        <div class="carta-cara carta-frente">
          <svg viewBox="0 0 40 40" width="28" height="28">
            <circle cx="20" cy="20" r="16" fill="none" stroke="#ffffff" stroke-width="3"/>
          </svg>
        </div>
        <div class="carta-cara carta-reverso">
          ${crearSvgSimbolo(simbolo)}
        </div>
      </div>
    `;

    tablero.appendChild(carta);
  });
}

tablero.addEventListener("click", (evento) => {
  const carta = evento.target.closest(".carta");

  if (!carta || bloqueado) return;
  if (carta.classList.contains("volteada") || carta.classList.contains("emparejada")) return;

  if (!juegoIniciado) {
    juegoIniciado = true;
    iniciarCronometro();
  }

  carta.classList.add("volteada");
  cartasVolteadas.push(carta);

  if (cartasVolteadas.length === 2) {
    movimientos++;
    contadorMovimientos.textContent = movimientos;
    compararCartas();
  }
});

function compararCartas() {
  const [primera, segunda] = cartasVolteadas;
  const esMatch = primera.dataset.simbolo === segunda.dataset.simbolo;

  if (esMatch) {
    primera.classList.add("emparejada");
    segunda.classList.add("emparejada");
    cartasVolteadas = [];
    paresEncontrados++;

    if (paresEncontrados === SIMBOLOS.length) {
      detenerCronometro();
      mensajeJuego3.textContent = `¡Excelente! Completado en ${movimientos} movimientos y ${segundos} segundos.`;
    }
  } else {
    bloqueado = true;
    setTimeout(() => {
      primera.classList.remove("volteada");
      segunda.classList.remove("volteada");
      cartasVolteadas = [];
      bloqueado = false;
    }, 800);
  }
}

function reiniciarJuego() {
  detenerCronometro();
  movimientos = 0;
  paresEncontrados = 0;
  cartasVolteadas = [];
  bloqueado = false;
  juegoIniciado = false;
  
  contadorMovimientos.textContent = "0";
  contadorTiempo.textContent = "0s";
  mensajeJuego3.textContent = "";
  
  crearTablero();
}

btnReiniciarJuego3.addEventListener("click", reiniciarJuego);
crearTablero();