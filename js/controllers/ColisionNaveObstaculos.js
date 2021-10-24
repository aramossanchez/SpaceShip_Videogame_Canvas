import Constantes from "../Constantes.js";
let constantes = new Constantes();

import ResetearNave from "./ResetearNave.js";
let controllerResetearNave = new ResetearNave();

export default class ColisionNaveObstaculos{

    deteccionColisionNave = (naveElegida, contador, obstaculos, objeto) => {
        for (let i = 0; i < obstaculos.length; i++) {// RECORRO EL ARRAY DE OBJETOS E INDICO LAS COLISIONES PARA CADA UNO DE LOS OBJETOS GUARDADOS
            if(naveElegida.naveX + naveElegida.naveHeight > obstaculos[i].x && naveElegida.naveX < obstaculos[i].x + constantes.obstaculoUnoWidth && naveElegida.naveY + naveElegida.naveHeight > obstaculos[i].y && naveElegida.naveY < obstaculos[i].y + constantes.obstaculoUnoHeight){
                controllerResetearNave.resetearNave(naveElegida, contador, objeto);
            };
        }
    };

}