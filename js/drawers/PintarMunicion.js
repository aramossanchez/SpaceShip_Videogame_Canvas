import Constantes from "../Constantes.js";
let constantes = new Constantes();

export default class PintarMunicion {

    pintarMunicion = (naveElegida, municionNave) => {
        constantes.contexto.beginPath();
        constantes.contexto.font = "30px Arial";
        constantes.contexto.fillStyle = "#FFBD00";
        constantes.contexto.fillText((naveElegida.municion != 0) ? `Municion: ${ naveElegida.municion}/${municionNave}`: "¡RECARGA!", 1100, 50);
        constantes.contexto.closePath();
    };

}