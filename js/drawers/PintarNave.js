import Constantes from "../Constantes.js";
let constantes = new Constantes();

export default class PintarNave {

    pintarNave = (naveElegida, naveArriba, naveAbajo, naveIzquierda, naveDerecha, haciaIzquierda, haciaArriba, haciaDerecha, haciaAbajo) =>{    
        constantes.contexto.save()
        //BRILLO DE LA NAVE
        constantes.contexto.shadowBlur=35;
        if (haciaIzquierda) {
            constantes.contexto.shadowOffsetX=20;
        }
        if (haciaArriba) {
            constantes.contexto.shadowOffsetY=20;
        }
        if (haciaDerecha) {
            constantes.contexto.shadowOffsetX=-20;
        }
        if (haciaAbajo) {
            constantes.contexto.shadowOffsetY=-20;
        }
        constantes.contexto.shadowColor=naveElegida.colorBrillo;
        constantes.contexto.beginPath();
        //CAMBIA LA ORIENTACION DE LA NAVE
        if (haciaIzquierda) {
            constantes.contexto.drawImage(naveIzquierda, naveElegida.naveX, naveElegida.naveY, naveElegida.naveHeight, naveElegida.naveWidth);
        }
        if (haciaArriba) {
            constantes.contexto.drawImage(naveArriba, naveElegida.naveX, naveElegida.naveY, naveElegida.naveWidth, naveElegida.naveHeight);
        }
        if (haciaDerecha) {
            constantes.contexto.drawImage(naveDerecha, naveElegida.naveX, naveElegida.naveY, naveElegida.naveHeight, naveElegida.naveWidth);
        }
        if (haciaAbajo) {
            constantes.contexto.drawImage(naveAbajo, naveElegida.naveX, naveElegida.naveY, naveElegida.naveWidth, naveElegida.naveHeight);
        }
        constantes.contexto.fillStyle = "#AAAAAA";
        constantes.contexto.fill();
        constantes.contexto.closePath();
        constantes.contexto.restore();
    };
    
};