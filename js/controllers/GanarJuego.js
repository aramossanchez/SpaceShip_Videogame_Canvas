import Constantes from "../Constantes.js";
let constantes = new Constantes();

export default class GanarJuego{
    
    ganarJuego = (naveElegida) =>{
        if (naveElegida.naveX + naveElegida.naveHeight > constantes.canvas.width - 100 && naveElegida.naveX < constantes.canvas.width - 100 + 1 && naveElegida.naveY + naveElegida.naveHeight > constantes.canvas.height - 100 && naveElegida.naveY < constantes.canvas.height - 100 + 1){
            alert("WIN");
        }
    };

};