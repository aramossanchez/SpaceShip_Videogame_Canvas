import Constantes from "../Constantes.js";
let constantes = new Constantes();

export default class PintarVidaRecogible{

    constructor(){
        //VALORES DE LA VIDA RECOGIBLE EN PANTALLA
        this.vida = new Image();
        this.vida.src = './img/vida.png';
        this.vidaRecogible = {x:constantes.canvas.width/2 - 35, y: 100};
    }

    pintarVidaRecogible = () =>{
        constantes.contexto.beginPath();
        constantes.contexto.save();
        constantes.contexto.shadowBlur = 25;
        constantes.contexto.shadowColor = "#FFFF00";
        constantes.contexto.drawImage(this.vida, this.vidaRecogible.x, this.vidaRecogible.y, 30, 30);
        constantes.contexto.fill();
        constantes.contexto.closePath();
        constantes.contexto.restore();
    };

}