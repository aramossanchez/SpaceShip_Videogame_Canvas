import Constantes from "../Constantes.js";
let constantes = new Constantes();

export default class PintarContador {
    
    pintarContador = (contador) =>{
        constantes.contexto.beginPath();
        constantes.contexto.font = "30px Arial";
        constantes.contexto.fillStyle = "#FFBD00";
        constantes.contexto.fillText("Ships: " + contador, 30, 50);
        constantes.contexto.closePath();
    };

}