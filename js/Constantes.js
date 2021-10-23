export default class Constantes {
    
    //CREO ARRAY CON NAVES
    navesPosibles = [
        ["StartLink", 50, 550, "#FF0000", 5, 0.10, 45, 45, "./img/disparoStarLink.png", 5, "./img/StartLinkIzquierda.png", "./img/StartLinkArriba.png", "./img/StartLinkDerecha.png", "./img/StartLinkAbajo.png", 20, "./sound/disparoSpaceLink.wav", 5],
        ["Black Mamba", 50, 550, "#52C8FD", 6, 0.20, 30, 30, "./img/disparoBlackMamba.png", 10, "./img/BlackMambaIzquierda.png", "./img/BlackMambaArriba.png", "./img/BlackMambaDerecha.png", "./img/BlackMambaAbajo.png", 10, "./sound/disparoBlackMamba.wav", 7],
        ["Snasa", 50, 550, "#00FF7E", 2, 0.25, 50, 50, "./img/disparoSnasa.png", 1, "./img/SnasaIzquierda.png", "./img/SnasaArriba.png", "./img/SnasaDerecha.png", "./img/SnasaAbajo.png", 40, "./sound/disparoSnasa.wav", 3],
        ["Space Cat", 50, 550, "#FFFFFF", 6, 0.05, 70, 70, "./img/disparoSpaceCat.png", 3, "./img/SpaceCatIzquierda.png", "./img/SpaceCatArriba.png", "./img/SpaceCatDerecha.png", "./img/SpaceCatAbajo.png", 30, "./sound/disparoSpaceCat.wav", 8]
    ];

    //REFERENCIO CANVAS Y CREO CONTEXTO 2D
    canvas = document.getElementById("game");

    contexto = this.canvas.getContext("2d");

    //VALORES DE LOS BORDES DE LA PANTALLA DE JUEGO
    bordeIzquierdaWidth = 2.5;
    
    bordeIzquierdaHeight = this.canvas.height;

    bordeArribaWidth = this.canvas.width;
    
    bordeArribaHeight = 2.5;

    bordeDerechaWidth = 2.5;
    
    bordeDerechaHeight = this.canvas.height;

    bordeAbajoWidth = this.canvas.width;
    
    bordeAbajoHeight = 2.5;

    obstaculoUnoX = 100;

    obstaculoUnoY = 40;

    obstaculoUnoWidth = 10;

    obstaculoUnoHeight = 300;

    obstaculoMarginRight = 100;

    obstaculoMarginTop = 260;

}