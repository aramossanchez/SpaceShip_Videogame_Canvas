// AUTOR: ARMANDO RAMOS SÁNCHEZ
// VERSION: 1.0

//ENTORNO

//REFERENCIO CANVAS Y CREO CONTEXTO 2D
let canvas = document.getElementById("game");
let contexto = canvas.getContext("2d");

//CREO VARIABLES PARA LA NAVE
var naveWidth = 45;
var naveHeight = 45;
var naveX = 50;
var naveY = 550;

//TRAIGO IMAGEN DE LA NAVE
var naveArriba = new Image();
naveArriba.src = './img/naveArriba.png';

var naveAbajo = new Image();
naveAbajo.src = './img/naveAbajo.png';

var naveIzquierda = new Image();
naveIzquierda.src = './img/naveIzquierda.png';

var naveDerecha = new Image();
naveDerecha.src = './img/naveDerecha.png';

//CREAMOS VARIABLES PARA LOS BORDES
var bordeIzquierdaWidth = 15;
var bordeIzquierdaHeight = canvas.height;

var bordeDerechaWidth = 15;
var bordeDerechaHeight = canvas.height;

var bordeArribaWidth = canvas.width;
var bordeArribaHeight = 15;

var bordeAbajoWidth = canvas.width;
var bordeAbajoHeight = 15;

//CREAMOS VARIABLES PARA LOS OBSTACULOS
var obstaculoUnoX = 200;
var obstaculoUnoY = 300;
var obstaculoUnoWidth = 25;
var obstaculoUnoHeight = 300;

//CREAMOS VARIABLES PARA EL MOVIMIENTO DE LA NAVE

var velocidadX = 0;
var velocidadY = 0;

var disparoVelocidadY = 0;

var izquierdaPulsado = false;
var derechaPulsado = false;
var arribaPulsado = false;
var abajoPulsado = false;

var haciaDerecha = false;
var haciaIzquierda = false;
var haciaArriba = true;
var haciaAbajo = false;

//CREO NAVE
const dibujarnave = () =>{
    contexto.save()
    //BRILLO DE LA NAVE
    contexto.shadowBlur=35;
    contexto.shadowOffsetX=0;
    contexto.shadowOffsetY=0;
    contexto.shadowColor="#FFFF00";
    contexto.beginPath();
    //CAMBIA LA ORIENTACION DE LA NAVE
    if (haciaArriba) {
        contexto.drawImage(naveArriba, naveX, naveY, naveWidth, naveHeight);
    }
    if (haciaAbajo) {
        contexto.drawImage(naveAbajo, naveX, naveY, naveWidth, naveHeight);
    }
    if (haciaIzquierda) {
        contexto.drawImage(naveIzquierda, naveX, naveY, naveHeight, naveWidth);
    }
    if (haciaDerecha) {
        contexto.drawImage(naveDerecha, naveX, naveY, naveHeight, naveWidth);
    }
    contexto.fillStyle = "#AAAAAA";
    contexto.fill();
    contexto.closePath();
    contexto.restore();
}

const pintarBordes = () =>{
    contexto.beginPath();
    contexto.rect(0, 0, bordeIzquierdaWidth, bordeIzquierdaHeight);
    contexto.fillStyle = "#005555";
    contexto.fill();
    contexto.closePath();

    contexto.beginPath();
    contexto.rect(0, 0, bordeArribaWidth, bordeArribaHeight);
    contexto.fillStyle = "#005555";
    contexto.fill();
    contexto.closePath();

    contexto.beginPath();
    contexto.rect(canvas.width - bordeDerechaWidth, 0, bordeDerechaWidth, bordeDerechaHeight);
    contexto.fillStyle = "#005555";
    contexto.fill();
    contexto.closePath();

    contexto.beginPath();
    contexto.rect(0, canvas.height - bordeAbajoHeight, bordeAbajoWidth, bordeAbajoHeight);
    contexto.fillStyle = "#005555";
    contexto.fill();
    contexto.closePath();
}

const pintarObstaculo1 = () =>{
    contexto.beginPath();
    contexto.rect(obstaculoUnoX, obstaculoUnoY, obstaculoUnoWidth, obstaculoUnoHeight);
    contexto.fillStyle = "#005555";
    contexto.fill();
    contexto.closePath();
}

const deteccionColision = () => {
    if(naveX + naveHeight > obstaculoUnoX && naveX < obstaculoUnoX + obstaculoUnoWidth && naveY + naveHeight > obstaculoUnoY && naveY < obstaculoUnoY + obstaculoUnoHeight){
        window.location.reload();
    }
}
//CREAMOS EVENTOS PARA PULSACIÓN DE TECLAS Y MOVIMIENTO DE NAVE
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
    //PINTAMOS PRIMER OBSTACULO
    pintarObstaculo1();
    //GESTIONAMOS MOVIMIENTO DE LA NAVE

    //MOVIMIENTO HACIA LA IZQUIERDA
    if(izquierdaPulsado){
        haciaArriba = false;
        haciaAbajo = false;
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
    if(naveX >= canvas.width - naveHeight - bordeDerechaWidth){
        naveX = canvas.width - naveHeight - bordeDerechaWidth;
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
    };

    //COLISIONES
    deteccionColision();
    //CUANDO LLAMEMOS A LA FUNCIÓN, SE EJECUTARÁ EN BUCLE CON LA TASA DE REFRESCOS MÁXIMA QUE SOPORTE EL NAVEGADOR
    requestAnimationFrame(juego);

};
//INVOCAMOS LA FUNCION QUE GESTIONA EL FUNCIONAMIENTO DEL JUEGO
juego();



