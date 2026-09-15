const opciones = ["piedra", "papel", "tijera"];
let ganadas = 0;
let perdidas = 0;
let empatadas = 0;

const botonesOpcion = document.querySelectorAll(".btnOpcion");
const resultado = document.getElementById("resultadoJuego2");
const marcador = document.getElementById("marcadorJuego2");
const btnReiniciarJuego2 = document.getElementById("btnReiniciarJuego2");

botonesOpcion.forEach(function(boton){
    boton.addEventListener("click", function () {
        const eleccionUsuario = boton.dataset.opcion;
        const indiceAleatorio = Math.floor(Math.random() * opciones.length);
        const eleccionComputadora = opciones[indiceAleatorio]

        let mensaje = "";

        if (eleccionUsuario === eleccionComputadora) {
            mensaje = "Empate. Ambos eligieron " + eleccionUsuario + ".";
            empatadas = empatadas + 1;
        } else if (
            (eleccionUsuario === "piedra" && eleccionComputadora === "tijera") ||
            (eleccionUsuario === "papel" && eleccionComputadora === "piedra") ||
            (eleccionUsuario === "tijera" && eleccionComputadora === "papel")
        ) {
            mensaje = "Ganaste. " + eleccionUsuario + " le gana a " + eleccionComputadora + ".";
            ganadas = ganadas + 1;
        } else {
            mensaje = "Perdiste. " + eleccionComputadora + " le gana a " + eleccionUsuario + ".";
            perdidas = perdidas + 1;
        }
        resultado.textContent = mensaje;
        marcador.textContent = "Ganadas: " + ganadas + " | Perdidas: " + perdidas + " | Empates: " + empatadas;

    });
});

btnReiniciarJuego2.addEventListener("click", function () {
    ganadas = 0;
    perdidas = 0;
    empatadas = 0;
    resultado.textContent = "";
    marcador.textContent = "Ganadas: 0 | Perdidas: 0 | Empates: 0";
});