import Constantes from "../Constantes.js";
let constantes = new Constantes();

export default class PintarBordes{
    
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

};