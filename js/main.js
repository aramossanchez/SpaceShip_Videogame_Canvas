// AUTOR: ARMANDO RAMOS SÁNCHEZ
// VERSION: 1.0

//IMPORTO LA CLASE NAVE, PARA PODER CREAR OBJETOS NAVE
import Nave from "./Nave.js";

//IMPORTO VARIABLES
import Variables from "./Variables.js";
let variables = new Variables();

//IMPORTO FUNCIONES PARA DIBUJAR OBJETOS EN LIENZO
import Pintar from "./Pintar.js";
let pintar = new Pintar();



//MUESTRO TODAS LAS NAVES EN LA PANTALLA DE SELECCIÓN
for (let i = 0; i < variables.navesPosibles.length; i++) {
    document.getElementById(`nave${i}`).innerHTML = `<div><span>Name:</span> ${variables.navesPosibles[i][0]}</div><img src="${variables.navesPosibles[i][10]}"><div><span>Aceleration:</span> ${variables.navesPosibles[i][3]*100}</div><div><span>Max Speed:</span> ${variables.navesPosibles[i][2]*100}</div>`;
}

//INICIALIZO LA VARIABLE DE LA NAVE ELEGIDA CON LA PRIMERA NAVE, PARA QUE CARGUE TODO EL JUEGO SIN ERRORES
let naveElegida = new Nave(variables.navesPosibles[0][0], variables.navesPosibles[0][1], variables.navesPosibles[0][2], variables.navesPosibles[0][3], variables.navesPosibles[0][4], variables.navesPosibles[0][5], variables.navesPosibles[0][6], variables.navesPosibles[0][7], variables.navesPosibles[0][8], variables.navesPosibles[0][9], variables.navesPosibles[0][10], variables.navesPosibles[0][11], variables.navesPosibles[0][12], variables.navesPosibles[0][13], variables.navesPosibles[0][14]);

const instanciarNave = (nave) => {
    naveElegida = new Nave(variables.navesPosibles[nave][0], variables.navesPosibles[nave][1], variables.navesPosibles[nave][2], variables.navesPosibles[nave][3], variables.navesPosibles[nave][4], variables.navesPosibles[nave][5], variables.navesPosibles[nave][6], variables.navesPosibles[nave][7], variables.navesPosibles[nave][8], variables.navesPosibles[nave][9], variables.navesPosibles[nave][10], variables.navesPosibles[nave][11], variables.navesPosibles[nave][12], variables.navesPosibles[nave][13], variables.navesPosibles[0][14]);
    municionNave = variables.navesPosibles[nave][7]; //GUARDO LA MUNICION MAXIMA DE LA NAVE EN UNA VARIABLE A PARTE (CLAVE PARA PODER TENER SISTEMA DE RECARGA DE MUNICION)
    document.getElementById("boton-jugar").style.opacity = 1;
    document.getElementById("boton-jugar").style.top = "40%";
    document.getElementById("h2-boton-jugar").innerHTML = `You have selected <span>${naveElegida.nombre}</span>. Are you sure?`
    let casillasSeleccionNave = document.getElementsByClassName("seleccion-nave")
    for (let i = 0; i < casillasSeleccionNave.length; i++) {
        casillasSeleccionNave[i].style.pointerEvents = "none";
        casillasSeleccionNave[i].style.opacity = 0.5;
    };
};

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

var disparoWidth = 0;
var disparoHeight = 0;

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

 ////////////////////////////////////////////////////////////////////////////////////
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
};

//COLISIONES
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

const colisionDisparoConEnemigo = () =>{
    for (let i = 0; i < disparos.length; i++) {
        for (let a = 0; a < enemigos.length; a++) {
            // CONTROLO LA COLISIÓN CON LOS ENEMIGOS
            console.log("soy los disparos " + disparos[i]);
            console.log(enemigos[a]);
            if ((disparos[i].y + disparos[i].speedY) <= enemigos[a].y + 50 && disparos[i].y + disparos[i].speedY + disparoHeight >= enemigos[a].y && disparos[i].x + disparos[i].speedX <= enemigos[a].x + 50 && disparos[i].x + disparos[i].speedX + disparoWidth >= enemigos[a].x) {
                enemigos[a].x = -100;
                enemigos[a].y = -100;
                enemigos[a].MovimientoX = 0;
                disparos[i].x = -100;
                disparos[i].y = -100;
                disparos[i].speedY = 0;
                disparos[i].speedX = 0;
            };
        }
        
    }
};

const deteccionColisionVida = () => {
    if (naveX + naveWidth > vidaRecogible.x && naveY < vidaRecogible.y + 30 && naveX < vidaRecogible.x + 30 && naveY + naveHeight > vidaRecogible.y) {
        contador++;
        vidaRecogible.x = -100;
        vidaRecogible.y = -100;
    };
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
    pintar.pintarNave(contexto, haciaArriba, haciaAbajo, haciaIzquierda, haciaDerecha, naveElegida, naveArriba, naveAbajo, naveIzquierda, naveDerecha, naveX, naveY, naveWidth, naveHeight);
    //PINTAMOS BORDES
    pintar.pintarBordes(contexto, bordeIzquierdaWidth, bordeIzquierdaHeight, bordeArribaWidth, bordeArribaHeight, canvas, bordeDerechaWidth, bordeDerechaHeight, bordeAbajoHeight, bordeAbajoWidth);
    //PINTAMOS PRIMER OBSTACULO
    pintar.pintarObstaculos(obstaculoMarginRight, obstaculoMarginTop, obstaculos, contexto, obstaculoUnoWidth, obstaculoUnoHeight, obstaculoUnoX, obstaculoUnoY);
    //PINTAMOS CONTADOR DE VIDAS
    pintar.pintarContador(contexto, contador);
    //PINTAR MUNICION
    pintar.pintarMunicion(contexto, naveElegida, municionNave);
    //PINTAMOS PORTAL
    pintar.pintarPortal(giro, contexto, canvas, portal);
    giro = giro + 10;
    //PINTAMOS DISPARO
    pintar.pintarDisparo(disparos, contexto, bordeArribaHeight, canvas, bordeAbajoHeight, disparoHeight, bordeIzquierdaWidth, bordeDerechaWidth, disparoWidth, imagenDisparo, naveElegida);
    //PINTAMOS ENEMIGOS
    pintar.pintarEnemigos(contexto, enemigos, enemigo);
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
    pintar.pintarVidaRecogible(contexto, vida, vidaRecogible);


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

//GESTIONO EL COMPORTAMIENTO DE CLICKAR EN EL LISTADO DE NAVES
document.getElementById("nave0").addEventListener("click", () =>{instanciarNave(0)}, false);
document.getElementById("nave1").addEventListener("click", () =>{instanciarNave(1)}, false);
document.getElementById("nave2").addEventListener("click", () =>{instanciarNave(2)}, false);
document.getElementById("nave3").addEventListener("click", () =>{instanciarNave(3)}, false);

//GESTIONO EL COMPORTAMIENTO DE LOS BOTONES YES Y NO TRAS ELEGIR NAVE
document.getElementById("YES").addEventListener("click", () =>{cambiarPantalla(1)}, false);
document.getElementById("NO").addEventListener("click", cerrarMensaje, false);