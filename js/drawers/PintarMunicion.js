import Constantes from "../Constantes.js";
let constantes = new Constantes();

export default class PintarMunicion {

    constructor(){
        this.municionTotal = [];
        this.marginRight = 10;
        this.width = 0;
        this.posicionInicial = 1000;
    };

    pintarMunicion = (naveElegida, municionNave) => {
        this.marginRight = 0;
        let tamañoCadaMunicion = ((constantes.canvas.width - 10) - this.posicionInicial)/municionNave;
        this.width = tamañoCadaMunicion - 10;
        for (let i = 0; i < municionNave; i++) {
            let municion = {x: this.posicionInicial + this.marginRight, y: 25, Disparado: "si"};
            if (i < naveElegida.municion) {
                municion.Disparado = "no";
            }
            this.municionTotal[i] = municion;
            this.marginRight += tamañoCadaMunicion;
        };
        for (let a = 0; a < this.municionTotal.length; a++) {
            if (naveElegida.municion != 0) {
                if(this.municionTotal[a].Disparado == "no"){
                    constantes.contexto.beginPath();
                    constantes.contexto.rect(this.municionTotal[a].x, this.municionTotal[a].y, this.width, 20);
                    constantes.contexto.fillStyle = "#00FF00";
                    constantes.contexto.fill();
                    constantes.contexto.closePath();
                };
                if(this.municionTotal[a].Disparado == "si"){
                    constantes.contexto.beginPath();
                    constantes.contexto.strokeRect(this.municionTotal[a].x, this.municionTotal[a].y, this.width, 20);
                    constantes.contexto.strokeStyle = "#00FF00";
                    constantes.contexto.fill();
                    constantes.contexto.closePath();
                };
            };
            if (naveElegida.municion == 0) {
                constantes.contexto.font = "30px Arial";
                constantes.contexto.fillStyle = "#00FF00";
                constantes.contexto.fillText("RELOAD!", 1100, 50);        
            };
        };
    };

};