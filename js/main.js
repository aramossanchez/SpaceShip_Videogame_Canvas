// AUTOR: ARMANDO RAMOS SÁNCHEZ
// VERSION: 1.0

//IMPORTO LA CLASE NAVE, PARA PODER CREAR OBJETOS NAVE
import Nave from "./Nave.js";

//IMPORTO VARIABLES
import Constantes from "./Constantes.js";
let constantes = new Constantes();

//IMPORTO FUNCIONES PARA DIBUJAR OBJETOS EN LIENZO Y COMPORTAMIENTO DE OBJETOS
import ComportamientoJuego from "./ComportamientoJuego.js";
let comportamientoJuego = new ComportamientoJuego();

//IMPORTO DRAWERS
import PintarNave from "./drawers/PintarNave.js";
let drawerNave = new PintarNave();

import PintarBordes from "./drawers/PintarBordes.js";
let drawerBordes = new PintarBordes();

import PintarContador from "./drawers/PintarContador.js";
let drawerContador = new PintarContador();

import PintarMunicion from "./drawers/PintarMunicion.js";
let drawerMunicion = new PintarMunicion();

import PintarPortal from "./drawers/PintarPortal.js";
let drawerPortal = new PintarPortal();

import PintarVidaRecogible from "./drawers/PintarVidaRecogible.js";
let drawerVidaRecogible = new PintarVidaRecogible();

//IMPORTO CONTROLLERS
import RecargarMunicion from "./controllers/RecargarMunicion.js";
let controllerRecargarMunicion = new RecargarMunicion();

import GanarJuego from "./controllers/GanarJuego.js";
let controllerGanarJuego = new GanarJuego();

import ColisionNaveVida from "./controllers/ColisionNaveVida.js";
let controllerColisionNaveVida = new ColisionNaveVida;

//MUESTRO TODAS LAS NAVES EN LA PANTALLA DE SELECCIÓN
for (let i = 0; i < constantes.navesPosibles.length; i++) {
    document.getElementById(`nave${i}`).innerHTML = `<div><span>Name:</span> ${constantes.navesPosibles[i][0]}</div><img src="${constantes.navesPosibles[i][12]}"><div><span>Aceleration:</span> ${constantes.navesPosibles[i][5]*100}</div><div><span>Max Speed:</span> ${constantes.navesPosibles[i][4]*100}</div>`;
}

//INICIALIZO LA VARIABLE DE LA NAVE ELEGIDA CON LA PRIMERA NAVE, PARA QUE CARGUE TODO EL JUEGO SIN ERRORES
let naveElegida = new Nave(constantes.navesPosibles[0][0], constantes.navesPosibles[0][1], constantes.navesPosibles[0][2], constantes.navesPosibles[0][3], constantes.navesPosibles[0][4], constantes.navesPosibles[0][5], constantes.navesPosibles[0][6], constantes.navesPosibles[0][7], constantes.navesPosibles[0][8], constantes.navesPosibles[0][9], constantes.navesPosibles[0][10], constantes.navesPosibles[0][11], constantes.navesPosibles[0][12], constantes.navesPosibles[0][13], constantes.navesPosibles[0][14], constantes.navesPosibles[0][15], constantes.navesPosibles[0][16]);

const instanciarNave = (nave) => {
    naveElegida = new Nave(constantes.navesPosibles[nave][0], constantes.navesPosibles[nave][1], constantes.navesPosibles[nave][2], constantes.navesPosibles[nave][3], constantes.navesPosibles[nave][4], constantes.navesPosibles[nave][5], constantes.navesPosibles[nave][6], constantes.navesPosibles[nave][7], constantes.navesPosibles[nave][8], constantes.navesPosibles[nave][9], constantes.navesPosibles[nave][10], constantes.navesPosibles[nave][11], constantes.navesPosibles[nave][12], constantes.navesPosibles[nave][13], constantes.navesPosibles[nave][14], constantes.navesPosibles[nave][15], constantes.navesPosibles[nave][16]);
    controllerRecargarMunicion.municionNave = constantes.navesPosibles[nave][9]; //GUARDO LA MUNICION MAXIMA DE LA NAVE EN UNA VARIABLE A PARTE (CLAVE PARA PODER TENER SISTEMA DE RECARGA DE MUNICION)
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
        comportamientoJuego.disparar(naveElegida);
    }
    if(e.keyCode == 17) {// SOLTAR LA TECLA CTRLIZQ PROVOCAR RECARGAR ARMA
        controllerRecargarMunicion.recargar(naveElegida);
    }

}

document.addEventListener("keydown", pulsarTecla, false);
document.addEventListener("keyup", levantarTecla, false);

//FUNCIONAMIENTO DEL JUEGO
const juego = () =>{
    //SE BORRA TODO EL CONTENIDO DEL CANVAS DENTRO DE SUS MARGENES. COORDENADAS X E Y DE ESQUINA SUPERIRO IZQUIERDA Y COORDENADAS X E Y DE ESQUINA INFERIOR DERECHA DE UN RECTANGULO
    constantes.contexto.clearRect(0, 0, constantes.canvas.width, constantes.canvas.height);  

    // ASIGNAMOS VALORES A LAS VARIABLES QUE DEPENDEN DE QUÉ NAVE HAYAMOS ELEGIDO
    naveArriba.src = naveElegida.imagenArriba;
    naveAbajo.src = naveElegida.imagenAbajo;
    naveIzquierda.src = naveElegida.imagenIzquierda;
    naveDerecha.src = naveElegida.imagenDerecha;

    //PINTAMOS NAVE
    drawerNave.pintarNave(naveElegida, naveArriba, naveAbajo, naveIzquierda, naveDerecha, comportamientoJuego.haciaIzquierda, comportamientoJuego.haciaArriba, comportamientoJuego.haciaDerecha, comportamientoJuego.haciaAbajo);
    
    //PINTAMOS BORDES
    drawerBordes.pintarBordes();
    
    //PINTAMOS PRIMER OBSTACULO
    comportamientoJuego.pintarObstaculos();
    
    //PINTAMOS CONTADOR DE VIDAS
    drawerContador.pintarContador(comportamientoJuego.contador);
    
    //PINTAR MUNICION
    drawerMunicion.pintarMunicion(naveElegida, controllerRecargarMunicion.municionNave);
    
    //PINTAMOS PORTAL
    drawerPortal.pintarPortal();
    
    //PINTAMOS DISPARO
    comportamientoJuego.pintarDisparo(naveElegida);
    
    //PINTAMOS ENEMIGOS
    comportamientoJuego.pintarEnemigos();
    
    //PINTAMOS VIDA EN EL MAPA
    drawerVidaRecogible.pintarVidaRecogible();
    
    //GESTIONAMOS MOVIMIENTO DE ENEMIGOS
    for (let i = 0; i <  comportamientoJuego.enemigos.length; i++) {
         comportamientoJuego.enemigos[i].x +=  comportamientoJuego.enemigos[i].MovimientoX;
    }
    // ES NECESARIO GESTIONAR CADA ENEMIGO POR SEPARADO, NO SE REALIZA CORRECTAMENTE RECORRIENDO EL ARRAY CON FOR
    if ( comportamientoJuego.enemigos[0].x >= 380) {
         comportamientoJuego.enemigos[0].MovimientoX = - comportamientoJuego.enemigos[0].MovimientoX;
         comportamientoJuego.enemigos[0].x = 379;
    }
    if ( comportamientoJuego.enemigos[0].x <= 40) {
         comportamientoJuego.enemigos[0].MovimientoX = - comportamientoJuego.enemigos[0].MovimientoX;
         comportamientoJuego.enemigos[0].x = 41;
    }
    if ( comportamientoJuego.enemigos[1].x >= 1350) {
         comportamientoJuego.enemigos[1].MovimientoX = - comportamientoJuego.enemigos[1].MovimientoX;
         comportamientoJuego.enemigos[1].x = 1349;
    }
    if ( comportamientoJuego.enemigos[1].x <= 1000) {
         comportamientoJuego.enemigos[1].MovimientoX = - comportamientoJuego.enemigos[1].MovimientoX;
         comportamientoJuego.enemigos[1].x = 1001;
    }
    //GESTIONO MOVIMIENTO DE LA NAVE Y COLISION CON BORDES
    if(izquierdaPulsado){
        comportamientoJuego.haciaArriba = false;
        comportamientoJuego.haciaAbajo = false;
        comportamientoJuego.haciaIzquierda = true;
        comportamientoJuego.haciaDerecha = false;
        if (comportamientoJuego.velocidadX > -naveElegida.velocidadMaxima){
            comportamientoJuego.velocidadX -= naveElegida.aceleracion;
        };
        naveElegida.naveX += comportamientoJuego.velocidadX;
    };
    if(!izquierdaPulsado){
        naveElegida.naveX += comportamientoJuego.velocidadX;
    };
    if(naveElegida.naveX <= 0 + constantes.bordeIzquierdaWidth){
        comportamientoJuego.resetearNave(naveElegida);
    }
    //MOVIMIENTO HACIA ARRIBA
    if(arribaPulsado){
        comportamientoJuego.haciaArriba = true;
        comportamientoJuego.haciaAbajo = false;
        comportamientoJuego.haciaIzquierda = false;
        comportamientoJuego.haciaDerecha = false;
        if (comportamientoJuego.velocidadY > -naveElegida.velocidadMaxima){
            comportamientoJuego.velocidadY -= naveElegida.aceleracion;
        };
        naveElegida.naveY += comportamientoJuego.velocidadY;
    };
    if(!arribaPulsado){
        naveElegida.naveY += comportamientoJuego.velocidadY;
    };
    if(naveElegida.naveY <= 0 + constantes.bordeArribaHeight){
        comportamientoJuego.resetearNave(naveElegida);
    }
    //MOVIMIENTO HACIA DERECHA
    if(derechaPulsado){
        comportamientoJuego.haciaArriba = false;
        comportamientoJuego.haciaAbajo = false;
        comportamientoJuego.haciaIzquierda = false;
        comportamientoJuego.haciaDerecha = true;
        if (comportamientoJuego.velocidadX < naveElegida.velocidadMaxima){
            comportamientoJuego.velocidadX += naveElegida.aceleracion;
        }
        naveElegida.naveX += comportamientoJuego.velocidadX;
    };
    if(!derechaPulsado){
        naveElegida.naveX += comportamientoJuego.velocidadX;
    };
    if(naveElegida.naveX >= constantes.canvas.width - naveElegida.naveHeight - constantes.bordeDerechaWidth){
        comportamientoJuego.resetearNave(naveElegida);
    }
    //MOVIMIENTO HACIA ABAJO
    if(abajoPulsado){
        comportamientoJuego.haciaArriba = false;
        comportamientoJuego.haciaAbajo = true;
        comportamientoJuego.haciaIzquierda = false;
        comportamientoJuego.haciaDerecha = false;
        if (comportamientoJuego.velocidadY < naveElegida.velocidadMaxima){
            comportamientoJuego.velocidadY += naveElegida.aceleracion;
        };
        naveElegida.naveY += comportamientoJuego.velocidadY;
    };
    if(!abajoPulsado){
        naveElegida.naveY += comportamientoJuego.velocidadY;
    };
    if(naveElegida.naveY >= constantes.canvas.height - naveElegida.naveHeight - constantes.bordeAbajoHeight){
        comportamientoJuego.resetearNave(naveElegida);
    };

    //COLISIONES
    comportamientoJuego.deteccionColisionNave(naveElegida);
    comportamientoJuego.deteccionColisionDisparos(naveElegida);
    comportamientoJuego.deteccionColisionEnemigos(naveElegida);
    comportamientoJuego.colisionDisparoConEnemigo(naveElegida);
    controllerColisionNaveVida.deteccionColisionVida(naveElegida, comportamientoJuego, drawerVidaRecogible.vidaRecogible);
    console.log(comportamientoJuego.contador);

    //GANAMOS JUEGO
    controllerGanarJuego.ganarJuego(naveElegida);

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