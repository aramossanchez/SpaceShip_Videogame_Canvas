import Constantes from "../Constantes.js";
let constantes = new Constantes();

export default class PintarPortal{

    constructor(){
        //VARIABLES DEL PORTAL
        this.giro = 0;
        this.portal = new Image();
        this.portal.src = './img/portal.png';
    }

    pintarPortal = () =>{
        constantes.contexto.save();
        constantes.contexto.beginPath();
        constantes.contexto.shadowBlur = 55;
        constantes.contexto.shadowColor = "#0000FF";
        constantes.contexto.translate(constantes.canvas.width - 100, constantes.canvas.height - 100);
        constantes.contexto.rotate(this.giro * Math.PI/180);
        constantes.contexto.drawImage(this.portal,-this.portal.width / 2, -this.portal.height / 2);
        constantes.contexto.restore();
        constantes.contexto.closePath();
        this.giro += 10;
    };

}