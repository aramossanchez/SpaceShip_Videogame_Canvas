// AUTOR: ARMANDO RAMOS SÁNCHEZ
// VERSION: 1.0

//IMPORTO LA CLASE NAVE, PARA PODER CREAR OBJETOS NAVE
import Nave from "./Nave.js";

//IMPORTO VARIABLES
import Constantes from "./Constantes.js";
let constantes = new Constantes();

//IMPORTO FUNCIONES PARA DIBUJAR OBJETOS EN LIENZO
import ComportamientoJuego from "./ComportamientoJuego.js";
let comportamientoJuego = new ComportamientoJuego();

//IMPORTO LA CLASE JUEGO

//MUESTRO TODAS LAS NAVES EN LA PANTALLA DE SELECCIÓN
for (let i = 0; i < constantes.navesPosibles.length; i++) {
    document.getElementById(`nave${i}`).innerHTML = `<div><span>Name:</span> ${constantes.navesPosibles[i][0]}</div><img src="${constantes.navesPosibles[i][12]}"><div><span>Aceleration:</span> ${constantes.navesPosibles[i][5]*100}</div><div><span>Max Speed:</span> ${constantes.navesPosibles[i][4]*100}</div>`;
}

//INICIALIZO LA VARIABLE DE LA NAVE ELEGIDA CON LA PRIMERA NAVE, PARA QUE CARGUE TODO EL JUEGO SIN ERRORES
let naveElegida = new Nave(constantes.navesPosibles[0][0], constantes.navesPosibles[0][1], constantes.navesPosibles[0][2], constantes.navesPosibles[0][3], constantes.navesPosibles[0][4], constantes.navesPosibles[0][5], constantes.navesPosibles[0][6], constantes.navesPosibles[0][7], constantes.navesPosibles[0][8], constantes.navesPosibles[0][9], constantes.navesPosibles[0][10], constantes.navesPosibles[0][11], constantes.navesPosibles[0][12], constantes.navesPosibles[0][13], constantes.navesPosibles[0][14], constantes.navesPosibles[0][15], constantes.navesPosibles[0][16]);

const instanciarNave = (nave) => {
    naveElegida = new Nave(constantes.navesPosibles[nave][0], constantes.navesPosibles[nave][1], constantes.navesPosibles[nave][2], constantes.navesPosibles[nave][3], constantes.navesPosibles[nave][4], constantes.navesPosibles[nave][5], constantes.navesPosibles[nave][6], constantes.navesPosibles[nave][7], constantes.navesPosibles[nave][8], constantes.navesPosibles[nave][9], constantes.navesPosibles[nave][10], constantes.navesPosibles[nave][11], constantes.navesPosibles[nave][12], constantes.navesPosibles[nave][13], constantes.navesPosibles[nave][14], constantes.navesPosibles[nave][15], constantes.navesPosibles[nave][16]);
    municionNave = constantes.navesPosibles[nave][9]; //GUARDO LA MUNICION MAXIMA DE LA NAVE EN UNA VARIABLE A PARTE (CLAVE PARA PODER TENER SISTEMA DE RECARGA DE MUNICION)
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
    document.getElementById("boton-jugar").style.top = "-150%";
    let casillasSeleccionNave = document.getElementsByClassName("seleccion-nave");
    for (let i = 0; i < casillasSeleccionNave.length; i++) {
        casillasSeleccionNave[i].style.pointerEvents = "initial";
        casillasSeleccionNave[i].style.opacity = 1;
    }
};

//TRAIGO IMAGEN DE LA NAVE
var naveArriba = new Image();

var naveAbajo = new Image();

var naveIzquierda = new Image();

var naveDerecha = new Image();

//CREO VARIABLES PARA EL MOVIMIENTO DE LA NAVE

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

var sonidoDisparo = new Audio();

var imagenDisparo = new Image();

var municionNave = 5;// SE GUARDARÁ LA MUNICIÓN MAXIMA DEL DISPARO DE LA NAVE SELECCIONADA

//CREO VARIABLE PARA LLEVAR UN CONTEO DE LAS VIDAS
var contador = 3;

//CREO VARIABLE DE ENEMIGO
let enemigos = [
    {x: 30, y: 100, MovimientoX: 3, MovimientoY: 0},
    {x: 1001, y: 100, MovimientoX: 2, MovimientoY: 0}
];

//CREO VARIABLE DE VIDA RECOGIBLE
var vida = new Image();
vida.src = './img/vida.png';

let vidaRecogible = {x:constantes.canvas.width/2 - 35, y: 100};

 ////////////////////////////////////////////////////////////////////////////////////
const resetearNave = () =>{
    contador--;
    naveElegida.naveX = 50;
    naveElegida.naveY = 550;
    comportamientoJuego.velocidadX = 0;
    comportamientoJuego.velocidadY = 0;
    haciaDerecha = false;
    haciaIzquierda = false;
    haciaArriba = true;
    haciaAbajo = false;
    comportamientoJuego.disparos = [];
    if (contador < 0) {
        window.location.reload();
    }
};



const deteccionColisionEnemigos = () => {
    for (let i = 0; i < enemigos.length; i++) {
        if (naveElegida.naveX + naveElegida.naveWidth > enemigos[i].x && naveElegida.naveY < enemigos[i].y + 50 && naveElegida.naveX < enemigos[i].x + 50 && naveElegida.naveY + naveElegida.naveHeight > enemigos[i].y) {
            resetearNave();
        };
    }
};

const ganarJuego = () =>{
    if (naveElegida.naveX + naveElegida.naveHeight > constantes.canvas.width - 100 && naveElegida.naveX < constantes.canvas.width - 100 + 1 && naveElegida.naveY + naveElegida.naveHeight > constantes.canvas.height - 100 && naveElegida.naveY < constantes.canvas.height - 100 + 1){
        alert("WIN");
    }
}

const disparar = () =>{ //CON CADA PULSACIÓN DE ESPACIO, GUARDO UN OBJETO DISPARO EN EL ARRAY. ESTO HACE QUE CADA DISPARO PUEDA FUNCIONAR DE MANERA INDEPENDIENTE
    if(naveElegida.municion != 0){
        sonidoDisparo.src = naveElegida.disparoSonido;
        sonidoDisparo.currentTime = 0.25;
        let disparo = {
            x: naveElegida.naveX + naveElegida.naveWidth/2 - disparoWidth/2,
            y: naveElegida.naveY+ naveElegida.naveHeight/2 - disparoHeight/2,//HACE QUE LOS DISPAROS SALGAN DESDE EL CENTRO DE LA NAVE
            speedX: 0,
            speedY: 0,
            direccion: ""
        }
        if (haciaIzquierda) {
            disparo.direccion = "izquierda";
            comportamientoJuego.velocidadX+=0.25;
        }
        if (haciaArriba) {
            disparo.direccion = "arriba";
            comportamientoJuego.velocidadY+=0.25;
        }
        if (haciaDerecha) {
            disparo.direccion = "derecha";
            comportamientoJuego.velocidadX-=0.25;
        }
        if (haciaAbajo) {
            disparo.direccion = "abajo";
            comportamientoJuego.velocidadY-=0.25;
        }
        comportamientoJuego.disparos.push(disparo);
        naveElegida.municion--;
        sonidoDisparo.play();
    };
};

const recargar = () =>{
    if (naveElegida.municion == 0) {
        naveElegida.municion = municionNave;
    }
};

const deteccionColisionVida = () => {
    if (naveElegida.naveX + naveElegida.naveWidth > vidaRecogible.x && naveElegida.naveY < vidaRecogible.y + 30 && naveElegida.naveX < vidaRecogible.x + 30 && naveElegida.naveY + naveElegida.naveHeight > vidaRecogible.y) {
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
    constantes.contexto.clearRect(0, 0, constantes.canvas.width, constantes.canvas.height);  

    // ASIGNAMOS VALORES A LAS VARIABLES QUE DEPENDEN DE QUÉ NAVE HAYAMOS ELEGIDO
    let naveWidth = naveElegida.naveWidth;
    let naveHeight = naveElegida.naveHeight;
    naveArriba.src = naveElegida.imagenArriba;
    naveAbajo.src = naveElegida.imagenAbajo;
    naveIzquierda.src = naveElegida.imagenIzquierda;
    naveDerecha.src = naveElegida.imagenDerecha;
    imagenDisparo.src = naveElegida.disparo;
    disparoWidth = naveElegida.disparoTamaño;
    disparoHeight = naveElegida.disparoTamaño;

    //PINTAMOS NAVE
    comportamientoJuego.pintarNave(haciaArriba, haciaAbajo, haciaIzquierda, haciaDerecha, naveElegida, naveArriba, naveAbajo, naveIzquierda, naveDerecha, naveElegida.naveX, naveElegida.naveY, naveWidth, naveHeight);
    
    //PINTAMOS BORDES
    comportamientoJuego.pintarBordes();
    
    //PINTAMOS PRIMER OBSTACULO
    comportamientoJuego.pintarObstaculos();
    
    //PINTAMOS CONTADOR DE VIDAS
    comportamientoJuego.pintarContador(contador);
    
    //PINTAR MUNICION
    comportamientoJuego.pintarMunicion(naveElegida, municionNave);
    
    //PINTAMOS PORTAL
    comportamientoJuego.pintarPortal();
    
    //PINTAMOS DISPARO
    comportamientoJuego.pintarDisparo(disparoHeight, disparoWidth, imagenDisparo, naveElegida);
    
    //PINTAMOS ENEMIGOS
    comportamientoJuego.pintarEnemigos(enemigos);
    
    //PINTAMOS VIDA EN EL MAPA
    comportamientoJuego.pintarVidaRecogible(vida, vidaRecogible);
    
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
    //GESTIONO MOVIMIENTO DE LA NAVE Y COLISION CON BORDES
    if(izquierdaPulsado){
        haciaArriba = false;
        haciaAbajo = false;
        haciaIzquierda = true;
        haciaDerecha = false;
        if (comportamientoJuego.velocidadX > -naveElegida.velocidadMaxima){
            comportamientoJuego.velocidadX -= naveElegida.aceleracion;
        };
        naveElegida.naveX += comportamientoJuego.velocidadX;
    };
    if(!izquierdaPulsado){
        naveElegida.naveX += comportamientoJuego.velocidadX;
    };
    if(naveElegida.naveX <= 0 + constantes.bordeIzquierdaWidth){
        resetearNave();
    }
    //MOVIMIENTO HACIA ARRIBA
    if(arribaPulsado){
        haciaArriba = true;
        haciaAbajo = false;
        haciaIzquierda = false;
        haciaDerecha = false;
        if (comportamientoJuego.velocidadY > -naveElegida.velocidadMaxima){
            comportamientoJuego.velocidadY -= naveElegida.aceleracion;
        };
        naveElegida.naveY += comportamientoJuego.velocidadY;
    };
    if(!arribaPulsado){
        naveElegida.naveY += comportamientoJuego.velocidadY;
    };
    if(naveElegida.naveY <= 0 + constantes.bordeArribaHeight){
        resetearNave();
    }
    //MOVIMIENTO HACIA DERECHA
    if(derechaPulsado){
        haciaArriba = false;
        haciaAbajo = false;
        haciaIzquierda = false;
        haciaDerecha = true;
        if (comportamientoJuego.velocidadX < naveElegida.velocidadMaxima){
            comportamientoJuego.velocidadX += naveElegida.aceleracion;
        }
        naveElegida.naveX += comportamientoJuego.velocidadX;
    };
    if(!derechaPulsado){
        naveElegida.naveX += comportamientoJuego.velocidadX;
    };
    if(naveElegida.naveX >= constantes.canvas.width - naveHeight - constantes.bordeDerechaWidth){
        resetearNave();
    }
    //MOVIMIENTO HACIA ABAJO
    if(abajoPulsado){
        haciaArriba = false;
        haciaAbajo = true;
        haciaIzquierda = false;
        haciaDerecha = false;
        if (comportamientoJuego.velocidadY < naveElegida.velocidadMaxima){
            comportamientoJuego.velocidadY += naveElegida.aceleracion;
        };
        naveElegida.naveY += comportamientoJuego.velocidadY;
    };
    if(!abajoPulsado){
        naveElegida.naveY += comportamientoJuego.velocidadY;
    };
    if(naveElegida.naveY >= constantes.canvas.height - naveHeight - constantes.bordeAbajoHeight){
        resetearNave();
    };

    //COLISIONES
    comportamientoJuego.deteccionColisionNave(naveElegida);
    comportamientoJuego.deteccionColisionDisparos(disparoWidth, disparoHeight);
    deteccionColisionEnemigos(enemigos);
    comportamientoJuego.colisionDisparoConEnemigo(disparoHeight, disparoWidth, enemigos);
    deteccionColisionVida();

    //GANAMOS JUEGO
    ganarJuego();

    //CUANDO LLAMEMOS A LA FUNCIÓN, SE EJECUTARÁ EN BUCLE CON LA TASA DE REFRESCOS MÁXIMA QUE SOPORTE EL NAVEGADOR
    requestAnimationFrame(juego);

};

//INVOCAMOS LA FUNCION QUE GESTIONA EL FUNCIONAMIENTO DEL JUEGO

//GESTIONO EL COMPORTAMIENTO DE CLICKAR EN EL LISTADO DE NAVES
document.getElementById("nave0").addEventListener("click", () =>{instanciarNave(0)}, false);
document.getElementById("nave1").addEventListener("click", () =>{instanciarNave(1)}, false);
document.getElementById("nave2").addEventListener("click", () =>{instanciarNave(2)}, false);
document.getElementById("nave3").addEventListener("click", () =>{instanciarNave(3)}, false);

//GESTIONO EL COMPORTAMIENTO DE LOS BOTONES YES Y NO TRAS ELEGIR NAVE
document.getElementById("YES").addEventListener("click", () =>{cambiarPantalla(1); juego();}, false);
document.getElementById("NO").addEventListener("click", cerrarMensaje, false);