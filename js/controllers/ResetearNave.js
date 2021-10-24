export default class ResetearNave {
    
    resetearNave = (naveElegida, contador, objeto) =>{
        objeto.inicializarNave();
        naveElegida.naveX = 50;
        naveElegida.naveY = 550;
        if (contador < 0) {
            window.location.reload();
        };
    };

};