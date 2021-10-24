import Constantes from "../Constantes.js";
let constantes = new Constantes();

export default class ColisionDisparoObstaculo{

    deteccionColisionDisparos = (naveElegida, obstaculos, disparos, objeto) => {
        for (let i = 0; i < obstaculos.length; i++) {// RECORRO EL ARRAY DE OBSTACULOS
            for (let a = 0; a < disparos.length; a++) {// RECORRO EL ARRAY DE DISPAROS   
                if(disparos[a].x + disparos[a].speedX > obstaculos[i].x - naveElegida.disparoTamaño && disparos[a].x + disparos[a].speedX < obstaculos[i].x + constantes.obstaculoUnoWidth && disparos[a].y + disparos[a].speedY > obstaculos[i].y - naveElegida.disparoTamaño && disparos[a].y + disparos[a].speedY < obstaculos[i].y + constantes.obstaculoUnoHeight){
                    objeto.eliminarDisparos(a);
                };
            };
        };
    };

}