import Constantes from "../Constantes.js";
let constantes = new Constantes();

import ResetearNave from "./ResetearNave.js";
let controllerResetearNave = new ResetearNave();

export default class ColisionNaveEnemigo{

    deteccionColisionEnemigos = (naveElegida, enemigos, contador, objeto) => {
        for (let i = 0; i < enemigos.length; i++) {
            if (naveElegida.naveX + naveElegida.naveWidth > enemigos[i].x && naveElegida.naveY < enemigos[i].y + 50 && naveElegida.naveX < enemigos[i].x + 50 && naveElegida.naveY + naveElegida.naveHeight > enemigos[i].y) {
                controllerResetearNave.resetearNave(naveElegida, contador, objeto);
            };
        };
    };

};