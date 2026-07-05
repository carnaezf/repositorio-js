/* ============================================================
   EVALUACIÓN - CONSUMO DE API CON XMLHttpRequest
   Endpoint: https://jsonplaceholder.typicode.com/users
   ============================================================ */


class AdministradorUsuarios {
    constructor() {
        this.url = "https://jsonplaceholder.typicode.com/users";
        this.usuarios = [];

        this.obtenerDatos();
    }

    obtenerDatos() {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", this.url);

        xhr.onload = () => {
            if (xhr.status === 200) {
                this.usuarios = JSON.parse(xhr.responseText);

                console.log("Datos cargados correctamente:");
                console.log(this.usuarios);

                document.getElementById("resultado").innerHTML = `
                    Datos cargados correctamente. Total de usuarios: ${this.usuarios.length}
                `;
            } else {
                console.log("Error al obtener los datos.");
                console.log("Estado:", xhr.status);

                document.getElementById("resultado").innerHTML = `
                    Error al obtener los datos desde la API.
                `;
            }
        };

        xhr.onerror = () => {
            console.log("Error de conexión con la API.");

            document.getElementById("resultado").innerHTML = `
                Error de conexión con la API.
            `;
        };

        xhr.send();
    }

    listarNombres() {
        console.log("Listado de nombres de usuarios:");

        this.usuarios.forEach((usuario) => {
            console.log(usuario.name);
        });

        document.getElementById("resultado").innerHTML = `
            Nombres listados en consola.
        `;
    }

    buscarUsuarioPorNombre() {
        const nombreBuscado = prompt("Ingrese el nombre completo del usuario:");

        const usuarioEncontrado = this.usuarios.find((usuario) => {
            return usuario.name.toLowerCase() === nombreBuscado.toLowerCase();
        });

        return usuarioEncontrado;
    }

    mostrarInformacionBasica() {
        const usuario = this.buscarUsuarioPorNombre();

        if (usuario) {
            console.log("Información básica del usuario:");
            console.log("Username:", usuario.username);
            console.log("Correo:", usuario.email);

            document.getElementById("resultado").innerHTML = `
                <strong>Usuario encontrado:</strong><br>
                Username: ${usuario.username}<br>
                Correo: ${usuario.email}
            `;
        } else {
            console.log("Usuario no encontrado.");

            document.getElementById("resultado").innerHTML = `
                Usuario no encontrado.
            `;
        }
    }

    mostrarDireccion() {
        const usuario = this.buscarUsuarioPorNombre();

        if (usuario) {
            console.log("Dirección del usuario:");
            console.log("Calle:", usuario.address.street);
            console.log("Suite:", usuario.address.suite);
            console.log("Ciudad:", usuario.address.city);
            console.log("Código postal:", usuario.address.zipcode);
            console.log("Geo lat:", usuario.address.geo.lat);
            console.log("Geo lng:", usuario.address.geo.lng);

            document.getElementById("resultado").innerHTML = `
                <strong>Dirección de ${usuario.name}:</strong><br>
                Calle: ${usuario.address.street}<br>
                Suite: ${usuario.address.suite}<br>
                Ciudad: ${usuario.address.city}<br>
                Código postal: ${usuario.address.zipcode}<br>
                Latitud: ${usuario.address.geo.lat}<br>
                Longitud: ${usuario.address.geo.lng}
            `;
        } else {
            console.log("Usuario no encontrado.");

            document.getElementById("resultado").innerHTML = `
                Usuario no encontrado.
            `;
        }
    }

    mostrarInformacionAvanzada() {
        const usuario = this.buscarUsuarioPorNombre();

        if (usuario) {
            console.log("Información avanzada del usuario:");
            console.log("Teléfono:", usuario.phone);
            console.log("Sitio web:", usuario.website);
            console.log("Compañía:");
            console.log("Nombre:", usuario.company.name);
            console.log("Frase clave:", usuario.company.catchPhrase);
            console.log("BS:", usuario.company.bs);

            document.getElementById("resultado").innerHTML = `
                <strong>Información avanzada de ${usuario.name}:</strong><br>
                Teléfono: ${usuario.phone}<br>
                Sitio web: ${usuario.website}<br><br>

                <strong>Compañía:</strong><br>
                Nombre: ${usuario.company.name}<br>
                Frase clave: ${usuario.company.catchPhrase}<br>
                BS: ${usuario.company.bs}
            `;
        } else {
            console.log("Usuario no encontrado.");

            document.getElementById("resultado").innerHTML = `
                Usuario no encontrado.
            `;
        }
    }

    listarCompanias() {
        console.log("Listado de compañías y frases clave:");

        let html = "<strong>Compañías:</strong><br>";

        this.usuarios.forEach((usuario) => {
            console.log(`${usuario.company.name} - ${usuario.company.catchPhrase}`);

            html += `
                ${usuario.company.name} - ${usuario.company.catchPhrase}<br>
            `;
        });

        document.getElementById("resultado").innerHTML = html;
    }

    listarNombresOrdenados() {
        const nombresOrdenados = this.usuarios
            .map((usuario) => usuario.name)
            .sort();

        console.log("Nombres ordenados alfabéticamente:");

        nombresOrdenados.forEach((nombre) => {
            console.log(nombre);
        });

        document.getElementById("resultado").innerHTML = `
            <strong>Nombres ordenados:</strong><br>
            ${nombresOrdenados.join("<br>")}
        `;
    }
}


/* ============================================================
   INSTANCIA DE LA CLASE
   ============================================================ */

const administrador = new AdministradorUsuarios();


/* ============================================================
   EVENTOS DE BOTONES
   ============================================================ */

document.getElementById("btn-listar-nombres").addEventListener("click", function () {
    administrador.listarNombres();
});

document.getElementById("btn-info-basica").addEventListener("click", function () {
    administrador.mostrarInformacionBasica();
});

document.getElementById("btn-direccion").addEventListener("click", function () {
    administrador.mostrarDireccion();
});

document.getElementById("btn-info-avanzada").addEventListener("click", function () {
    administrador.mostrarInformacionAvanzada();
});

document.getElementById("btn-companias").addEventListener("click", function () {
    administrador.listarCompanias();
});

document.getElementById("btn-ordenados").addEventListener("click", function () {
    administrador.listarNombresOrdenados();
});