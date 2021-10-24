export default class RecargarMunicion {

    constructor(){
        this.municionNave = 0;
    }

    recargar = (naveElegida) =>{
        if (naveElegida.municion == 0) {
            naveElegida.municion = this.municionNave;
        }
    };
}