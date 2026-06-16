/*
    ESCENARIO 1:
    Modelado de taxis urbanos.

    Objetivo:
    Crear una jerarquía usando clases padre e hijas.

    Clase padre:
    - Taxi

    Clases hijas:
    - TaxiTradicional
    - TaxiParticular
    - TaxiExpress
    - TaxiPremium
    - TaxiCargo
*/

/* ============================================================
   CLASE PADRE
============================================================ */

class Taxi {
    constructor(tipo, patente, conductor, licencia) {
        this.tipo = tipo;
        this.patente = patente;
        this.conductor = conductor;
        this.licencia = licencia;
    }

    mostrarInfo() {
        return `
            Tipo: ${this.tipo} <br>
            Patente: ${this.patente} <br>
            Conductor: ${this.conductor} <br>
            Licencia: ${this.licencia}
        `;
    }
}

/* ============================================================
   TAXI TRADICIONAL
============================================================ */

class TaxiTradicional extends Taxi {
    constructor(patente, conductor, licencia, colorTecho) {
        super("Taxi tradicional", patente, conductor, licencia);
        this.colorTecho = colorTecho;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Color del techo: ${this.colorTecho}
        `;
    }
}

/* ============================================================
   TAXI PARTICULAR
============================================================ */

class TaxiParticular extends Taxi {
    constructor(tipo, patente, conductor, licencia, categoria) {
        super(tipo, patente, conductor, licencia);
        this.categoria = categoria;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Categoría: ${this.categoria}
        `;
    }
}

/* ============================================================
   TAXI EXPRESS
============================================================ */

class TaxiExpress extends TaxiParticular {
    constructor(patente, conductor, licencia, categoria, modelo) {
        super("Taxi Express", patente, conductor, licencia, categoria);
        this.modelo = modelo;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Modelo: ${this.modelo}
        `;
    }
}

/* ============================================================
   TAXI PREMIUM
============================================================ */

class TaxiPremium extends TaxiParticular {
    constructor(patente, conductor, licencia, categoria, modelo, servicios) {
        super("Taxi Premium", patente, conductor, licencia, categoria);
        this.modelo = modelo;
        this.servicios = servicios;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Modelo: ${this.modelo} <br>
            Servicios: ${this.servicios.join(", ")}
        `;
    }
}

/* ============================================================
   TAXI CARGO
============================================================ */

class TaxiCargo extends Taxi {
    constructor(patente, conductor, licencia, capacidadCarga) {
        super("Taxi cargo", patente, conductor, licencia);
        this.capacidadCarga = capacidadCarga;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Capacidad de carga: ${this.capacidadCarga}
        `;
    }
}