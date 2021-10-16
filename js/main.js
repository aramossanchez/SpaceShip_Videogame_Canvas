// AUTOR: ARMANDO RAMOS SÁNCHEZ
// VERSION: 1.0

//ENTORNO

//REFERENCIO CANVAS Y CREO CONTEXTO 2D
let canvas = document.getElementById("game");
let contexto = canvas.getContext("2d");

//CREO VARIABLES PARA COCHE
var naveWidth = 35;
var naveHeight = 35;
var navePosicionX = 0;
var navePosicionY = canvas.height-naveHeight;

//CREAMOS VARIABLES PARA EL MOVIMIENTO DEL nave
var naveX = 0;
var naveY = canvas.height-naveHeight;

var velocidadX = 0;
var velocidadY = 0;

var izquierdaPulsado = false;
var derechaPulsado = false;
var arribaPulsado = false;
var abajoPulsado = false;

var haciaDerecha = true;
var haciaIzquierda = false;
var haciaArriba = false;
var haciaAbajo = false;

//CREO nave
const dibujarnave = () =>{
    contexto.beginPath();
    contexto.rect(naveX, naveY, naveWidth, naveHeight);
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
    //PINTAMOS nave
    dibujarnave();
    //GESTIONAMOS MOVIMIENTO DE LA NAVE
    
    //MOVIMIENTO HACIA LA IZQUIERDA
    if(izquierdaPulsado){
        haciaIzquierda = true;
        haciaDerecha = false;
        if (velocidadX > -8){
            velocidadX -= 0.10;
        };
        naveX += velocidadX;
    };
    if(!izquierdaPulsado && haciaIzquierda && naveX > 0){
        naveX += velocidadX;
    };
    if(naveX <= 0){
        naveX = 0;
        velocidadX = 0;
    }
    //MOVIMIENTO HACIA ARRIBA
    if(arribaPulsado){
        haciaArriba = true;
        haciaAbajo = false;
        if (velocidadY > -8){
            velocidadY -= 0.10;
        };
        naveY += velocidadY;
    };
    if(!arribaPulsado && haciaArriba && naveY > 0){
        naveY += velocidadY;
    };
    if(naveY <= 0){
        naveY = 0;
        velocidadY = 0;
    }
    //MOVIMIENTO HACIA DERECHA
    if(derechaPulsado && naveX < canvas.width - naveWidth){
        haciaDerecha = true;
        haciaIzquierda = false;
        if (velocidadX < 8){
            velocidadX += 0.10;
        }
        naveX += velocidadX;
    };
    if(!derechaPulsado && haciaDerecha && naveX < canvas.width - naveWidth){
        naveX += velocidadX;
    };
    if(naveX >= canvas.width - naveWidth){
        naveX = canvas.width - naveWidth;
        velocidadX = 0;
    }
    //MOVIMIENTO HACIA ARRIBA
    if(abajoPulsado){
        haciaAbajo = true;
        haciaArriba = false;
        if (velocidadY < 8){
            velocidadY += 0.10;
        };
        naveY += velocidadY;
    };
    if(!abajoPulsado && haciaAbajo && naveY > 0){
        naveY += velocidadY;
    };
    if(naveY <= 0){
        naveY = 0;
        velocidadY = 0;
    }
    //CUANDO LLAMEMOS A LA FUNCIÓN, SE EJECUTARÁ EN BUCLE CON LA TASA DE REFRESCOS MÁXIMA QUE SOPORTE EL NAVEGADOR
    requestAnimationFrame(juego)

};
//INVOCAMOS LA FUNCION QUE GESTIONA EL FUNCIONAMIENTO DEL JUEGO
juego();



