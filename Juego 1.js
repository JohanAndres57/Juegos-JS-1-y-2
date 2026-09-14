let numeroSecreto = Math.floor( Math.random() * 100 )+ 1;
let intentos = 0

const input = document.getElementById("intentoUsuario");
const btnAdivinar = document.getElementById("btnAdivinar");
const mensaje = document.getElementById("mensajeJuego1");
const contadorIntentos = document.getElementById("intentosJuego1");
const btnReiniciar = document.getElementById("btnReiniciarJuego1");

btnAdivinar.addEventListener("click", function () {
const numeroUsuario = Number(input.value);

if (input.value === "" || isNaN(numeroUsuario)) {
mensaje. textContent = "Escribe un numero valido.";
return;
}

intentos = intentos + 1;
contadorIntentos.textContent = "Intentos:" + intentos;

if (numeroUsuario === numeroSecreto) {
mensaje.textContent = "Correcto. El numero era " + numeroSecreto + ". Lo lograste en " + intentos + " intentos.";

btnAdivinar.disabled = true;

} else if (numeroUsuario > numeroSecreto) {
mensaje. textContent = "Muy alto. ⬆️ Intenta con un numero menor.";
} else {
mensaje.textContent = "Muy bajo. ⬇️ Intenta con un numero mayor.";
}
input.value = "";

});

btnReiniciar.addEventListener("click", function () {
numeroSecreto = Math. floor(Math.random() * 100) + 1;
intentos = 0;

contadorIntentos.textContent = "Intentos: 0";

mensaje. textContent = ""

btnAdivinar.disabled = false;

input.value = "";
});


