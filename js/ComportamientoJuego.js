//CLASE DONDE GESTIONO PINTAR OBJETOS EN LIENZO CANVAS Y COMPORTAMIENTOS DE DICHOS OBJETOS

import Constantes from "./Constantes.js";
let constantes = new Constantes();

export default class ComportamientoJuego{

    constructor(){
        //VARIABLES DEL MOVIMIENTO DE LA NAVE
        this.velocidadX = 0;
        this.velocidadY = 0;

        //VARIABLES DEL PORTAL
        this.giro = 0;
        this.portal = new Image();
        this.portal.src = './img/portal.png';

        //VARIABLES DE LOS ENEMIGOS
        this.enemigo = new Image();
        this.enemigo.src = './img/enemigo.png';
        
        //VARIABLES DE LOS OBSTACULOS
        this.obstaculos = [];

        //VARIABLES DE LOS DISPAROS
        this.disparos = [];
    }

    //PINTAR EN EL LIENZO
    pintarNave = (haciaArriba, haciaAbajo, haciaIzquierda, haciaDerecha, naveElegida, naveArriba, naveAbajo, naveIzquierda, naveDerecha, naveX, naveY, naveWidth, naveHeight) =>{    
        constantes.contexto.save()
        //BRILLO DE LA NAVE
        constantes.contexto.shadowBlur=35;
        if (haciaArriba) {
            constantes.contexto.shadowOffsetY=20;
        }
        if (haciaAbajo) {
            constantes.contexto.shadowOffsetY=-20;
        }
        if (haciaIzquierda) {
            constantes.contexto.shadowOffsetX=20;
        }
        if (haciaDerecha) {
            constantes.contexto.shadowOffsetX=-20;
        }
        constantes.contexto.shadowColor=naveElegida.colorBrillo;
        constantes.contexto.beginPath();
        //CAMBIA LA ORIENTACION DE LA NAVE
        if (haciaArriba) {
            constantes.contexto.drawImage(naveArriba, naveX, naveY, naveWidth, naveHeight);
        }
        if (haciaAbajo) {
            constantes.contexto.drawImage(naveAbajo, naveX, naveY, naveWidth, naveHeight);
        }
        if (haciaIzquierda) {
            constantes.contexto.drawImage(naveIzquierda, naveX, naveY, naveHeight, naveWidth);
        }
        if (haciaDerecha) {
            constantes.contexto.drawImage(naveDerecha, naveX, naveY, naveHeight, naveWidth);
        }
        constantes.contexto.fillStyle = "#AAAAAA";
        constantes.contexto.fill();
        constantes.contexto.closePath();
        constantes.contexto.restore();
    };

    pintarBordes = () => {
        constantes.contexto.beginPath();
        constantes.contexto.rect(0, 0, constantes.bordeIzquierdaWidth, constantes.bordeIzquierdaHeight);
        constantes.contexto.fillStyle = "#FFFFFF";
        constantes.contexto.fill();
        constantes.contexto.closePath();
    
        constantes.contexto.beginPath();
        constantes.contexto.rect(0, 0, constantes.bordeArribaWidth, constantes.bordeArribaHeight);
        constantes.contexto.fillStyle = "#FFFFFF";
        constantes.contexto.fill();
        constantes.contexto.closePath();
    
        constantes.contexto.beginPath();
        constantes.contexto.rect(constantes.canvas.width - constantes.bordeDerechaWidth, 0, constantes.bordeDerechaWidth, constantes.bordeDerechaHeight);
        constantes.contexto.fillStyle = "#FFFFFF";
        constantes.contexto.fill();
        constantes.contexto.closePath();
    
        constantes.contexto.beginPath();
        constantes.contexto.rect(0, constantes.canvas.height - constantes.bordeAbajoHeight, constantes.bordeAbajoWidth, constantes.bordeAbajoHeight);
        constantes.contexto.fillStyle = "#FFFFFF";
        constantes.contexto.fill();
        constantes.contexto.closePath();
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

    pintarContador = (contador) =>{
        constantes.contexto.beginPath();
        constantes.contexto.font = "30px Arial";
        constantes.contexto.fillStyle = "#FFBD00";
        constantes.contexto.fillText("Ships: " + contador, 30, 50);
        constantes.contexto.closePath();
    };

    pintarMunicion = (naveElegida, municionNave) => {
        constantes.contexto.beginPath();
        constantes.contexto.font = "30px Arial";
        constantes.contexto.fillStyle = "#FFBD00";
        constantes.contexto.fillText((naveElegida.municion != 0) ? `Municion: ${ naveElegida.municion}/${municionNave}`: "¡RECARGA!", 1100, 50);
        constantes.contexto.closePath();
    };

    pintarPortal = () =>{
        constantes.contexto.save();
        constantes.contexto.beginPath();
        constantes.contexto.shadowBlur = 55;
        constantes.contexto.shadowColor = "#0000FF";
        constantes.contexto.translate(constantes.canvas.width - 100,constantes.canvas.height - 100);
        constantes.contexto.rotate(this.giro * Math.PI/180);
        constantes.contexto.drawImage(this.portal,-this.portal.width / 2, -this.portal.height / 2);
        constantes.contexto.restore();
        constantes.contexto.closePath();
        this.giro += 10;
    };

    pintarDisparo = (disparoHeight, disparoWidth, imagenDisparo, naveElegida) =>{
        // RECORRO EL ARRAY DE DISPAROS CUANDO NO ESTÁ VACIO Y PINTO TODOS LOS this.DISPAROS LANZADOS
        if (this.disparos.length != 0) {
            for (let i = 0; i < this.disparos.length; i++) {
                // CONTROLO LA COLISIÓN CON LOS BORDES
                if ((this.disparos[i].y + this.disparos[i].speedY) >= (0 + constantes.bordeArribaHeight) && (this.disparos[i].y + this.disparos[i].speedY) <= (constantes.canvas.height - constantes.bordeAbajoHeight- disparoHeight) && this.disparos[i].x + this.disparos[i].speedX > 0 + constantes.bordeIzquierdaWidth && this.disparos[i].x + this.disparos[i].speedX < constantes.canvas.width - constantes.bordeDerechaWidth - disparoWidth) {
                    constantes.contexto.beginPath();
                    constantes.contexto.drawImage(imagenDisparo, this.disparos[i].x + this.disparos[i].speedX, this.disparos[i].y + this.disparos[i].speedY, disparoWidth, disparoHeight);
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

    pintarEnemigos = (enemigos) => {
        for (let i = 0; i < enemigos.length; i++) {
            constantes.contexto.beginPath();
            constantes.contexto.drawImage(this.enemigo, enemigos[i].x, enemigos[i].y, 50, 50);
            constantes.contexto.fill();    
            constantes.contexto.closePath();        
        }
    };
    
    pintarVidaRecogible = (vida, vidaRecogible) =>{
        constantes.contexto.beginPath();
        constantes.contexto.save();
        constantes.contexto.shadowBlur = 25;
        constantes.contexto.shadowColor = "#FFFF00";
        constantes.contexto.drawImage(vida, vidaRecogible.x, vidaRecogible.y, 30, 30);
        constantes.contexto.fill();
        constantes.contexto.closePath();
        constantes.contexto.restore();
    };
    
    //COLISIONES
    deteccionColisionNave = (naveElegida) => {
        for (let i = 0; i < this.obstaculos.length; i++) {// RECORRO EL ARRAY DE OBJETOS E INDICO LAS COLISIONES PARA CADA UNO DE LOS OBJETOS GUARDADOS
            if(naveElegida.naveX + naveElegida.naveHeight > this.obstaculos[i].x && naveElegida.naveX < this.obstaculos[i].x + constantes.obstaculoUnoWidth && naveElegida.naveY + naveElegida.naveHeight > this.obstaculos[i].y && naveElegida.naveY < this.obstaculos[i].y + constantes.obstaculoUnoHeight){
                resetearNave();
            };
        }
    }

    deteccionColisionDisparos = (disparoWidth, disparoHeight) => {
        for (let i = 0; i < this.obstaculos.length; i++) {// RECORRO EL ARRAY DE OBSTACULOS
            for (let a = 0; a < this.disparos.length; a++) {// RECORRO EL ARRAY DE DISPAROS            
                if(this.disparos[a].x + this.disparos[a].speedX > this.obstaculos[i].x - disparoWidth && this.disparos[a].x + this.disparos[a].speedX < this.obstaculos[i].x + constantes.obstaculoUnoWidth && this.disparos[a].y + this.disparos[a].speedY > this.obstaculos[i].y - disparoHeight && this.disparos[a].y + this.disparos[a].speedY < this.obstaculos[i].y + constantes.obstaculoUnoHeight){
                    this.disparos[a].x = -100;
                    this.disparos[a].y = -100;
                };
            };
        };
    };

    colisionDisparoConEnemigo = (disparoHeight, disparoWidth, enemigos) =>{
        for (let i = 0; i < this.disparos.length; i++) {
            for (let a = 0; a < enemigos.length; a++) {
                // CONTROLO LA COLISIÓN CON LOS ENEMIGOS
                if ((this.disparos[i].y + this.disparos[i].speedY) <= enemigos[a].y + 50 && this.disparos[i].y + this.disparos[i].speedY + disparoHeight >= enemigos[a].y && this.disparos[i].x + this.disparos[i].speedX <= enemigos[a].x + 50 && this.disparos[i].x + this.disparos[i].speedX + disparoWidth >= enemigos[a].x) {
                    enemigos[a].x = -100;
                    enemigos[a].y = -100;
                    enemigos[a].MovimientoX = 0;
                    this.disparos[i].x = -100;
                    this.disparos[i].y = -100;
                    this.disparos[i].speedY = 0;
                    this.disparos[i].speedX = 0;
                };
            }
            
        }
    };

};