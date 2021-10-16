// AUTOR: ARMANDO RAMOS SÁNCHEZ
// VERSION: 1.0

//ENTORNO

//REFERENCIO CANVAS Y CREO CONTEXTO 2D
let canvas = document.getElementById("game");
let contexto = canvas.getContext("2d");

//CREO VARIABLES PARA COCHE
var cocheWidth = 60;
var cocheHeight = 35;
var cochePosicionX = 0;
var cochePosicionY = canvas.height-cocheHeight;

//CREO COCHE
const dibujarCoche = () =>{
    contexto.beginPath();
    contexto.rect(0, canvas.height-cocheHeight, cocheWidth, cocheHeight);
    contexto.fillStyle = "#0095DD";
    contexto.fill();
    contexto.closePath();
}
//CREAMOS VARIABLES PARA EL MOVIMIENTO DEL COCHE
var cocheX = canvas.width/2;
var cocheY = canvas.height-30;

var movimientoX = 2;
var movimientoY = -2;

dibujarCoche();



