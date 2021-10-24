export default class ColisionNaveVida {
    
    constructor(){
        this.vidaRecogida = false;
    }
    deteccionColisionVida = (naveElegida, objeto, vidaRecogible) => {
        if (this.vidaRecogida) {
            vidaRecogible.x = -100;
            vidaRecogible.y = -100;
        };
        if (naveElegida.naveX + naveElegida.naveWidth > vidaRecogible.x && naveElegida.naveY < vidaRecogible.y + 30 && naveElegida.naveX < vidaRecogible.x + 30 && naveElegida.naveY + naveElegida.naveHeight > vidaRecogible.y) {
            this.vidaRecogida = true;
            objeto.aumentarContador();
        };
    };

}