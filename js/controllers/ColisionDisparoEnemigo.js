export default class ColisionDisparoEnemigo{
    
    colisionDisparoConEnemigo = (naveElegida, disparos, enemigos, objeto) =>{
        for (let i = 0; i < disparos.length; i++) {
            for (let a = 0; a < enemigos.length; a++) {
                // CONTROLO LA COLISIÓN CON LOS ENEMIGOS
                if ((disparos[i].y + disparos[i].speedY) <= enemigos[a].y + 50 && disparos[i].y + disparos[i].speedY + naveElegida.disparoTamaño >= enemigos[a].y && disparos[i].x + disparos[i].speedX <= enemigos[a].x + 50 && disparos[i].x + disparos[i].speedX + naveElegida.disparoTamaño >= enemigos[a].x) {
                    objeto.eliminarEnemigos(a);
                    objeto.eliminarDisparos(i);
                    
                };
            };
        };
    };
}