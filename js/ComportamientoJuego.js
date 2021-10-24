//CLASE DONDE GESTIONO PINTAR OBJETOS EN LIENZO CANVAS Y COMPORTAMIENTOS DE DICHOS OBJETOS

import Constantes from "./Constantes.js";
let constantes = new Constantes();

import ResetearNave from "./controllers/ResetearNave.js";
let controllerResetearNave = new ResetearNave();

export default class ComportamientoJuego{

    constructor(){
        //VARIABLES DEL MOVIMIENTO DE LA NAVE
        this.velocidadX = 0;
        this.velocidadY = 0;
        this.haciaIzquierda = false;
        this.haciaArriba = true;
        this.haciaDerecha = false;
        this.haciaAbajo = false;

        //VARIABLES DE LOS ENEMIGOS
        this.enemigo = new Image();
        this.enemigo.src = './img/enemigo.png';
        this.enemigos = [
            {x: 30, y: 100, MovimientoX: 3, MovimientoY: 0},
            {x: 1001, y: 100, MovimientoX: 2, MovimientoY: 0}
        ];
        
        //VARIABLES DE LOS OBSTACULOS
        this.obstaculos = [];

        //VARIABLES DE LOS DISPAROS
        this.disparos = [];
        this.sonidoDisparo = new Audio();
        this.imagenDisparo = new Image();
        this.disparoWidth = 0;
        this.disparoHeight = 0;
        this.municionNave = 0;

        //VARIABLE DE LAS VIDAS DEL JUGADOR
        this.contador = 3;
    };

    inicializarNave(){
        this.contador -= 1;
        this.velocidadX = 0;
        this.velocidadY = 0;
        this.haciaDerecha = false;
        this.haciaIzquierda = false;
        this.haciaArriba = true;
        this.haciaAbajo = false;
        this.disparos = [];
    };

    aumentarContador(){
        this.contador += 1;
    };

    eliminarEnemigos(posicion){
        this.enemigos[posicion].x = -100;
        this.enemigos[posicion].y = -100;
        this.enemigos[posicion].MovimientoX = -100;
    };
    
    eliminarDisparos(posicion){
        this.disparos[posicion].x = -100;
        this.disparos[posicion].y = -100;
        this.disparos[posicion].speedX = -100;
        this.disparos[posicion].speedY = -100;
    };

    //PINTAR EN EL LIENZO
    pintarObstaculos = () =>{
        constantes.obstaculoMarginRight = 100;
        for (let i = 0; i < 5; i++) {// GUARDO OBJETOS EN UN ARRAY CON LAS POSICIONES QUE TENDRÁN LOS OBSTACULOS
            if (i%2 == 0) {// CREO LA ALTURA VARIABLE DE LOS OBSTACULOS
                constantes.obstaculoMarginTop = 260
            }else{
                constantes.obstaculoMarginTop = 0;
            }
            this.obstaculos[i] = {x:constantes.obstaculoUnoX + constantes.obstaculoMarginRight, y: constantes.obstaculoUnoY + constantes.obstaculoMarginTop};
            constantes.obstaculoMarginRight += 250;
        }
        for (let i = 0; i < this.obstaculos.length; i++) {// GENERO LOS OBSTACULOS CON LAS POSICIONES GUARDADAS EN EL ARRAY DE OBJETOS
            constantes.contexto.beginPath();
            constantes.contexto.rect(this.obstaculos[i].x, this.obstaculos[i].y, constantes.obstaculoUnoWidth, constantes.obstaculoUnoHeight);
            constantes.contexto.fillStyle = "#8B0200";
            constantes.contexto.fill();
            constantes.contexto.closePath();
        }
    };

    pintarDisparo = (naveElegida) =>{
        this.imagenDisparo.src = naveElegida.disparo;
        // RECORRO EL ARRAY DE DISPAROS CUANDO NO ESTÁ VACIO Y PINTO TODOS LOS this.DISPAROS LANZADOS
        if (this.disparos.length != 0) {
            for (let i = 0; i < this.disparos.length; i++) {
                // CONTROLO LA COLISIÓN CON LOS BORDES
                if ((this.disparos[i].y + this.disparos[i].speedY) >= (0 + constantes.bordeArribaHeight) && (this.disparos[i].y + this.disparos[i].speedY) <= (constantes.canvas.height - constantes.bordeAbajoHeight- naveElegida.disparoTamaño) && this.disparos[i].x + this.disparos[i].speedX > 0 + constantes.bordeIzquierdaWidth && this.disparos[i].x + this.disparos[i].speedX < constantes.canvas.width - constantes.bordeDerechaWidth - naveElegida.disparoTamaño) {
                    constantes.contexto.beginPath();
                    constantes.contexto.drawImage(this.imagenDisparo, this.disparos[i].x + this.disparos[i].speedX, this.disparos[i].y + this.disparos[i].speedY, naveElegida.disparoTamaño, naveElegida.disparoTamaño);
                    constantes.contexto.fill();    
                    constantes.contexto.closePath();
                    switch (this.disparos[i].direccion) {
                        case "izquierda":
                            this.disparos[i].speedX -= naveElegida.disparoVelocidad;
                            break;
                        case "arriba":
                            this.disparos[i].speedY -= naveElegida.disparoVelocidad;
                            break;
                        case "derecha":
                            this.disparos[i].speedX += naveElegida.disparoVelocidad;
                            break;
                        case "abajo":
                            this.disparos[i].speedY += naveElegida.disparoVelocidad;
                            break;
                        default:
                            break;
                    };
                }
            }
        }
    };

    //DISPARAR
    disparar = (naveElegida) =>{ //CON CADA PULSACIÓN DE ESPACIO, GUARDO UN OBJETO DISPARO EN EL ARRAY. ESTO HACE QUE CADA DISPARO PUEDA FUNCIONAR DE MANERA INDEPENDIENTE
        if(naveElegida.municion != 0){
            this.sonidoDisparo.src = naveElegida.disparoSonido;
            this.sonidoDisparo.currentTime = 0.25;
            let disparo = {
                x: naveElegida.naveX + naveElegida.naveWidth/2 - naveElegida.disparoTamaño/2,
                y: naveElegida.naveY+ naveElegida.naveHeight/2 - naveElegida.disparoTamaño/2,//HACE QUE LOS DISPAROS SALGAN DESDE EL CENTRO DE LA NAVE
                speedX: 0,
                speedY: 0,
                direccion: ""
            }
            if (this.haciaIzquierda) {
                disparo.direccion = "izquierda";
                this.velocidadX+=0.25;
            }
            if (this.haciaArriba) {
                disparo.direccion = "arriba";
                this.velocidadY+=0.25;
            }
            if (this.haciaDerecha) {
                disparo.direccion = "derecha";
                this.velocidadX-=0.25;
            }
            if (this.haciaAbajo) {
                disparo.direccion = "abajo";
                this.velocidadY-=0.25;
            }
            this.disparos.push(disparo);
            naveElegida.municion--;
            this.sonidoDisparo.play();
        };
    };

};