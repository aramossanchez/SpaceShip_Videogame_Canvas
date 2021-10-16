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

//CREAMOS VARIABLES PARA EL MOVIMIENTO DEL COCHE
var cocheX = 0;
var cocheY = canvas.height-cocheHeight;

var velocidadX = 0;
var velocidadY = 5;

var izquierdaPulsado = false;
var derechaPulsado = false;
var arribaPulsado = false;
var abajoPulsado = false;

var haciaDerecha = true;
var haciaIzquierda = false;

//CREO COCHE
const dibujarCoche = () =>{
    contexto.beginPath();
    contexto.rect(cocheX, cocheY, cocheWidth, cocheHeight);
    contexto.fillStyle = "#0095DD";
    contexto.fill();
    contexto.closePath();
}

//CREAMOS EVENTOS PARA PULSACIÓN DE TECLAS Y MOVIMIENTO DE STICK
const pulsarTecla = (e) =>{
    if(e.keyCode == 37) {
        izquierdaPulsado = true;
    }
    if(e.keyCode == 38) {
        arribaPulsado = true;
    }
    if(e.keyCode == 39) {
        derechaPulsado = true;
    }
    if(e.keyCode == 40) {
        abajoPulsado = true;
    }
}

const levantarTecla = (e) =>{
    if(e.keyCode == 37) {
        izquierdaPulsado = false;
    }
    if(e.keyCode == 38) {
        arribaPulsado = false;
    }
    if(e.keyCode == 39) {
        derechaPulsado = false;
    }
    if(e.keyCode == 40) {
        abajoPulsado = false;
    }
}

document.addEventListener("keydown", pulsarTecla, false);
document.addEventListener("keyup", levantarTecla, false);

//FUNCIONAMIENTO DEL JUEGO
const juego = () =>{
    //SE BORRA TODO EL CONTENIDO DEL CANVAS DENTRO DE SUS MARGENES. COORDENADAS X E Y DE ESQUINA SUPERIRO IZQUIERDA Y COORDENADAS X E Y DE ESQUINA INFERIOR DERECHA DE UN RECTANGULO
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    //PINTAMOS COCHE
    dibujarCoche();
    //GESTIONAMOS MOVIMIENTO DEL COCHE
    if(izquierdaPulsado){
        haciaIzquierda = true;
        haciaDerecha = false;
        if (velocidadX > -5){
            velocidadX -= 0.25;
        };
        cocheX += velocidadX;
    };
    if(!izquierdaPulsado && haciaIzquierda && cocheX > 0){
        if (velocidadX < 0){
            velocidadX += 0.25;
        };
        cocheX += velocidadX;
    };
    if(cocheX <= 0){
        cocheX = 0;
        velocidadX = 0;
    }
    if(arribaPulsado && cocheY > 0){
        cocheY -= velocidadY;
    };
    if(derechaPulsado && cocheX < canvas.width - cocheWidth){
        haciaDerecha = true;
        haciaIzquierda = false;
        if (velocidadX < 10){
            velocidadX += 0.25;
        }
        cocheX += velocidadX;
    };
    if(!derechaPulsado && haciaDerecha && cocheX < canvas.width - cocheWidth){
        if (velocidadX > 0){
            velocidadX -= 0.25;
        }
        cocheX += velocidadX;
    };
    if(cocheX >= canvas.width - cocheWidth){
        cocheX = canvas.width - cocheWidth;
        velocidadX = 0;
    }
    if(abajoPulsado && cocheY < canvas.height-cocheHeight){
        cocheY += velocidadY;
    };
    //CUANDO LLAMEMOS A LA FUNCIÓN, SE EJECUTARÁ EN BUCLE CON LA TASA DE REFRESCOS MÁXIMA QUE SOPORTE EL NAVEGADOR
    requestAnimationFrame(juego)

};
//INVOCAMOS LA FUNCION QUE GESTIONA EL FUNCIONAMIENTO DEL JUEGO
juego();



