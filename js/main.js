// AUTOR: ARMANDO RAMOS SÁNCHEZ
// VERSION: 1.0

//ENTORNO

//REFERENCIO CANVAS Y CREO CONTEXTO 2D
let canvas = document.getElementById("game");
let contexto = canvas.getContext("2d");

//CREO VARIABLES PARA LA NAVE
var naveWidth = 35;
var naveHeight = 35;
var navePosicionX = 0;
var navePosicionY = canvas.height-naveHeight;

//CREAMOS VARIABLES PARA LOS BORDES
var bordeIzquierdaWidth = 15;
var bordeIzquierdaHeight = canvas.height;

var bordeDerechaWidth = 15;
var bordeDerechaHeight = canvas.height;

var bordeArribaWidth = canvas.width;
var bordeArribaHeight = 15;

var bordeAbajoWidth = canvas.width;
var bordeAbajoHeight = 15;


//CREAMOS VARIABLES PARA EL MOVIMIENTO DEL nave
var naveX = canvas.width/2 - naveWidth;
var naveY = canvas.height/2 - naveHeight;

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
    contexto.fillStyle = "#FF0000";
    contexto.fill();
    contexto.closePath();
}

const pintarBordes = () =>{
    contexto.beginPath();
    contexto.rect(0, 0, bordeIzquierdaWidth, bordeIzquierdaHeight);
    contexto.fillStyle = "#00FF00";
    contexto.fill();
    contexto.closePath();

    contexto.beginPath();
    contexto.rect(0, 0, bordeArribaWidth, bordeArribaHeight);
    contexto.fillStyle = "#00FF00";
    contexto.fill();
    contexto.closePath();

    contexto.beginPath();
    contexto.rect(canvas.width - bordeDerechaWidth, 0, bordeDerechaWidth, bordeDerechaHeight);
    contexto.fillStyle = "#00FF00";
    contexto.fill();
    contexto.closePath();

    contexto.beginPath();
    contexto.rect(0, canvas.height - bordeAbajoHeight, bordeAbajoWidth, bordeAbajoHeight);
    contexto.fillStyle = "#00FF00";
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
    //PINTAMOS NAVE
    dibujarnave();
    //PINTAMOS BORDES
    pintarBordes();
    //GESTIONAMOS MOVIMIENTO DE LA NAVE
    
    //MOVIMIENTO HACIA LA IZQUIERDA
    if(izquierdaPulsado){
        haciaIzquierda = true;
        haciaDerecha = false;
        if (velocidadX > -5){
            velocidadX -= 0.10;
        };
        naveX += velocidadX;
    };
    if(!izquierdaPulsado){
        naveX += velocidadX;
    };
    if(naveX <= 0 + bordeIzquierdaWidth){
        naveX = 0 + bordeIzquierdaWidth;
        velocidadX = 0;
    }
    //MOVIMIENTO HACIA ARRIBA
    if(arribaPulsado){
        haciaArriba = true;
        haciaAbajo = false;
        haciaIzquierda = false;
        haciaDerecha = false;
        if (velocidadY > -5){
            velocidadY -= 0.10;
        };
        naveY += velocidadY;
    };
    if(!arribaPulsado){
        naveY += velocidadY;
    };
    if(naveY <= 0 + bordeArribaHeight){
        naveY = 0 + bordeArribaHeight;
        velocidadY = 0;
    }
    //MOVIMIENTO HACIA DERECHA
    if(derechaPulsado){
        haciaArriba = false;
        haciaAbajo = false;
        haciaIzquierda = false;
        haciaDerecha = true;
        if (velocidadX < 5){
            velocidadX += 0.10;
        }
        naveX += velocidadX;
    };
    if(!derechaPulsado){
        naveX += velocidadX;
    };
    if(naveX >= canvas.width - naveWidth - bordeDerechaWidth){
        naveX = canvas.width - naveWidth - bordeDerechaWidth;
        velocidadX = 0;
    }
    //MOVIMIENTO HACIA ARRIBA
    if(abajoPulsado){
        haciaArriba = false;
        haciaAbajo = true;
        haciaIzquierda = false;
        haciaDerecha = false;
        if (velocidadY < 5){
            velocidadY += 0.10;
        };
        naveY += velocidadY;
    };
    if(!abajoPulsado){
        naveY += velocidadY;
    };
    if(naveY >= canvas.height-naveHeight-bordeAbajoHeight){
        naveY = canvas.height-naveHeight-bordeAbajoHeight;
        velocidadY = 0;
    }
    //CUANDO LLAMEMOS A LA FUNCIÓN, SE EJECUTARÁ EN BUCLE CON LA TASA DE REFRESCOS MÁXIMA QUE SOPORTE EL NAVEGADOR
    requestAnimationFrame(juego)

};
//INVOCAMOS LA FUNCION QUE GESTIONA EL FUNCIONAMIENTO DEL JUEGO
juego();



