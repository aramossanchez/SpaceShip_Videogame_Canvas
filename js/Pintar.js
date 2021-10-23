export default class Pintar{

    pintarNave = (contexto, haciaArriba, haciaAbajo, haciaIzquierda, haciaDerecha, naveElegida, naveArriba, naveAbajo, naveIzquierda, naveDerecha, naveX, naveY, naveWidth, naveHeight) =>{    
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
    };

    pintarBordes = (contexto, bordeIzquierdaWidth, bordeIzquierdaHeight, bordeArribaWidth, bordeArribaHeight, canvas, bordeDerechaWidth, bordeDerechaHeight, bordeAbajoHeight, bordeAbajoWidth) =>{
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
    };

    pintarObstaculos = (obstaculoMarginRight, obstaculoMarginTop, obstaculos, contexto, obstaculoUnoWidth, obstaculoUnoHeight, obstaculoUnoX, obstaculoUnoY) =>{
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
    };

    pintarContador = (contexto, contador) =>{
        contexto.beginPath();
        contexto.font = "30px Arial";
        contexto.fillStyle = "#FFBD00";
        contexto.fillText("Ships: " + contador, 30, 50);
        contexto.closePath();
    };

    pintarMunicion = (contexto, naveElegida, municionNave) => {
        contexto.beginPath();
        contexto.font = "30px Arial";
        contexto.fillStyle = "#FFBD00";
        contexto.fillText((naveElegida.municion != 0) ? `Municion: ${ naveElegida.municion}/${municionNave}`: "¡RECARGA!", 1100, 50);
        contexto.closePath();
    };

    pintarPortal = (giro, contexto, canvas, portal) =>{
        contexto.save();
        contexto.beginPath();
        contexto.shadowBlur = 55;
        contexto.shadowColor = "#0000FF";
        contexto.translate(canvas.width - 100,canvas.height - 100);
        contexto.rotate(giro * Math.PI/180);
        contexto.drawImage(portal,-portal.width / 2, -portal.height / 2);
        contexto.restore();
        contexto.closePath();
    };

    pintarDisparo = (disparos, contexto, bordeArribaHeight, canvas, bordeAbajoHeight, disparoHeight, bordeIzquierdaWidth, bordeDerechaWidth, disparoWidth, imagenDisparo, naveElegida) =>{
        // RECORRO EL ARRAY DE DISPAROS CUANDO NO ESTÁ VACIO Y PINTO TODOS LOS DISPAROS LANZADOS
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

    pintarEnemigos = (contexto, enemigos, enemigo) => {
        for (let i = 0; i < enemigos.length; i++) {
            contexto.beginPath();
            contexto.drawImage(enemigo, enemigos[i].x, enemigos[i].y, 50, 50);
            contexto.fill();    
            contexto.closePath();        
        }
    };
    
    pintarVidaRecogible = (contexto, vida, vidaRecogible) =>{
        contexto.beginPath();
        contexto.save();
        contexto.shadowBlur = 25;
        contexto.shadowColor = "#FFFF00";
        contexto.drawImage(vida, vidaRecogible.x, vidaRecogible.y, 30, 30);
        contexto.fill();
        contexto.closePath();
        contexto.restore();
    };

}