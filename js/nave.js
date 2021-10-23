//CREO LA CLASE NAVE, DONDE CREO EL ESQUEMA DE TODAS LAS CARACTERÍSTICAS QUE TENDRÁ LA NAVE QUE ELIJAMOS
export default class Nave {

    constructor(nombre, colorBrillo, velocidadMaxima, aceleracion, naveWidth, naveHeight, disparo, municion, imagenIzquierda, imagenArriba, imagenDerecha, imagenAbajo, disparoTamaño, disparoSonido, disparoVelocidad){
        this.nombre = nombre,
        this.colorBrillo = colorBrillo,
        this.velocidadMaxima = velocidadMaxima,
        this.aceleracion = aceleracion,
        this.naveWidth = naveWidth,
        this.naveHeight = naveHeight,
        this.disparo = disparo,
        this.municion = municion,
        this.imagenIzquierda = imagenIzquierda,
        this.imagenArriba = imagenArriba,
        this.imagenDerecha = imagenDerecha,
        this.imagenAbajo = imagenAbajo,
        this.disparoTamaño = disparoTamaño,
        this.disparoSonido = disparoSonido,
        this.disparoVelocidad = disparoVelocidad
    };
};