/*
    ESCENARIO 2:
    Catálogo Sony Chile.

    Objetivo:
    Modelar productos usando clases.

    Nota:
    Los productos son ejemplos didácticos.
    El estudiante puede reemplazarlos por productos reales investigados.
*/

/* ============================================================
   CLASE PADRE PRODUCTO
============================================================ */

class ProductoSony {
    constructor(nombre, modelo, categoria, precio) {
        this.nombre = nombre;
        this.modelo = modelo;
        this.categoria = categoria;
        this.precio = precio;
    }

    mostrarInfo() {
        return `
            Producto: ${this.nombre} <br>
            Modelo: ${this.modelo} <br>
            Categoría: ${this.categoria} <br>
            Precio referencial: $${this.precio}
        `;
    }
}

/* ============================================================
   CLASE TELEVISOR
============================================================ */

class Televisor extends ProductoSony {
    constructor(nombre, modelo, precio, pulgadas, resolucion) {
        super(nombre, modelo, "Televisores", precio);
        this.pulgadas = pulgadas;
        this.resolucion = resolucion;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Pulgadas: ${this.pulgadas} <br>
            Resolución: ${this.resolucion}
        `;
    }
}

/* ============================================================
   CLASE CAMARA
============================================================ */

class Camara extends ProductoSony {
    constructor(nombre, modelo, precio, tipoCamara) {
        super(nombre, modelo, "Cámaras", precio);
        this.tipoCamara = tipoCamara;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Tipo de cámara: ${this.tipoCamara}
        `;
    }
}

/* ============================================================
   CLASE AUDIO
============================================================ */

class Audio extends ProductoSony {
    constructor(nombre, modelo, precio, tipoAudio) {
        super(nombre, modelo, "Audio", precio);
        this.tipoAudio = tipoAudio;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Tipo de audio: ${this.tipoAudio}
        `;
    }
}