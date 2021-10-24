import Constantes from "../Constantes.js";
let constantes = new Constantes();

export default class {

    pintarEnemigos = (enemigo, enemigos) => {
        for (let i = 0; i < enemigos.length; i++) {
            constantes.contexto.beginPath();
            constantes.contexto.drawImage(enemigo, enemigos[i].x, enemigos[i].y, 50, 50);
            constantes.contexto.fill();    
            constantes.contexto.closePath();        
        }
    };

};