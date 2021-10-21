// AUTOR: ARMANDO RAMOS SÁNCHEZ
// VERSION: 1.0

//ENTORNO

//CREO LA CLASE NAVE, DONDE CREO EL ESQUEMA DE TODAS LAS CARACTERÍSTICAS QUE TENDRÁ LA NAVE QUE ELIJAMOS
class Nave {

    constructor(nombre, colorBrillo, velocidadMaxima, aceleracion, naveWidth, naveHeight, disparo, municion, imagenIzquierda, imagenArriba, imagenDerecha, imagenAbajo, disparoTamaño, disparoSonido, disparoVelocidad){
        this.nombre = nombre,
        this.colorBrillo = colorBrillo,
        this.velocidadMaxima = velocidadMaxima,
        this.aceleracion = aceleracion,
        this.naveWidth = naveWidth,
        this.naveHeight = naveHeight,
        this.disparo = disparo,
        this.municion = municion,
        this.imagenIzquierda = imagenIzquierda,
        this.imagenArriba = imagenArriba,
        this.imagenDerecha = imagenDerecha,
        this.imagenAbajo = imagenAbajo,
        this.disparoTamaño = disparoTamaño,
        this.disparoSonido = disparoSonido,
        this.disparoVelocidad = disparoVelocidad
    }

};

//CREO VARIABLES Y METODO PARA SELECCIONAR LA NAVE CON LA QUE JUGAREMOS

//ARRAY CON TODAS LAS NAVES ELEGIBLES
let navesPosibles = [
    ["StartLink", "#FF0000", 5, 0.10, 45, 45, "./img/disparoStarLink.png", 5, "./img/StartLinkIzquierda.png", "./img/StartLinkArriba.png", "./img/StartLinkDerecha.png", "./img/StartLinkAbajo.png", 20, "./sound/disparoSpaceLink.wav", 5],
    ["Black Mamba", "#52C8FD", 6, 0.20, 30, 30, "./img/disparoBlackMamba.png", 10, "./img/BlackMambaIzquierda.png", "./img/BlackMambaArriba.png", "./img/BlackMambaDerecha.png", "./img/BlackMambaAbajo.png", 10, "./sound/disparoBlackMamba.wav", 7],
    ["Snasa", "#00FF7E", 2, 0.25, 50, 50, "./img/disparoSnasa.png", 1, "./img/SnasaIzquierda.png", "./img/SnasaArriba.png", "./img/SnasaDerecha.png", "./img/SnasaAbajo.png", 40, "./sound/disparoSnasa.wav", 3],
    ["Space Cat", "#FFFFFF", 6, 0.05, 70, 70, "./img/disparoSpaceCat.png", 3, "./img/SpaceCatIzquierda.png", "./img/SpaceCatArriba.png", "./img/SpaceCatDerecha.png", "./img/SpaceCatAbajo.png", 30, "./sound/disparoSpaceCat.wav", 8]
]

//PINTO TODAS LAS NAVES EN LA PANTALLA DE SELECCIÓN
for (let i = 0; i < navesPosibles.length; i++) {
    document.getElementById(`nave${i}`).innerHTML = `<div><span>Name:</span> ${navesPosibles[i][0]}</div><img src="${navesPosibles[i][10]}"><div><span>Aceleration:</span> ${navesPosibles[i][3]*100}</div><div><span>Max Speed:</span> ${navesPosibles[i][2]*100}</div>`;
}

//INICIALIZO LA VARIABLE DE LA NAVE ELEGIDA CON LA PRIMERA NAVE, PARA QUE CARGUE TODO EL JUEGO SIN ERRORES
let naveElegida = new Nave(navesPosibles[0][0], navesPosibles[0][1], navesPosibles[0][2], navesPosibles[0][3], navesPosibles[0][4], navesPosibles[0][5], navesPosibles[0][6], navesPosibles[0][7], navesPosibles[0][8], navesPosibles[0][9], navesPosibles[0][10], navesPosibles[0][11], navesPosibles[0][12], navesPosibles[0][13], navesPosibles[0][14]);

const instanciarNave = (nave) => {
    naveElegida = new Nave(navesPosibles[nave][0], navesPosibles[nave][1], navesPosibles[nave][2], navesPosibles[nave][3], navesPosibles[nave][4], navesPosibles[nave][5], navesPosibles[nave][6], navesPosibles[nave][7], navesPosibles[nave][8], navesPosibles[nave][9], navesPosibles[nave][10], navesPosibles[nave][11], navesPosibles[nave][12], navesPosibles[nave][13], navesPosibles[0][14]);
    municionNave = navesPosibles[nave][7];
    document.getElementById("boton-jugar").style.opacity = 1;
    document.getElementById("boton-jugar").style.top = "40%";
    document.getElementById("h2-boton-jugar").innerHTML = `You have selected <span>${naveElegida.nombre}</span>. Are you sure?`
    let casillasSeleccionNave = document.getElementsByClassName("seleccion-nave")
    for (let i = 0; i < casillasSeleccionNave.length; i++) {
        casillasSeleccionNave[i].style.pointerEvents = "none";
        casillasSeleccionNave[i].style.opacity = 0.5;
    }
}

//VARIABLES Y METODO PARA GESTIÓN DE CAMBIO DE PANTALLAS
let pantallas = [document.getElementById("pantalla-seleccion"), document.getElementById("game")];

const cambiarPantalla = (pantalla) =>{
    pantallas.filter(pantalla => pantalla.style.display = "none");
    pantallas[pantalla].style.display = "flex";
};

const cerrarMensaje = () => {
    document.getElementById("boton-jugar").style.opacity = 0;
    document.getElementById("boton-jugar").style.top = "-150%";let casillasSeleccionNave = document.getElementsByClassName("seleccion-nave")
    for (let i = 0; i < casillasSeleccionNave.length; i++) {
        casillasSeleccionNave[i].style.pointerEvents = "initial";
        casillasSeleccionNave[i].style.opacity = 1;
    }
}

//REFERENCIO CANVAS Y CREO CONTEXTO 2D
let canvas = document.getElementById("game");
let contexto = canvas.getContext("2d");

//CREO VARIABLES PARA LA NAVE
var naveWidth = 0;
var naveHeight = 0;
var naveX = 50;
var naveY = 550;

//TRAIGO IMAGEN DE LA NAVE
var naveArriba = new Image();

var naveAbajo = new Image();

var naveIzquierda = new Image();

var naveDerecha = new Image();

//CREO VARIABLES PARA LOS BORDES
var bordeIzquierdaWidth = 2.5;
var bordeIzquierdaHeight = canvas.height;

var bordeDerechaWidth = 2.5;
var bordeDerechaHeight = canvas.height;

var bordeArribaWidth = canvas.width;
var bordeArribaHeight = 2.5;

var bordeAbajoWidth = canvas.width;
var bordeAbajoHeight = 2.5;

//CREO VARIABLES PARA LOS OBSTACULOS
var obstaculos = [];
var obstaculoUnoX = 100;
var obstaculoUnoY = 40;
var obstaculoUnoWidth = 10;
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
var velocidadDisparoY = 0;

var disparoWidth = 0;
var disparoHeight = 0;

var disparoPulsado = false;

var disparos = [];

var sonidoDisparo = new Audio();

var imagenDisparo = new Image();

var municionNave = 5;// SE GUARDARÁ LA MUNICIÓN MAXIMA DEL DISPARO DE LA NAVE SELECCIONADA

//CREO VARIABLE PARA LLEVAR UN CONTEO DE LAS VIDAS
var contador = 3;

//CREO VARIABLE DE ENEMIGO
var enemigo = new Image();
enemigo.src = './img/enemigo.png';


let enemigos = [
    {x: 30, y: 100, MovimientoX: 3, MovimientoY: 0},
    {x: 1001, y: 100, MovimientoX: 2, MovimientoY: 0}
];

//CREO VARIABLE DE VIDA RECOGIBLE
var vida = new Image();
vida.src = './img/vida.png';

let vidaRecogible = {x:canvas.width/2 - 35, y: 100};

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
    contexto.shadowColor=naveElegida.colorBrillo;
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
    contexto.fillStyle = "#FFFFFF";
    contexto.fill();
    contexto.closePath();

    contexto.beginPath();
    contexto.rect(0, 0, bordeArribaWidth, bordeArribaHeight);
    contexto.fillStyle = "#FFFFFF";
    contexto.fill();
    contexto.closePath();

    contexto.beginPath();
    contexto.rect(canvas.width - bordeDerechaWidth, 0, bordeDerechaWidth, bordeDerechaHeight);
    contexto.fillStyle = "#FFFFFF";
    contexto.fill();
    contexto.closePath();

    contexto.beginPath();
    contexto.rect(0, canvas.height - bordeAbajoHeight, bordeAbajoWidth, bordeAbajoHeight);
    contexto.fillStyle = "#FFFFFF";
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
        contexto.fillStyle = "#8B0200";
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
            if(disparos[a].x + disparos[a].speedX > obstaculos[i].x - disparoWidth && disparos[a].x + disparos[a].speedX < obstaculos[i].x + obstaculoUnoWidth && disparos[a].y + disparos[a].speedY > obstaculos[i].y - disparoHeight && disparos[a].y + disparos[a].speedY < obstaculos[i].y + obstaculoUnoHeight){
                disparos[a].x = -100;
                disparos[a].y = -100;
            };
        };
    };
}

const deteccionColisionEnemigos = () => {
    for (let i = 0; i < enemigos.length; i++) {
        if (naveX + naveWidth > enemigos[i].x && naveY < enemigos[i].y + 50 && naveX < enemigos[i].x + 50 && naveY + naveHeight > enemigos[i].y) {
            resetearNave();
        };
    }
}

const pintarContador = () =>{
    contexto.beginPath();
    contexto.font = "30px Arial";
    contexto.fillStyle = "#FFBD00";
    contexto.fillText("Ships: " + contador, 30, 50);
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
    if(naveElegida.municion != 0){
        sonidoDisparo.src = naveElegida.disparoSonido;
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
        naveElegida.municion--;
        sonidoDisparo.play();
    };
};

const recargar = () =>{
    if (naveElegida.municion == 0) {
        naveElegida.municion = municionNave;
    }
}

const pintarDisparo = () =>{ // RECORRO EL ARRAY DE ESPACIOS CUANDO NO ESTÁ VACIO Y PINTO TODOS LOS DISPAROS LANZADOS
    if (disparos.length != 0) {
        for (let i = 0; i < disparos.length; i++) {
            // CONTROLO LA COLISIÓN CON LOS BORDES
            if ((disparos[i].y + disparos[i].speedY) >= (0 + bordeArribaHeight) && (disparos[i].y + disparos[i].speedY) <= (canvas.height - bordeAbajoHeight- disparoHeight) && disparos[i].x + disparos[i].speedX > 0 + bordeIzquierdaWidth && disparos[i].x + disparos[i].speedX < canvas.width - bordeDerechaWidth - disparoWidth) {
                contexto.beginPath();
                contexto.drawImage(imagenDisparo, disparos[i].x + disparos[i].speedX, disparos[i].y + disparos[i].speedY, disparoWidth, disparoHeight);
                contexto.fill();    
                contexto.closePath();
                switch (disparos[i].direccion) {
                    case "izquierda":
                        disparos[i].speedX -= naveElegida.disparoVelocidad;
                        break;
                    case "arriba":
                        disparos[i].speedY -= naveElegida.disparoVelocidad;
                        break;
                    case "derecha":
                        disparos[i].speedX += naveElegida.disparoVelocidad;
                        break;
                    case "abajo":
                        disparos[i].speedY += naveElegida.disparoVelocidad;
                        break;
                    default:
                        break;
                };
            }
        }
    }
};

const pintarMunicion = () => {
    contexto.beginPath();
    contexto.font = "30px Arial";
    contexto.fillStyle = "#FFBD00";
    contexto.fillText((naveElegida.municion != 0) ? `Municion: ${ naveElegida.municion}/${municionNave}`: "¡RECARGA!", 1100, 50);
    contexto.closePath();
}

const pintarEnemigos = () => {
    for (let i = 0; i < enemigos.length; i++) {
        contexto.beginPath();
        contexto.drawImage(enemigo, enemigos[i].x, enemigos[i].y, 50, 50);
        contexto.fill();    
        contexto.closePath();        
    }
};

const colisionDisparoConEnemigo = () =>{
    for (let i = 0; i < disparos.length; i++) {
        for (let a = 0; a < enemigos.length; a++) {
            // CONTROLO LA COLISIÓN CON LOS ENEMIGOS
            console.log("soy los disparos " + disparos[i]);
            console.log(enemigos[a]);
            if ((disparos[i].y + disparos[i].speedY) <= enemigos[a].y + 50 && disparos[i].y + disparos[i].speedY + disparoHeight >= enemigos[a].y && disparos[i].x + disparos[i].speedX <= enemigos[a].x + 50 && disparos[i].x + disparos[i].speedX + disparoWidth >= enemigos[a].x) {
                enemigos[a].x = -100;
                enemigos[a].y = -100;
                enemigoMovimientoX = 0;
                disparos[i].x = -100;
                disparos[i].y = -100;
                disparos[i].speedY = 0;
                disparos[i].speedX = 0;
            };
        }
        
    }
};

const pintarVidaRecogible = () =>{
    contexto.beginPath();
    contexto.save();
    contexto.shadowBlur = 25;
    contexto.shadowColor = "#FFFF00";
    contexto.drawImage(vida, vidaRecogible.x, vidaRecogible.y, 30, 30);
    contexto.fill();
    contexto.closePath();
    contexto.restore();
};

const deteccionColisionVida = () => {
    if (naveX + naveWidth > vidaRecogible.x && naveY < vidaRecogible.y + 30 && naveX < vidaRecogible.x + 30 && naveY + naveHeight > vidaRecogible.y) {
        contador++;
        vidaRecogible.x = -100;
        vidaRecogible.y = -100;
    }
};

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
    if(e.keyCode == 17) {// SOLTAR LA TECLA CTRLIZQ PROVOCAR RECARGAR ARMA
        recargar();
    }

}

document.addEventListener("keydown", pulsarTecla, false);
document.addEventListener("keyup", levantarTecla, false);

//FUNCIONAMIENTO DEL JUEGO
const juego = () =>{
    //SE BORRA TODO EL CONTENIDO DEL CANVAS DENTRO DE SUS MARGENES. COORDENADAS X E Y DE ESQUINA SUPERIRO IZQUIERDA Y COORDENADAS X E Y DE ESQUINA INFERIOR DERECHA DE UN RECTANGULO
    contexto.clearRect(0, 0, canvas.width, canvas.height);  

    // ASIGNAMOS VALORES A LAS VARIABLES QUE DEPENDEN DE QUÉ NAVE HAYAMOS ELEGIDO
    naveWidth = naveElegida.naveWidth;
    naveHeight = naveElegida.naveHeight;
    naveArriba.src = naveElegida.imagenArriba;
    naveAbajo.src = naveElegida.imagenAbajo;
    naveIzquierda.src = naveElegida.imagenIzquierda;
    naveDerecha.src = naveElegida.imagenDerecha;
    imagenDisparo.src = naveElegida.disparo;
    disparoWidth = naveElegida.disparoTamaño;
    disparoHeight = naveElegida.disparoTamaño;
    //PINTAMOS NAVE
    dibujarnave();
    //PINTAMOS BORDES
    pintarBordes();
    //PINTAMOS PRIMER OBSTACULO
    pintarObstaculos();
    //PINTAMOS CONTADOR DE VIDAS
    pintarContador();
    //PINTAR MUNICION
    pintarMunicion();
    //PINTAMOS PORTAL
    pintarPortal();
    //PINTAMOS DISPARO
    pintarDisparo();
    //PINTAMOS ENEMIGOS
    pintarEnemigos();
    //GESTIONAMOS MOVIMIENTO DE ENEMIGOS
    for (let i = 0; i < enemigos.length; i++) {
        enemigos[i].x += enemigos[i].MovimientoX;
    }
    // ES NECESARIO GESTIONAR CADA ENEMIGO POR SEPARADO, NO SE REALIZA CORRECTAMENTE RECORRIENDO EL ARRAY CON FOR
    if (enemigos[0].x >= 380) {
        enemigos[0].MovimientoX = -enemigos[0].MovimientoX;
        enemigos[0].x = 379;
    }
    if (enemigos[0].x <= 40) {
        enemigos[0].MovimientoX = -enemigos[0].MovimientoX;
        enemigos[0].x = 41;
    }
    if (enemigos[1].x >= 1350) {
        enemigos[1].MovimientoX = -enemigos[1].MovimientoX;
        enemigos[1].x = 1349;
    }
    if (enemigos[1].x <= 1000) {
        enemigos[1].MovimientoX = -enemigos[1].MovimientoX;
        enemigos[1].x = 1001;
    }
    //PINTAMOS VIDA EN EL MAPA
    pintarVidaRecogible();


    //GESTIONAMOS MOVIMIENTO DE LA NAVE

    //MOVIMIENTO HACIA LA IZQUIERDA
    if(izquierdaPulsado){
        haciaArriba = false;
        haciaAbajo = false;
        haciaIzquierda = true;
        haciaDerecha = false;
        if (velocidadX > -naveElegida.velocidadMaxima){
            velocidadX -= naveElegida.aceleracion;
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
        if (velocidadY > -naveElegida.velocidadMaxima){
            velocidadY -= naveElegida.aceleracion;
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
        if (velocidadX < naveElegida.velocidadMaxima){
            velocidadX += naveElegida.aceleracion;
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
        if (velocidadY < naveElegida.velocidadMaxima){
            velocidadY += naveElegida.aceleracion;
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
    deteccionColisionEnemigos();
    colisionDisparoConEnemigo();
    deteccionColisionVida();

    //GANAMOS JUEGO
    ganarJuego();

    //CUANDO LLAMEMOS A LA FUNCIÓN, SE EJECUTARÁ EN BUCLE CON LA TASA DE REFRESCOS MÁXIMA QUE SOPORTE EL NAVEGADOR
    requestAnimationFrame(juego);

};

//INVOCAMOS LA FUNCION QUE GESTIONA EL FUNCIONAMIENTO DEL JUEGO
juego();



