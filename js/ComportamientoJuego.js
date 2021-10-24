//CLASE DONDE GESTIONO PINTAR OBJETOS EN LIENZO CANVAS Y COMPORTAMIENTOS DE DICHOS OBJETOS

import Constantes from "./Constantes.js";
let constantes = new Constantes();

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

    aumentarContador(){
        this.contador += 1;
    }

    //PINTAR EN EL LIENZO
    pintarNave = (naveElegida, naveArriba, naveAbajo, naveIzquierda, naveDerecha) =>{    
        constantes.contexto.save()
        //BRILLO DE LA NAVE
        constantes.contexto.shadowBlur=35;
        if (this.haciaArriba) {
            constantes.contexto.shadowOffsetY=20;
        }
        if (this.haciaAbajo) {
            constantes.contexto.shadowOffsetY=-20;
        }
        if (this.haciaIzquierda) {
            constantes.contexto.shadowOffsetX=20;
        }
        if (this.haciaDerecha) {
            constantes.contexto.shadowOffsetX=-20;
        }
        constantes.contexto.shadowColor=naveElegida.colorBrillo;
        constantes.contexto.beginPath();
        //CAMBIA LA ORIENTACION DE LA NAVE
        if (this.haciaArriba) {
            constantes.contexto.drawImage(naveArriba, naveElegida.naveX, naveElegida.naveY, naveElegida.naveWidth, naveElegida.naveHeight);
        }
        if (this.haciaAbajo) {
            constantes.contexto.drawImage(naveAbajo, naveElegida.naveX, naveElegida.naveY, naveElegida.naveWidth, naveElegida.naveHeight);
        }
        if (this.haciaIzquierda) {
            constantes.contexto.drawImage(naveIzquierda, naveElegida.naveX, naveElegida.naveY, naveElegida.naveHeight, naveElegida.naveWidth);
        }
        if (this.haciaDerecha) {
            constantes.contexto.drawImage(naveDerecha, naveElegida.naveX, naveElegida.naveY, naveElegida.naveHeight, naveElegida.naveWidth);
        }
        constantes.contexto.fillStyle = "#AAAAAA";
        constantes.contexto.fill();
        constantes.contexto.closePath();
        constantes.contexto.restore();
    };

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

    pintarEnemigos = () => {
        for (let i = 0; i < this.enemigos.length; i++) {
            constantes.contexto.beginPath();
            constantes.contexto.drawImage(this.enemigo, this.enemigos[i].x, this.enemigos[i].y, 50, 50);
            constantes.contexto.fill();    
            constantes.contexto.closePath();        
        }
    };
    
    //COLISIONES
    resetearNave = (naveElegida) =>{
        this.contador--;
        naveElegida.naveX = 50;
        naveElegida.naveY = 550;
        this.velocidadX = 0;
        this.velocidadY = 0;
        this.haciaDerecha = false;
        this.haciaIzquierda = false;
        this.haciaArriba = true;
        this.haciaAbajo = false;
        this.disparos = [];
        if (this.contador < 0) {
            window.location.reload();
        }
    };
    deteccionColisionNave = (naveElegida) => {
        for (let i = 0; i < this.obstaculos.length; i++) {// RECORRO EL ARRAY DE OBJETOS E INDICO LAS COLISIONES PARA CADA UNO DE LOS OBJETOS GUARDADOS
            if(naveElegida.naveX + naveElegida.naveHeight > this.obstaculos[i].x && naveElegida.naveX < this.obstaculos[i].x + constantes.obstaculoUnoWidth && naveElegida.naveY + naveElegida.naveHeight > this.obstaculos[i].y && naveElegida.naveY < this.obstaculos[i].y + constantes.obstaculoUnoHeight){
                this.resetearNave(naveElegida);
            };
        }
    };

    deteccionColisionEnemigos = (naveElegida) => {
        for (let i = 0; i < this.enemigos.length; i++) {
            if (naveElegida.naveX + naveElegida.naveWidth > this.enemigos[i].x && naveElegida.naveY < this.enemigos[i].y + 50 && naveElegida.naveX < this.enemigos[i].x + 50 && naveElegida.naveY + naveElegida.naveHeight > this.enemigos[i].y) {
                this.resetearNave(naveElegida);
            };
        }
    };

    deteccionColisionDisparos = (naveElegida) => {
        for (let i = 0; i < this.obstaculos.length; i++) {// RECORRO EL ARRAY DE OBSTACULOS
            for (let a = 0; a < this.disparos.length; a++) {// RECORRO EL ARRAY DE DISPAROS            
                if(this.disparos[a].x + this.disparos[a].speedX > this.obstaculos[i].x - naveElegida.disparoTamaño && this.disparos[a].x + this.disparos[a].speedX < this.obstaculos[i].x + constantes.obstaculoUnoWidth && this.disparos[a].y + this.disparos[a].speedY > this.obstaculos[i].y - naveElegida.disparoTamaño && this.disparos[a].y + this.disparos[a].speedY < this.obstaculos[i].y + constantes.obstaculoUnoHeight){
                    this.disparos[a].x = -100;
                    this.disparos[a].y = -100;
                };
            };
        };
    };

    colisionDisparoConEnemigo = (naveElegida) =>{
        for (let i = 0; i < this.disparos.length; i++) {
            for (let a = 0; a < this.enemigos.length; a++) {
                // CONTROLO LA COLISIÓN CON LOS ENEMIGOS
                if ((this.disparos[i].y + this.disparos[i].speedY) <= this.enemigos[a].y + 50 && this.disparos[i].y + this.disparos[i].speedY + naveElegida.disparoTamaño >= this.enemigos[a].y && this.disparos[i].x + this.disparos[i].speedX <= this.enemigos[a].x + 50 && this.disparos[i].x + this.disparos[i].speedX + naveElegida.disparoTamaño >= this.enemigos[a].x) {
                    this.enemigos[a].x = -100;
                    this.enemigos[a].y = -100;
                    this.enemigos[a].MovimientoX = 0;
                    this.disparos[i].x = -100;
                    this.disparos[i].y = -100;
                    this.disparos[i].speedY = 0;
                    this.disparos[i].speedX = 0;
                };
            }
            
        }
    };

    deteccionColisionVida = (naveElegida) => {
        if (naveElegida.naveX + naveElegida.naveWidth > constantes.vidaRecogible.x && naveElegida.naveY < constantes.vidaRecogible.y + 30 && naveElegida.naveX < constantes.vidaRecogible.x + 30 && naveElegida.naveY + naveElegida.naveHeight > constantes.vidaRecogible.y) {
            this.contador++;
            constantes.vidaRecogible.x = -100;
            constantes.vidaRecogible.y = -100;
        };
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