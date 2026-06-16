/*
    ESCENARIO 3:
    Clase Sumatoria.

    Objetivo:
    Crear una clase cuyo constructor reciba un número base.
    Cada vez que se ejecute el método sumar(), la suma acumulada debe aumentar.
*/

class Sumatoria {
    constructor(base) {
        this.base = base;
        this.acumulado = 0;
        this.contador = 0;

        /*
            La primera línea de salida debe generarse desde el constructor.
        */
        document.getElementById("resultado-sumatoria").innerHTML = `
            Número base generado: ${this.base} <br>
            Presione el botón para comenzar la sumatoria.
        `;
    }

    sumar() {
        /*
            En cada ejecución:
            - aumenta el contador
            - suma la base al acumulado
            - muestra el resultado actualizado
        */

        this.contador++;
        this.acumulado = this.acumulado + this.base;

        document.getElementById("resultado-sumatoria").innerHTML += `
            <br>
            Ejecución ${this.contador}: acumulado = ${this.acumulado}
        `;

        console.log("Ejecución:", this.contador);
        console.log("Acumulado:", this.acumulado);
    }
}