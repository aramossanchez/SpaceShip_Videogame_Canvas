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

//CREO VARIABLES PARA LOS BORDES
var bordeIzquierdaWidth = 15;
var bordeIzquierdaHeight = canvas.height;

var bordeDerechaWidth = 15;
var bordeDerechaHeight = canvas.height;

var bordeArribaWidth = canvas.width;
var bordeArribaHeight = 15;

var bordeAbajoWidth = canvas.width;
var bordeAbajoHeight = 15;

//CREO VARIABLES PARA LOS OBSTACULOS
var obstaculos = [];
var obstaculoUnoX = 100;
var obstaculoUnoY = 40;
var obstaculoUnoWidth = 25;
var obstaculoUnoHeight = 300;
var obstaculoMarginRight = 100;
var obstaculoMarginTop = 260;

//CREO VARIABLES PARA EL MOVIMIENTO DE LA NAVE
var velocidadX = 0;
var velocidadY = 0;

var izquierdaPulsado = false;
var derechaPulsado = false;
var arribaPulsado = false;
var abajoPulsado = false;

var haciaDerecha = false;
var haciaIzquierda = false;
var haciaArriba = true;
var haciaAbajo = false;

//VARIABLES PARA LOS DISPAROS
var velocidadDisparoX = 0;
var velocidadDisparoY = 4;

var disparoWidth = 10;
var disparoHeight = 10;

var disparoPulsado = false;

var disparos = [];

var sonidoDisparo = new Audio();
sonidoDisparo.src = "./sound/disparo.wav";

//CREO VARIABLE PARA LLEVAR UN CONTEO DE LAS VIDAS
var contador = 3;

//CREO VARIABLE DE FIN DE JUEGO
var portal = new Image();
portal.src = './img/portal.png';

var giro = 0;


//CREO NAVE
const dibujarnave = () =>{
    contexto.save()
    //BRILLO DE LA NAVE
    contexto.shadowBlur=35;
    if (haciaArriba) {
        contexto.shadowOffsetY=20;
    }
    if (haciaAbajo) {
        contexto.shadowOffsetY=-20;
    }
    if (haciaIzquierda) {
        contexto.shadowOffsetX=20;
    }
    if (haciaDerecha) {
        contexto.shadowOffsetX=-20;
    }
    contexto.shadowColor="#FF0000";
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
const resetearNave = () =>{
    contador--;
    naveX = 50;
    naveY = 550;
    velocidadX = 0;
    velocidadY = 0;
    haciaDerecha = false;
    haciaIzquierda = false;
    haciaArriba = true;
    haciaAbajo = false;
    disparos = [];
    if (contador < 0) {
        window.location.reload();
    }
}

const pintarBordes = () =>{
    contexto.beginPath();
    contexto.rect(0, 0, bordeIzquierdaWidth, bordeIzquierdaHeight);
    contexto.fillStyle = "#FFEB00";
    contexto.fill();
    contexto.closePath();

    contexto.beginPath();
    contexto.rect(0, 0, bordeArribaWidth, bordeArribaHeight);
    contexto.fillStyle = "#FFEB00";
    contexto.fill();
    contexto.closePath();

    contexto.beginPath();
    contexto.rect(canvas.width - bordeDerechaWidth, 0, bordeDerechaWidth, bordeDerechaHeight);
    contexto.fillStyle = "#FFEB00";
    contexto.fill();
    contexto.closePath();

    contexto.beginPath();
    contexto.rect(0, canvas.height - bordeAbajoHeight, bordeAbajoWidth, bordeAbajoHeight);
    contexto.fillStyle = "#FFEB00";
    contexto.fill();
    contexto.closePath();
}

const pintarObstaculos = () =>{
    obstaculoMarginRight = 100;
    for (let i = 0; i < 5; i++) {// GUARDO OBJETOS EN UN ARRAY CON LAS POSICIONES QUE TENDRÁN LOS OBSTACULOS
        if (i%2 == 0) {// CREO LA ALTURA VARIABLE DE LOS OBSTACULOS
            obstaculoMarginTop = 260
        }else{
            obstaculoMarginTop = 0;
        }
        obstaculos[i] = {x:obstaculoUnoX + obstaculoMarginRight, y: obstaculoUnoY + obstaculoMarginTop};
        obstaculoMarginRight += 250;
    }
    for (let i = 0; i < obstaculos.length; i++) {// GENERO LOS OBSTACULOS CON LAS POSICIONES GUARDADAS EN EL ARRAY DE OBJETOS
        contexto.beginPath();
        contexto.rect(obstaculos[i].x, obstaculos[i].y, obstaculoUnoWidth, obstaculoUnoHeight);
        contexto.fillStyle = "#FFEB00";
        contexto.fill();
        contexto.closePath();
    }
}

const deteccionColisionNave = () => {
    for (let i = 0; i < obstaculos.length; i++) {// RECORRO EL ARRAY DE OBJETOS E INDICO LAS COLISIONES PARA CADA UNO DE LOS OBJETOS GUARDADOS
        if(naveX + naveHeight > obstaculos[i].x && naveX < obstaculos[i].x + obstaculoUnoWidth && naveY + naveHeight > obstaculos[i].y && naveY < obstaculos[i].y + obstaculoUnoHeight){
            resetearNave();
        };
    }
}

const deteccionColisionDisparos = () => {
    for (let i = 0; i < obstaculos.length; i++) {// RECORRO EL ARRAY DE OBSTACULOS
        for (let a = 0; a < disparos.length; a++) {// RECORRO EL ARRAY DE DISPAROS
            console.log(disparos[a].x + disparos[a].speedX);
            if(disparos[a].x + disparos[a].speedX > obstaculos[i].x - disparoWidth && disparos[a].x + disparos[a].speedX < obstaculos[i].x + obstaculoUnoWidth && disparos[a].y + disparos[a].speedY > obstaculos[i].y - disparoHeight && disparos[a].y + disparos[a].speedY < obstaculos[i].y + obstaculoUnoHeight){
                disparos[a].x = -100;
                disparos[a].y = -100;
            };
        };
    };
}

const pintarContador = () =>{
    contexto.beginPath();
    contexto.font = "30px Arial";
    contexto.fillStyle = "red";
    contexto.fillText("Vidas: " + contador, 30, 50);
    contexto.closePath();
}

const pintarPortal = () =>{
    giro = giro + 10;
    contexto.save();
    contexto.beginPath();
    contexto.shadowBlur = 55;
    contexto.shadowColor = "#0000FF";
    contexto.translate(canvas.width - 100,canvas.height - 100);
    contexto.rotate(giro * Math.PI/180);
    contexto.drawImage(portal,-portal.width / 2, -portal.height / 2);
    contexto.restore();
    contexto.closePath();
}

const ganarJuego = () =>{
    if (naveX + naveHeight > canvas.width - 100 && naveX < canvas.width - 100 + 1 && naveY + naveHeight > canvas.height - 100 && naveY < canvas.height - 100 + 1){
        alert("WIN");
    }
}

const disparar = () =>{ //CON CADA PULSACIÓN DE ESPACIO, GUARDO UN OBJETO DISPARO EN EL ARRAY. ESTO HACE QUE CADA DISPARO PUEDA FUNCIONAR DE MANERA INDEPENDIENTE
    sonidoDisparo.currentTime = 0.25;
    let disparo = {
        x: naveX+naveWidth/2-disparoWidth/2,
        y: naveY+naveHeight/2-disparoHeight/2,//HACE QUE LOS DISPAROS SALGAN DESDE EL CENTRO DE LA NAVE
        speedX: 0,
        speedY: 0,
        direccion: ""
    }
    if (haciaIzquierda) {
        disparo.direccion = "izquierda";
        velocidadX+=0.25;
    }
    if (haciaArriba) {
        disparo.direccion = "arriba";
        velocidadY+=0.25;
    }
    if (haciaDerecha) {
        disparo.direccion = "derecha";
        velocidadX-=0.25;
    }
    if (haciaAbajo) {
        disparo.direccion = "abajo";
        velocidadY-=0.25;
    }
    disparos.push(disparo);
    sonidoDisparo.play();
}

const pintarDisparo = () =>{ // RECORRO EL ARRAY DE ESPACIOS CUANDO NO ESTÁ VACIO Y PINTO TODOS LOS DISPAROS LANZADOS
    if (disparos.length != 0) {
        for (let i = 0; i < disparos.length; i++) {
            // CONTROLO LA COLISIÓN CON LOS BORDES
            if ((disparos[i].y + disparos[i].speedY) >= (0 + bordeArribaHeight) && (disparos[i].y + disparos[i].speedY) <= (canvas.height - bordeAbajoHeight- disparoHeight) && disparos[i].x + disparos[i].speedX > 0 + bordeIzquierdaWidth && disparos[i].x + disparos[i].speedX < canvas.width - bordeDerechaWidth - disparoWidth) {
                contexto.beginPath();
                contexto.rect(disparos[i].x + disparos[i].speedX, disparos[i].y + disparos[i].speedY, disparoWidth, disparoHeight);
                contexto.fillStyle = "#FF00AA";
                contexto.fill();    
                contexto.closePath();
                switch (disparos[i].direccion) {
                    case "izquierda":
                        disparos[i].speedX -= 5;
                        break;
                    case "arriba":
                        disparos[i].speedY -= 5;
                        break;
                    case "derecha":
                        disparos[i].speedX += 5;
                        break;
                    case "abajo":
                        disparos[i].speedY += 5;
                        break;
                    default:
                        break;
                };
            }
        }
    }
}

//CREO EVENTOS PARA PULSACIÓN DE TECLAS Y MOVIMIENTO DE NAVE
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
    if(e.keyCode == 32) {// SOLTAR EL ESPACIO PROVOCA DISPARO
        disparar();
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
    pintarObstaculos();
    //PINTAMOS CONTADOR DE VIDAS
    pintarContador();
    //PINTAMOS PORTAL
    pintarPortal();
    //PINTAMOS DISPARO
    pintarDisparo();

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
        resetearNave();
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
        resetearNave();
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
        resetearNave();
    }
    //MOVIMIENTO HACIA ABAJO
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
        resetearNave();
    };

    //COLISIONES
    deteccionColisionNave();
    deteccionColisionDisparos();

    //GANAMOS JUEGO
    ganarJuego();

    //CUANDO LLAMEMOS A LA FUNCIÓN, SE EJECUTARÁ EN BUCLE CON LA TASA DE REFRESCOS MÁXIMA QUE SOPORTE EL NAVEGADOR
    requestAnimationFrame(juego);

};

//INVOCAMOS LA FUNCION QUE GESTIONA EL FUNCIONAMIENTO DEL JUEGO
juego();



